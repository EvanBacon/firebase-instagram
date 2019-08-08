import React from 'react';
import { Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const numColumns = 3;

let placeholder = Array.apply(null, Array(20)).map((v, i) => {
  return { id: i, src: 'http://placehold.it/200x200?text='+(i+1),  }
});

function AccountFeed(props) {
    const { images = placeholder } = props;
    
    return (
            <FlatList
              data={images}
              renderItem={renderItem}
              numColumns={numColumns}
              keyExtractor={item => `${item.id}`}
            />
    );
}

function renderItem({ item }) {
    const { width } = Dimensions.get('window');
    const itemSize = Math.floor( width / numColumns );

    return(
      <TouchableOpacity
        style = {{ width: itemSize, height: itemSize, paddingTop: 1, marginLeft: 0.5, marginRight: 0.5 }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    );
}


export default React.memo( AccountFeed );