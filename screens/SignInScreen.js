import firebase from 'firebase';
import React from 'react';
import {
  View,
  ScrollView,
  Button,
  TextInput,
  AsyncStorage,
  Text,
} from 'react-native';
import { shape, func } from 'prop-types';
import { Brain } from '../Crainium';
import PasswordResetModal from '../components/PasswordResetModal';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    },
  }

  static propTypes = {
    navigation: shape({ navigate: func.isRequired }).isRequired,
  }

  state = {
    modalVisible: false,
    resetEmail: '',
    setResetEmail: resetEmail => this.setState({ resetEmail }),
    toggleModal: () => this.setState(prevState => ({ modalVisible: !prevState.modalVisible })),
    email: '',
    password: '',
    error: false,
    authListener: () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        const { navigation: { navigate } } = this.props;
        if (user) {
          // Do logged in stuff
          await AsyncStorage.setItem('userToken', Brain.uid);
          return navigate('App');
        }
        return false;
      });
    },
  };


  componentDidMount() {
    const { authListener } = this.state;
    authListener();
  }

  componentWillUnmount() {
    this.setState({ authListener: null });
  }

  // eslint-disable-next-line react/sort-comp
  render() {
    const pageStyle = { marginTop: 100, flexGrow: 1 };

    const inputStyle = {
      padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: 'gray', borderWidth: 1,
    };

    const logoStyle = { textAlign: 'center', fontSize: 30, marginBottom: 30 };

    const errorMsgStyle = {
      textAlign: 'center', fontSize: 16, marginTop: 30, color: '#FC4118', fontWeight: '400',
    };

    const signinStyle = {
      backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6,
    };

    const passwordOpenStyle ={ marginTop: 50 };

    const { error, email, password, modalVisible, toggleModal, setResetEmail, resetEmail } = this.state;

    return (
      <ScrollView
        contentContainerStyle={pageStyle}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={logoStyle}>Finsta 🔥</Text>
        <TextInput
          placeholder="Email"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={this.handleEmailInput}
          value={email}
          style={inputStyle}
          autoCapitalize="none"
          returnKeyType="done"
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          onChangeText={this.handlePasswordInput}
          value={password}
          style={inputStyle}
          autoCapitalize="none"
          returnKeyType="done"
        />
        <View
          style={signinStyle}
        >
          <Button
            title="Sign in"
            onPress={this.signInAsync}
            color="#f5f5f5"
          />
        </View>
        { error
          ? <Text style={errorMsgStyle}>Email or Password Incorrect</Text>
          : null
                }
        <PasswordResetModal
            modalVisible={modalVisible}
            toggle={toggleModal}
            reset={setResetEmail}
            resetEmail={resetEmail}
            openBtnStyle={passwordOpenStyle}
          />
      </ScrollView>
    );
  }

    handleEmailInput = email => this.setState({ email });

    handlePasswordInput = password => this.setState({ password });

    signInAsync = async () => {
      const { email, password } = this.state;
      const { signIn } = Brain;
      const { user } = await signIn({ email, password });

      if (!user) {
        return this.setState({ error: true });
      }
      return this.setState({ error: false });
    };
}
