/***********************
 * Module dependencies *
 ***********************/
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';

import Fire from '../Fire';

/******************************
 * Export class NewPostScreen *
 *****************************/

export default class NewPostScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <HeaderButtons.Item
          title="Share"
          onPress={() => {
            const text = navigation.getParam('text');
            const image = navigation.getParam('image');
            if (text && image) {
              navigation.goBack();
              Fire.shared.post({ text: text.trim(), image });
            } else {
              alert('Need valid description');
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  state = { text: '' };

  render() {
    const { image } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Image
            source={{ uri: image }}
            style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
          />
          <TextInput
            multiline
            style={{ flex: 1, paddingHorizontal: 16 }}
            placeholder="Add a neat description..."
            onChangeText={text => {
              this.setState({ text });
              this.props.navigation.setParams({ text });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
