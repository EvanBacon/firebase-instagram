import Fire from '../Fire';
import React from 'react';
import { Modal, View, Button, Text, TextInput, Alert } from 'react-native';

function PasswordResetModal( props ) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalVisible}
            style={{width: '100%'}}
            onRequestClose={() => setModalVisable( ! props.modalVisible )}>
            <View
                style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center'}}
            >
                <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 18}}>Reset Password</Text>
                <TextInput
                    placeholder="Email Address"
                    onChangeText={resetEmail => props.reset(resetEmail)}
                    value={props.resetEmail}
                    style={props.inputStyle}
                    autoCapitalize='none'
                    returnKeyType='done'
                />
                <Button
                    title="Reset Password"
                    onPress={ async () => {
                        const res = await Fire.shared.resetPasswordHandler( props.resetEmail );

                        if ( res ) {
                            Alert.alert('Password Reset Fam.');
                        }
                    }}
                />
                <Button
                    title="Cancel"
                    onPress={() => props.toggle( ! props.modalVisible )}
                />
            </View>
        </Modal>
    );
}

export default PasswordResetModal;