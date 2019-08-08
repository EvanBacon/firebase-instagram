import React from 'react';
import {
  TextInput, View, Button, StyleSheet,
} from 'react-native';
import { func, bool, string } from 'prop-types';

const style = StyleSheet.create({
  inputStyle: {
    padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: 'gray', borderWidth: 1,
  },
  errorStyle: {
    padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: '#FC4118', borderWidth: 1,
  },
  signupStyle: {
    backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6,
  },
});

function SignupForm(props) {
  const {
    handleEmailInput,
    handlePasswordInput,
    handleUsernameInput,
    handleAddUser,
    email,
    isEmailValid,
    password,
    isPassValid,
    username,
    isUsernameValid,
    loading,
  } = props;

  const {
    inputStyle,
    errorStyle,
    signupStyle,
  } = style;

  return (
    <>
      <TextInput
        placeholder="Email"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={handleEmailInput}
        value={email}
        style={isEmailValid ? inputStyle : errorStyle}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <TextInput
        placeholder="Password"
        textContentType="password"
        secureTextEntry
        onChangeText={handlePasswordInput}
        value={password}
        style={isPassValid ? inputStyle : errorStyle}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <TextInput
        placeholder="Username"
        textContentType="username"
        onChangeText={handleUsernameInput}
        value={username}
        autoCapitalize="none"
        style={isUsernameValid ? inputStyle : errorStyle}
        returnKeyType="done"
      />
      <View
        style={signupStyle}
      >
        <Button
          title="Sign up! 🔥"
          onPress={handleAddUser}
          color="#f5f5f5"
          disabled={loading}
        />
      </View>
    </>
  );
}

SignupForm.propTypes = {
  username: string,
  password: string,
  email: string,
  handleEmailInput: func.isRequired,
  handlePasswordInput: func.isRequired,
  handleUsernameInput: func.isRequired,
  handleAddUser: func.isRequired,
  isEmailValid: bool.isRequired,
  isPassValid: bool.isRequired,
  isUsernameValid: bool.isRequired,
  loading: bool.isRequired,
};

SignupForm.defaultProps = {
  username: '',
  password: '',
  email: '',
};

export default React.memo(SignupForm);
