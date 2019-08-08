import React, { Component } from 'react';
import { LayoutAnimation, RefreshControl } from 'react-native';

import List from '../components/List';
import { Brain } from '../Crainium';

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;

export default class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
  };

  componentDidMount() {
    // Check if we are signed in...
    if (Brain.uid) {
      // If we are, then we can get the first 5 posts
      this.makeRemoteRequest();
    }
  }

  // Append the item to our states `data` prop
  addPosts = (posts) => {
    this.setState((previousState) => {
      const data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async (lastKey) => {
    const { loading } = this.state;
    // If we are currently getting posts, then bail out..
    if (loading) {
      return;
    }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await Brain.getPaged({
      size: PAGE_SIZE,
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    const posts = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    const { loading, posts } = this.state;
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
      <List
        onPressFooter={this.onPressFooter}
        data={posts}
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={this.onRefresh}
          />
        )}
      />
    );
  }
}
