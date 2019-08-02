import firebase from 'firebase';
import Fire from '../Fire';
import React from 'react';
import {
    View,
    ScrollView,
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
        headerStyle: {
            borderBottomWidth: 0,
        }
    }
    
    componentDidMount() {
        const { authListener } = this.state;
        authListener();
    }

    componentWillUnmount() {
        this.setState({ authListener: null });
    }

    render() {

        const pageStyle = { marginTop: 100, height: '100%' }

        const inputStyle = { padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: 'gray', borderWidth: 1 }

        const logoStyle = { textAlign: 'center', fontSize: 30, marginBottom: 30 }

        const errorMsgStyle = { textAlign: 'center', fontSize: 16, marginTop: 30, color: '#FC4118', fontWeight: '400' }

        const signinStyle = { backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 }

        const { error, email, password } = this.state;

        return (
            <ScrollView
                contentContainerStyle={pageStyle}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={ logoStyle }>Finsta 🔥</Text>
                <TextInput
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    onChangeText={ this._handleEmailInput }
                    value={ email }
                    style={ inputStyle }
                    autoCapitalize='none'
                    returnKeyType='done'
                />
                <TextInput
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry={ true }
                    onChangeText={ this._handlePasswordInput }
                    value={ password }
                    style={ inputStyle }
                    autoCapitalize='none'
                    returnKeyType='done'
                />
                <View
                    style={ signinStyle }
                >
                    <Button
                        title='Sign in'
                        onPress={ this._signInAsync }
                        color='#f5f5f5'
                    />
                </View>
                { error 
                    ? <Text style={ errorMsgStyle }>Email or Password Incorrect</Text>
                    : null
                }
            </ScrollView>
        );
    }

    _handleEmailInput = email => this.setState({ email });

    _handlePasswordInput = password => this.setState({ password });
  
    _signInAsync = async () => {
        const { email, password } = this.state;
        const { signIn } = Fire.shared;
        const { user } = await signIn({ email, password });

        if ( ! user ) {
            return this.setState({error: true});
        } else {
            return this.setState({error: false});
        }
    };
  }