import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';
import config from './config';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'snack-SJucFknGX';

class Fire {
  constructor() {
    firebase.initializeApp(config);
  }

  signIn = async ({ email, password }) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      // Maybe log these with sentri
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
      return false
    });
  }

  signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function({ message }) {
      console.log(message);
    });
  }

  createUser = ({
    email,
    password,
    firstName = '',
    lastName = '',
    username = '',
  }) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      // Get user id in callback store in database
      const userID = user.uid;
      // Store users meta data
      const userData = {
        email,
        firstName,
        lastName,
        username,
        following: [],
        followers: [],
        profilePictureUrl: "",
        activityStatus: true,
        accountPrivate: false,
        mutedAccounts: [],
        blockedUsers: [],
        blockComments: [],
        allowTags: true,
        searchHistory: [],
        blockAllNotifications: false,
        allowPostNotifications: false,
        allowCommentNotifications: false,
        allowFollowerNotifications: false,
        allowDirectMessageNotifications: false,
        allowEmailNotifications: true,
        allowTextMessageNotifications: true,
        requestedVerification: false,
      }

      this.userCollection.doc(userID).set(userData);

      this.activityCollection.doc(userID).set({ posts: [] });

      this.postsCollection.doc(userID).set({ posts: [] });

    })
    .catch(function({ message }) {
      console.log(message);
    });
  }

  // Download Data
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
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
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

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get userCollection() {
    return firebase.firestore().collection('users');
  }

  get activityCollection() {
    return firebase.firestore().collection('activity');
  }

  get postsCollection() {
    return firebase.firestore().collection('posts');
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
