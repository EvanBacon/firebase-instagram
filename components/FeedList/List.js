/***********************
 * Module dependencies *
 ***********************/
import React from 'react';
import { Dimensions, FlatList, Platform } from 'react-native';

import Footer from './Footer';
import Item from './Item';
import Separator from './Separator';

// import Header from './Header';
const isIphone = Platform.OS === 'ios';
//https://github.com/ptelad/react-native-iphone-x-helper/blob/3c919346769e3cb9315a5254d43fcad1aadee777/index.js#L1-L11
function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    isIphone &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

class List extends React.Component {
  renderItem = props => {
    if (this.props.renderItem) {
      return this.props.renderItem(props);
    }

    return <Item {...props} onPress={this.props.onPress} />;
  };

  keyExtractor = (item, index) => `item-${index}`;

  render() {
    const {
      style,
      title,
      onPressHeader,
      onPressFooter,
      onPress,
      headerButtonTitle,
      ...props
    } = this.props;
    return (
      <FlatList
        style={style}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        ItemSeparatorComponent={Separator}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
/***************
 * Export List *
 **************/
export default List;
