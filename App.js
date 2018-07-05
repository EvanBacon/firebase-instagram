// Import the screens
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import tabBarIcon from './components/tabBarIcon';
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';

// Import React Navigation
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
