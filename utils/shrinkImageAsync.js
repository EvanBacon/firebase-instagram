import * as ImageManipulator from 'expo-image-manipulator';

function reduceImageAsync(uri) {
  return ImageManipulator.manipulate(uri, [{ resize: { width: 500 } }], {
    compress: 0.5,
  });
}
export default reduceImageAsync;
