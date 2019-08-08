import React from 'react';
import { FlatList } from 'react-native';
import { func } from 'prop-types';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {
  static propTypes = {
    onPressFooter: func.isRequired,
  }

  renderItem = ({ item }) => <Item {...item} />;

  keyExtractor = item => item.key;

  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
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
