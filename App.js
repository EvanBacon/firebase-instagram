// Import the screens
import FeedScreen from './screens/FeedScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import NewPostScreen from './screens/NewPostScreen';

import tabBarIcon from './components/tabBarIcon';

// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

const navigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('home'),
        tabBarLabel: null,
      },
    },
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

const uploadNavigator = createStackNavigator({
  Main: {
    screen: navigator,
    navigationOptions: () => ({ title: 'Instaham 🐷' }),
  },
  NewPost: NewPostScreen,
});

// Export it as the root component
export default uploadNavigator;
