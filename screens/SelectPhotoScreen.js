/***********************
 * Module dependencies *
 ***********************/
import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

/**********************************
 * Export class SelectPhotoScreen *
 *********************************/
export default class SelectPhotoScreen extends Component {
  state = {};

  _getPermissionAsync = async permission => {
    let { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      Linking.openURL('app-settings:');
      return false;
    }
    return true;
  };

  _selectPhoto = async () => {
    const status = await this._getPermissionAsync(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await this._getPermissionAsync(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Card title="Pick an image first">
          <Text onPress={this._selectPhoto} style={styles.paragraph}>
            Select Photo
          </Text>

          <Text onPress={this._takePhoto} style={styles.paragraph}>
            Take Photo
          </Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
