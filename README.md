# Expo Firebase Instagram

Made with Expo & Web Firebase SDK

Original Tutorial by Evan Bacon: https://blog.expo.io/instagram-clone-using-firebase-react-native-expo-cc32f61c7bba

Forked and Updated Version 2019

## Getting Started

Download with: 

```sh 
git clone https://github.com/freddiemixell/firebase-instagram.git && cd firebase-instagram
```

Install Libs:

```sh 
yarn
```

Run with:

```sh 
expo start
```

## Setup Firebase

##### Step 1: Create blank config file in project root.

```sh
touch ./config.js
```

##### Step 2: Copy this into your config.

```javascript
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export default config;
```

##### Step 3: Copy Firebase Config over blank config.
