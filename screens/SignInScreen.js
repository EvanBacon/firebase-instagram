import firebase from 'firebase';
import Fire from '../Fire';
import React from 'react';
import {
    View,
    Button,
    TextInput,
    AsyncStorage,
    Text
} from 'react-native';

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            authListener: () => {
                firebase.auth().onAuthStateChanged(async user => {
                    if (user) {
                        // Do logged in stuff
                        await AsyncStorage.setItem('userToken', Fire.shared.uid);
                        this.props.navigation.navigate('App');
                    }
                });
            }
        }
    }

    static navigationOptions = {
      title: 'Please sign in',
    };
    
    

    componentDidMount() {
        const { authListener } = this.state;
        authListener();
    }

    componentWillUnmount() {
        this.setState({ authListener: null });
    }

    render() {
        const { error } = this.state;
        return (
            <View>
                <TextInput
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='username'
                    keyboardType='email-address'
                    onChangeText={this._handleEmailInput}
                    value={this.state.email}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={this._handlePasswordInput}
                    value={this.state.password}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    autoCapitalize='none'
                />
            <Button title="Sign in!" onPress={this._signInAsync} />
            { error ? <Text style={{textAlign:'center'}}>Email or Password Incorrect</Text> : null }
            </View>
        );
    }

    _handleEmailInput = email => this.setState({email});

    _handlePasswordInput = password => this.setState({password});
  
    _signInAsync = async () => {
        const { email, password } = this.state;
            await Fire.shared.signIn({email, password})
                .then(data => {
                    if ( ! data.user ) {
                        return this.setState({error: true});
                    } else {
                        return this.setState({error: false});
                    }
                });
    };
  }