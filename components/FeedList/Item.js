import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
export default class Item extends React.Component {
  onPress = () => {
    const { item, index, onPress } = this.props;
    onPress(item, index);
  };

  state = {};
  componentDidMount() {
    if (!this.props.item.imageWidth) {
      Image.getSize(this.props.item.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }
  render() {
    const {
      item: { text, user, imageWidth, imageHeight, uid, image },
      index,
      onPress,
      style,
      ...props
    } = this.props;

    let name = (user || {}).deviceName || 'Secret Duck';
    let imgW = imageWidth || this.state.width;
    let imgH = imageHeight || this.state.height;
    let aspect = imgW / imgH || 1;

    const profileImageSize = 36;
    return (
      <View style={styles.container}>
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
        <Image
          style={{
            backgroundColor: '#D8D8D8',
            width: width,
            aspectRatio: aspect,
            resizeMode: 'contain',
          }}
          source={{ uri: image }}
        />

        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 12,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
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

          <Text style={styles.text}>{name}</Text>

          {text && <Text style={styles.subtitle}>{text}</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {},
  container: {},
  rank: {
    alignSelf: 'center',
    fontSize: 24,
    minWidth: 48,
    marginRight: 8,
  },
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8,
  },
});
