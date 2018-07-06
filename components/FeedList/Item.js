/***********************
 * Module dependencies *
 ***********************/
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default class Item extends React.Component {
  state = {};

  componentDidMount() {
    if (!this.props.item.imageWidth) {
      Image.getSize(this.props.item.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { text, user, imageWidth, imageHeight, uid, image } = this.props.item;

    const name = (user || {}).deviceName || 'Secret Duck';
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View style={styles.container}>
        <Header image={image} name={name} />
        <Image
          style={{
            backgroundColor: '#D8D8D8',
            width: width,
            aspectRatio: aspect,
            resizeMode: 'contain',
          }}
          source={{ uri: image }}
        />
        <Metadata name={name} description={text} />
      </View>
    );
  }
}

const Metadata = ({ name, description }) => (
  <View
    style={{
      paddingVertical: 12,
      paddingHorizontal: 12,
    }}
  >
    <IconBar />
    <Text style={styles.text}>{name}</Text>
    {description && <Text style={styles.subtitle}>{description}</Text>}
  </View>
);

const Header = ({ image, name }) => {
  const profileImageSize = 36;

  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            aspectRatio: 1,
            backgroundColor: '#D8D8D8',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#979797',
            borderRadius: profileImageSize / 2,
            width: profileImageSize,
            height: profileImageSize,
            resizeMode: 'cover',
            marginRight: 12,
          }}
          source={{ uri: image }}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Ionicons name="ios-more" size={23} color="black" />
    </View>
  );
};

const IconBar = () => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Ionicons
        style={{ marginRight: 8 }}
        name="ios-heart-outline"
        size={23}
        color="black"
      />
      <Ionicons
        style={{ marginRight: 8 }}
        name="ios-chatbubbles-outline"
        size={23}
        color="black"
      />
      <Ionicons
        style={{ marginRight: 8 }}
        name="ios-send-outline"
        size={23}
        color="black"
      />
    </View>
    <Ionicons name="ios-bookmark-outline" size={23} color="black" />
  </View>
);

const styles = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8,
  },
});
