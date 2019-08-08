import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { array } from 'prop-types';

const style = StyleSheet.create({
    errorBoxStyle: { padding: 10, marginTop: 20, width: '94%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 },
    titleStyle: { marginBottom: 10, fontWeight: '500' },
    passErrors: { color: '#FC4118' },
});

function PasswordRequirementBox( props ) {

    const { errorBoxStyle, titleStyle, passErrors } = style;

    const { signupError } = props;

    return (
        <View style={ errorBoxStyle }>
            <Text style={ titleStyle }>Password Requirement</Text>
            <Text style={ signupError.includes( 'error_no_number' ) ? passErrors : {} }>1 number.</Text>
            <Text style={ signupError.includes( 'error_one_upper' ) ? passErrors : {} }>1 upppercase character.</Text>
            <Text style={ signupError.includes( 'error_one_lower' ) ? passErrors : {} }>1 lowercase character.</Text>
            <Text style={ signupError.includes( 'error_one_special' ) ? passErrors : {} }>1 special character.</Text>
            <Text style={ signupError.includes( 'error_eight_chars' ) ? passErrors : {} }>8 characters or longer.</Text>
        </View>
    );
}

PasswordRequirementBox.propTypes = {
    signupError: array,
}

PasswordRequirementBox.defaultProps = {
    signupError: [],
}

export default React.memo( PasswordRequirementBox );