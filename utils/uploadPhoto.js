import firebase from 'firebase';
function uploadPhoto(uri, uploadUri) {
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
      }
    );
  });
}

export default uploadPhoto;
