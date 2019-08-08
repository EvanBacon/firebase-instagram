import { Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { Brain } from '../Crainium';
import { passwordValidator, scorePassword } from '../utils/passwordHelpers';
import { emailValidator } from '../utils/emailHelpers';
import BaseScreen from '../components/BaseScreen';
import {
  SignupErrorBox, SignupForm, PasswordRequirementBox, PassStrengthBar,
} from '../components/Signup/index';

const style = StyleSheet.create({
  headerStyle: { textAlign: 'center', fontSize: 30, marginBottom: 30 },
});

export default class SignupScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    },
  }

  static propTypes = {
    navigation: shape({
      navigate: func,
    }),
  }

  static defaultProps = {
    navigation: {},
  }

  state = {
    isPassValid: true,
    passwordScore: 0,
    password: '',
    isEmailValid: true,
    email: '',
    isUsernameValid: true,
    username: '',
    signupError: [],
    loading: false,
    handleAddUser:       e => this.handleAddUser(e),
    handleEmailInput:    e => this.handleEmailInput(e),
    handleUsernameInput: e => this.handleUsernameInput(e),
    handlePasswordInput: e => this.handlePasswordInput(e),
  };

  render() {
    const { signupError, passwordScore } = this.state;
    const { navigation } = this.props;
    const { headerStyle } = style;

    return (
      <BaseScreen>
        <Text style={headerStyle}>Join In!</Text>
        <SignupForm {...this.state} />
        <SignupErrorBox
          signupError={signupError}
          navigation={navigation}
        />
        <PassStrengthBar
          passwordScore={passwordScore}
          progressViewStyle="default"
          progressTintColor="#185CC6"
          trackTintColor="#f6f6f6"
        />
        <PasswordRequirementBox signupError={signupError} />
      </BaseScreen>
    );
  }

  /**
   * Add Users To Database
   */
  handleAddUser = async () => {
    const {
      email,
      password,
      username,
      signupError,
    } = this.state;

    this.setState({ loading: true, signupError: [] });

    let errorDetector = false;

    // Check if emails not valid and handle biz.
    if (!email) {
      errorDetector = true;
      this.setState(prevState => ({ signupError: [...prevState.signupError, 'Enter email address.'], isEmailValid: false }));
    }

    const checkEmail = await emailValidator(email);

    if (!checkEmail.isEmailValid) {
      errorDetector = true;
      this.setState(prevState => ({ signupError: [...prevState.signupError, 'Email format should be youremail@example.com.'], isEmailValid: false }));
    } else {
      this.setState({ isEmailValid: true });
    }

    // Check password.
    if (!password) {
      errorDetector = true;
      this.setState(prevState => ({ signupError: [...prevState.signupError, 'Enter password.'], isPassValid: false }));
    }

    const checkPass = await passwordValidator(password);

    if (!checkPass.isPassValid) {
      errorDetector = true;
      this.setState(prevState => ({
        signupError: [...prevState.signupError, ...checkPass.signupError],
        isPassValid: false,
      }));
    } else {
      this.setState({ isPassValid: true });
    }

    // Checking to make sure the username doesn't exist.
    // Will return true if username exists.
    if (!username) {
      errorDetector = true;
      this.setState(prevState => ({
        signupError: [...prevState.signupError, 'Enter username.'],
        isUsernameValid: false,
      }));
    }

    const checkUsernameReq = await Brain.checkIfUsernameExists(username);

    if (checkUsernameReq) {
      errorDetector = true;
      this.setState(prevState => ({ signupError: [...prevState.signupError, 'Username already exists'], isUsernameValid: false }));
    } else {
      this.setState({ isUsernameValid: true });
    }

    if (!password || !email || !username || signupError.length > 0 || errorDetector) {
      return this.setState({ loading: false });
    }

    const createUserReq = await Brain.createUser({ email, password, username });

    // If we have a signup error let em know.
    if (typeof createUserReq !== 'undefined' && createUserReq.status === 'error') {
      if (createUserReq.code === 'auth/email-already-in-use') {
        return this.setState({ signupError: [...signupError, 'Email already in use.'], isEmailValid: false, loading: false });
      }
      return this.setState(prevState => ({
        signupError: [...prevState.signupError, createUserReq.message],
        loading: false,
      }));
    }

    return this.setState({ loading: false });
  }

  /**
   * Add Email to State and validate while typing
   */
  handleEmailInput = (email) => {
    this.setState({ email, signupError: [], isEmailValid: true });
  };

  /**
   * Add Password to State while typing
   */
  handlePasswordInput = async (password) => {
    const { passwordScore } = await scorePassword(password);
    this.setState({
      password, passwordScore, isPassValid: true, signupError: [],
    });
  }

  /**
   * Handle Username Input
   */
  handleUsernameInput = (username) => {
    this.setState({ username, signupError: [], isUsernameValid: true });
  }
}
