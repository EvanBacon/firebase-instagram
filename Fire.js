const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

import { ImageManipulator } from 'expo';
import uuid from 'uuid';
import getUserInfo from './utils/getUserInfo';
import getSlug from './utils/getSlug';

const collectionName = getSlug();

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
      try {
        await firebase.auth().signInAnonymously();
        alert('signed in!');
      } catch ({ message }) {
        alert(message);
      }
    } else {
      await this.onAuthorized(user);
    }
  };

  onAuthorized = async user => {
    this.userData = getUserInfo();
  };

  getPaged = async ({ size, start }) => {
    console.log('getPaged:', size, start);
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    console.log('getPaged:ref:', !!ref);
    try {
      if (start) {
        console.log('getPaged:hasStart:', start);
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      console.log('getPaged: Got data', !!querySnapshot);
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (!doc.exists) {
          console.log("Fire.getPaged(): Error: data doesn't exist", {
            size,
            start,
            collectionName,
          });
        } else {
          const _data = doc.data();
          const reduced = { key: doc.id, ..._data };
          data.push(reduced);
          console.log('getPaged: Parse:', reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      console.log('getPaged: End: data:', !!data, 'cursor:', !!lastVisible);
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
      console.error('getPaged: Error: getting documents: ', message);
    }
  };

  reduceImage = async uri => {
    return ImageManipulator.manipulate(uri, [{ resize: { width: 500 } }], {
      compress: 0.5,
    });
  };

  advancedImageUpload = async (uri, uploadUri) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = firebase.storage().ref(uploadUri);
      const unsubscribe = ref.put(blob).on(
        'state_changed',
        nState => {
          const {
            metadata,
            bytesTransferred,
            downloadUrl,
            ref,
            task,
            totalBytes,
            state,
          } = nState;

          const progress = (bytesTransferred || 0) / totalBytes;
          console.log('State Change', progress);
          //Current upload state

          switch (state) {
            case 'running': // or 'running'
              console.log('Upload is resumed');
              // resumed && resumed();
              break;
            case 'success': // or 'running'
              console.log('Upload is done');
              // var _progress = (bytesTransferred / totalBytes);
              // onProgress && onProgress(_progress);
              break;
          }
        },
        err => {
          //Error
          console.log("Error: Couldn't upload image");
          console.error(err);
          unsubscribe();
          rej(err);
        },
        async uploadedFile => {
          //Success
          const url = await ref.getDownloadURL();

          console.log('Image uploaded!', url);
          unsubscribe();
          res(url);
        },
      );
    });
  };

  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return this.advancedImageUpload(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    console.log('post', text, localUri, this.userData);
    try {
      const { uri: reducedImage, width, height } = await this.reduceImage(
        localUri,
      );
      console.log({ reducedImage });

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      console.log({ remoteUri });
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
      console.warn(message);
      alert(message);
    }
  };

  get collection() {
    return this.db.collection(collectionName);
  }

  get userDoc() {
    return this.db.collection('users').doc(this.uid);
  }

  get doc() {
    return this.collection.doc(this.uid);
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
