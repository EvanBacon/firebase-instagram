import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { shape, func } from 'prop-types';

import getPermission from '../utils/getPermission';

const options = {
  allowsEditing: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default class SelectPhotoScreen extends Component {
  static propTypes = {
    navigation: shape({ navigate: func.isRequired }).isRequired,
  }

  state = {};

  selectPhoto = async () => {
    const { navigation: { navigate } } = this.props;
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        return navigate('NewPost', { image: result.uri });
      }
    }
    return false;
  };

  takePhoto = async () => {
    const { navigation: { navigate } } = this.props;
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        return navigate('NewPost', { image: result.uri });
      }
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.selectPhoto} style={styles.text}>
          Select Photo
        </Text>
        <Text onPress={this.takePhoto} style={styles.text}>
          Take Photo
        </Text>
      </View>
    );
  }
}
