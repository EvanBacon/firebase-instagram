import React from 'react';
import {
  Button, TextInput, Alert, StyleSheet,
} from 'react-native';
import {
  bool, func, string, object,
} from 'prop-types';
import { Brain } from '../Crainium';
import BaseModal from './BaseModal';

const style = StyleSheet.create({
  inputStyle: {
    padding: 10,
    width: '90%',
    height: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 6,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

function PasswordResetModal(props) {
  const {
    modalVisible,
    toggle,
    reset,
    resetEmail,
    handleReset,
    openBtnStyle,
  } = props;

  const { inputStyle } = style;

  return (
    <BaseModal
      modalVisible={modalVisible}
      transparent={false}
      animationType="slide"
      toggle={toggle}
      title="Password Reset"
      closeBtnText="Close"
      openBtnText="Forgot Password"
      openBtnStyle={openBtnStyle}
    >
      <TextInput
        placeholder="Email Address"
        onChangeText={input => reset(input)}
        value={resetEmail}
        style={inputStyle}
        autoCapitalize="none"
        returnKeyType="done"
      />
      <Button
        title="Reset Password"
        onPress={async () => {
          const res = await handleReset(resetEmail);
 
          if (res) {
            Alert.alert('Password Reset Fam.');
          } else {
            Alert.alert('Enter Valid Email');
          }
        }}
      />
    </BaseModal>
  );
}

PasswordResetModal.propTypes = {
  modalVisible: bool.isRequired,
  toggle: func.isRequired,
  reset: func.isRequired,
  resetEmail: string.isRequired,
  handleReset: func,
  openBtnStyle: object,
};

PasswordResetModal.defaultProps = {
  handleReset: Brain.resetPasswordHandler,
  openBtnStyle: {},
};

export default PasswordResetModal;
