// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import tabBarIcon from './utils/tabBarIcon';
// Import the screens
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import SignupScreen from './screens/SignupScreen';
import AccountScreen from './screens/AccountScreen';
import WelcomeScreen from './screens/WelcomeScreen';

// Create our main tab navigator for moving between the Feed and Photo screens
const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('perm-identity')
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const AppStack = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'Finsta 🔥', headerStyle: { borderBottomWidth: 0 } },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

const AuthStack = createStackNavigator(
  {
    Home: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignupScreen,
  },
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

// Export it as the root component
export default AppContainer;
