/***********************
 * Module dependencies *
 ***********************/
import firebase from 'firebase';
import React, { Component } from 'react';
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import Item from '../components/FeedList/Item';
import List from '../components/FeedList/List';
import Fire from '../Fire';

const PAGE_SIZE = 5;

/***************************
 * Export class FeedScreen *
 **************************/
export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
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
    backgroundColor: 'white',
  },
});
