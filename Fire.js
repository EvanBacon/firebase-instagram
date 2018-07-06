import { ImageManipulator } from 'expo';
import uuid from 'uuid';
import uploadPhoto from './utils/uploadPhoto';
import getUserInfo from './utils/getUserInfo';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'snack-SJucFknGX';

class Fire {
  constructor() {
    this.init();
    firebase.firestore().settings({ timestampsInSnapshots: true });
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyAQan8_IJ6fY6F8E06FMDKVbWlrdI75mvA',
      authDomain: 'instahamm-b09ce.firebaseapp.com',
      databaseURL: 'https://instahamm-b09ce.firebaseio.com',
      projectId: 'instahamm-b09ce',
      storageBucket: 'instahamm-b09ce.appspot.com',
      messagingSenderId: '716190466061',
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = async user => {
    if (!user) {
      await firebase.auth().signInAnonymously();
    }
  };

  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const _data = doc.data();
          const reduced = { key: doc.id, ..._data };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  reduceImage = async uri => {
    return ImageManipulator.manipulate(uri, [{ resize: { width: 500 } }], {
      compress: 0.5,
    });
  };

  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await this.reduceImage(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  get collection() {
    return this.db.collection(collectionName);
  }

  get db() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
