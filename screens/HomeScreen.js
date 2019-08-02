import firebase from 'firebase';
import Fire from '../Fire';
import React from 'react';
import { View, Button, Text } from 'react-native';

/**
 * Home Screen
 * 
 * @desc First screen you see when you load app unauthenticated.
 */
export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {

        const pageStyle = { height: '100%', justifyContent: 'center' }

        const logoStyle = { textAlign: 'center', fontSize: 50, marginBottom: 30 }

        const loginStyle = { backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 }

        const accountStyle = { marginTop: 30 }

        return (
            <View
                style={ pageStyle }
            >
                <Text
                    style={ logoStyle }
                >
                    Finsta 🔥
                </Text>
                <View
                    style={ loginStyle }
                >
                    <Button
                        title='Login'
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        color='#f5f5f5'
                    />
                </View>
                <View
                    style={ accountStyle }
                >
                    <Button
                        title='Create Account'
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
            </View>
        )
    }
}