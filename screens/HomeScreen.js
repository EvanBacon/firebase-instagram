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

        const logoStyle = {}

        const loginStyle = {}

        const accountStyle = {}

        return (
            <View
                style={ pageStyle }
            >
                <Text
                    style={ logoStyle }
                >
                    Finsta 🔥
                </Text>
                <Button
                    title='Login'
                    style={ loginStyle }
                    onPress={() => this.props.navigation.navigate('SignIn')}
                />
                <Button
                    title='Create Account'
                    style={ accountStyle }
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        )
    }
}