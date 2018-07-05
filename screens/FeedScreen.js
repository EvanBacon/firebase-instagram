import React, { Component } from 'react';
import {
  Text,
  RefreshControl,
  View,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';
import firebase from 'firebase';
// You can import from local files
// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json
import Fire from '../Fire';
import List from '../components/FeedList/List';
import Item from '../components/FeedList/Item';

const PAGE_SIZE = 5;

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {
      // batman: {
      //   image:
      //     'https://firebasestorage.googleapis.com/v0/b/instahamm-b09ce.appspot.com/o/snack-SJucFknGX%2FukGTCRUOxjOeTWR56c1FC1fXDut2%2Fb77a392c-795a-43c7-89a9-ee7173d644fd.jpg?alt=media&token=db55c491-3dc4-4acb-ab8c-ac6674b2c455',
      //   key: 'FTw4ffeKWT0jeY7Vvf68',
      //   text: 'Vegans are not cars',
      //   uid: 'ukGTCRUOxjOeTWR56c1FC1fXDut2',
      //   name: 'Batman',
      // },
    },
    page: 1,
    error: null,
    refreshing: false,
  };

  componentDidMount() {
    if (Fire.shared.uid) {
      this.makeRemoteRequest();
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.makeRemoteRequest();
        }
      });
    }
  }

  addChild = item => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        [item.key]: item,
      };
      return {
        data,
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };

  makeRemoteRequest = async lastKey => {
    if (!Fire.shared.uid || this.state.loading) {
      console.log("FeedScreen: won't update; fetching or not authed...");
      this.setState({ loading: false });
      return;
    } else {
      console.log('FeedScreen: will try fetching data...');
    }

    this.setState({ loading: true });

    const { data, cursor } = await Fire.shared.getPaged({
      size: PAGE_SIZE,
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    console.log('FeedScreen: Got data', data);
    for (let child of data) {
      this.addChild(child);
    }
    this.setState({ loading: false });
  };

  _onRefresh = () => {
    this.makeRemoteRequest();
  };

  handleLoadMore = () => {
    this.makeRemoteRequest(this.lastKnownKey);
  };

  onPressFooter = () => {
    this.handleLoadMore();
  };

  renderItem = ({ item, index }) => <Item index={index} item={item} />;

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <List
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }
          style={{ flex: 1 }}
          renderItem={this.renderItem}
          onPressFooter={this.onPressFooter}
          data={this.state.posts}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
