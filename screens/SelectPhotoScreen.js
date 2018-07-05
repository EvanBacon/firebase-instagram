import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json
import { ImagePicker, Permissions } from 'expo';

export default class App extends Component {
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
    // if (this._getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.props.navigation.navigate('NewPost', { image: result.uri });
    }
    // }
  };

  _takePhoto = async () => {
    if (this._getPermissionAsync(Permissions.CAMERA)) {
      const result = await ImagePicker.launchCameraAsync();
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
