import { Constants } from "expo";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import getPermission from "../utils/getPermission";

const options = {
  allowsEditing: true
};

export default class SelectPhotoScreen extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._selectPhoto} style={styles.text}>
          Select Photo
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          Take Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
