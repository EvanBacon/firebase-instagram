import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, ViewPropTypes,
} from 'react-native';
import { func } from 'prop-types';

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  text: { fontWeight: 'bold', fontSize: 16 },
});

export default class Footer extends React.Component {
  static propTypes = {
    onPress: func.isRequired,
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    style: {},
  }

  onPress = () => {
    const { onPress } = this.props;
    return onPress();
  };

  render() {
    const { onPress, style, ...props } = this.props;
    return (
      <TouchableHighlight
        underlayColor="#eeeeee"
        {...props}
        onPress={this.onPress}
        style={[styles.touchable, style]}
      >
        <Text style={styles.text}>Load More...</Text>
      </TouchableHighlight>
    );
  }
}
