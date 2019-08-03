import Fire from '../Fire';
import React from 'react';
import { Button, TextInput, Alert, StyleSheet } from 'react-native';
import { bool, func, string } from 'prop-types';
import BaseModal from './BaseModal';

const style = StyleSheet.create({
    inputStyle: {
        padding: 10,
        width: '90%',
        height: 50,
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 6,
        borderColor: 'gray',
        borderWidth: 1
    }
});

function PasswordResetModal( props ) {

    const {
        modalVisible,
        toggle,
        reset,
        resetEmail,
    } = props;

    const {
        inputStyle
    } = style;

    return (
        <BaseModal
            modalVisible={ modalVisible }
            transparent={ false }
            animationType="slide"
            toggle={ toggle }
            title='Password Reset'
            closeBtnText='Close'
        >
            <TextInput
                placeholder="Email Address"
                onChangeText={ resetEmail => reset( resetEmail ) }
                value={ resetEmail }
                style={ inputStyle }
                autoCapitalize='none'
                returnKeyType='done'
            />
            <Button
                title="Reset Password"
                onPress={ async () => {
                    const res = await Fire.shared.resetPasswordHandler( resetEmail );

                    if ( res ) {
                        Alert.alert('Password Reset Fam.');
                    }
                }}
            />
        </BaseModal>
    );
}

PasswordResetModal.propTypes = {
    modalVisible: bool,
    toggle: func,
    reset: func,
    resetEmail: string,
}

export default PasswordResetModal;