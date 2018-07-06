import React from 'react';
import { FlatList } from 'react-native';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {
  renderItem = item => <Item item={item} />;
  keyExtractor = (item, index) => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List;
