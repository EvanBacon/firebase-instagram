import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

export default class AccountScreen extends React.Component {

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View>
                <Button
                    title="Sign Out"
                    onPress={this._signOutAsync}
                />
            </View>
        )
    }
}