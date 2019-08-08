import React from 'react'
import { StyleSheet, Button, Text } from 'react-native';
import { object, array } from 'prop-types';

const style = StyleSheet.create({
    errorMsgStyle: { textAlign: 'center', fontSize: 16, marginTop: 30, color: '#FC4118', fontWeight: '400' },
});


function SignupErrorBox( props ) {
    const { signupError, navigation } = props;
    const { errorMsgStyle } = style;
    const msgOne = signupError 
        ? signupError
            .filter( err => err !== 'error_no_number' )
            .filter( err => err !== 'error_one_upper' )
            .filter( err => err !== 'error_one_lower' )
            .filter( err => err !== 'error_one_special' )
            .filter( err => err !== 'error_eight_chars' )
            .map(err => <Text key={err} style={ errorMsgStyle }>{ err }</Text>)
        : null
    const msgTwo = signupError.includes( 'Email already in use.' )
        ? <Button
            title='Sign In'
            onPress={() => navigation.goBack() }
            />
        : null

    return (
        <>
        { msgOne }
        { msgTwo }
        </>
    );
}

SignupErrorBox.propTypes = {
    signupError: array,
    navigation: object
}

SignupErrorBox.defaultProps = {
    signupError: [],
    navigation: {},
}

export default React.memo(SignupErrorBox);
