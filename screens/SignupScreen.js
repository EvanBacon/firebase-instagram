import Fire from '../Fire';

import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView
} from 'react-native';

export default class SignupScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            borderBottomWidth: 0,
        }
    }

    state = {
        isPassValid: true,
        passwordScore: 0,
        password: '',
        isEmailValid: true,
        email: '',
        isUsernameValid: true,
        username: '',
        signupError: '',
        loading: false,
    };

    render() {
        const {
            email,
            password,
            username,
            isUsernameValid,
            isEmailValid,
            isPassValid,
            signupError,
            loading
        } = this.state;

        const pageStyle = { marginTop: 100, flexGrow: 1 }

        const inputStyle = { padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: 'gray', borderWidth: 1 }

        const errorStyle = { padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: '#FC4118', borderWidth: 1 };

        const signupStyle = { backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 }

        const headerStyle = { textAlign: 'center', fontSize: 30, marginBottom: 30 }

        const errorMsgStyle = { textAlign: 'center', fontSize: 16, marginTop: 30, color: '#FC4118', fontWeight: '400' }

        return (
            <ScrollView
                contentContainerStyle={pageStyle}
                keyboardShouldPersistTaps='handled'
            >
                <Text style={ headerStyle } >
                    Join In!
                </Text>
                <TextInput
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    onChangeText={this._handleEmailInput}
                    value={email}
                    style={ isEmailValid ? inputStyle : errorStyle }
                    autoCapitalize='none'
                    returnKeyType='done'
                />
                <TextInput
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={this._handlePasswordInput}
                    value={password}
                    style={ isPassValid ? inputStyle : errorStyle }
                    autoCapitalize='none'
                    returnKeyType='done'
                />
                <TextInput
                    placeholder='Username'
                    textContentType='username'
                    onChangeText={this._handleUsernameInput}
                    value={username}
                    autoCapitalize='none'
                    style={isUsernameValid ?  inputStyle : errorStyle }
                    returnKeyType='done'
                />
                <View
                    style={ signupStyle }
                >
                    <Button
                        title='Sign up! 🔥'
                        onPress={this._handleAddUser}
                        color='#f5f5f5'
                        disabled={ loading }
                    />
                </View>
                { signupError ? <Text style={ errorMsgStyle }>{ signupError }</Text> : null }
                {
                    signupError === 'Email already in use.'
                        ? <Button
                            title='Sign In'
                            onPress={() => this.props.navigation.goBack() }
                            />
                        : null
                }
            </ScrollView>
        );
    }

    /**
     * Add Users To Database
     */
    _handleAddUser = async () => {
        const {
            email,
            password,
            username,
            signupError,
        } = this.state;

        this.setState({ loading: true });

        // Check if emails not valid and handle biz.
        if ( ! email ) {
            return this.setState({ signupError: 'Enter email address.', isEmailValid: false, loading: false });
        }

        const checkEmail = await this._emailValidator( email );

        if ( ! checkEmail.isEmailValid ) {
            return this.setState({ signupError: 'Email format should be youremail@example.com.', isEmailValid: false, loading: false });
        } else {
            this.setState({ isEmailValid: true, signupError: '' });
        }
        
        // Check password.
        if ( ! password ) {
            return this.setState({ signupError: 'Enter password.', isPassValid: false, isEmailValid: true, loading: false });
        }

        const checkPass = await this._passwordValidator( password );

        if ( ! checkPass.isPassValid ) {
            return this.setState({ signupError: checkPass.signupError, isPassValid: false, loading: false });
        } else {
            this.setState({ signupError: '', isPassValid: true, loading: false });
        }

        // Checking to make sure the username doesn't exist.
        // Will return true if username exists.
        if ( ! username ) {
            return this.setState({ signupError: 'Enter username.', isUsernameValid: false, isEmailValid: true, isPassValid: true, loading: false });
        }

        const checkUsernameReq = await Fire.shared.checkIfUsernameExists( this.state.username );

        if ( checkUsernameReq ) {
            return this.setState({ signupError: 'Username already exists', isUsernameValid: false, loading: false });
        } else {
            this.setState({ signupError: '', isUsernameValid: true });
        }

        if ( ! password || ! email || ! username || signupError ) {
            return;
        }

        let createUserReq = await Fire.shared.createUser({email, password, username });

        // If we have a signup error let em know.
        if ( typeof createUserReq !== 'undefined' && createUserReq.status === 'error' ) {
            if ( createUserReq.code === 'auth/email-already-in-use' ) {
                return this.setState({ signupError: 'Email already in use.', isEmailValid: false, loading: false, });
            }
            return this.setState({ signupError: createUserReq.message, loading: false });
        }

        return;

    }

    /**
     * Add Email to State and validate while typing
     */
    _handleEmailInput = email => {
        this.setState( { email, signupError: '', isEmailValid: true } );
    };

    /**
     * Validate Email Format
     */
    _emailValidator = async email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const check = re.test(String(email).toLowerCase());

        if ( ! check ) {
            return { isEmailValid: false };
        }
        return { isEmailValid: check };
    }

    /**
     * Add Password to State while typing
     */
    _handlePasswordInput = password => {
        this.setState( { password, signupError: '', isPassValid: true } );
    }

    /**
     * Validate Password Pattern
     */
    _passwordValidator = password => {
        const numbers = password.match(/\d+/g);
        const uppers  = password.match(/[A-Z]/);
        const lowers  = password.match(/[a-z]/);
        const special = password.match(/[!@#$%\^&*\+]/);
        const length  = password.match(/^.{8,}$/);

        if ( null === numbers ) {
            return {
                isPassValid: false,
                signupError: 'Password must contain at least 1 number.',
            };
        }

        if ( null === uppers ) {
            return {
                isPassValid: false,
                signupError: 'Password must contain at least 1 upppercase character.'
            };
        }

        if ( null === lowers ) {
            return {
                isPassValid: false,
                signupError: 'Password must contain at least 1 lowercase character.'
            };
        }

        if ( null === special ) {
            return {
                isPassValid: false,
                signupError: 'Password must contain at least 1 special character.'
            };
        }

        if ( null === length ) {
            return {
                isPassValid: false,
                signupError: 'Password must be 8 characters or longer.'
            }
        }

        return {
            isPassValid: true,
            signupError: ''
        };

    }

    /**
     * Score Password Strength
     */
    _scorePassword = password => {
        let score = 0;
        if (!password) {
            this.setState({passwordScore: score});
        }

        // award every unique letter until 5 repetitions
        let letters = {};
        for (let i=0; i<password.length; i++) {
            letters[password[i]] = (letters[password[i]] || 0) + 1;
            score += 5.0 / letters[password[i]];
        }
    
        // bonus points for mixing it up
        let variations = {
            digits: /\d/.test(password),
            lower: /[a-z]/.test(password),
            upper: /[A-Z]/.test(password),
            nonWords: /\W/.test(password)
        };
    
        let variationCount = 0;
        for (let check in variations) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;

        return this.setState({passwordScore: parseInt(score, 10)});
    }

    /**
     * Handle Username Input
     */
    _handleUsernameInput = username => {
        this.setState({ username, signupError: '', isUsernameValid: true });
    }

    _validUsername = async () => {
        if (this.state.username) {
            const checkUsername = await Fire.shared.checkIfUsernameExists( this.state.username );
            // No User with that username found.
            if ( checkUsername.status !== 'error' && ! checkUsername ) {
                return this.setState( { isUsernameValid: true, signupError: '' } );
            }
            this.setState( { isUsernameValid: false, signupError: 'Username already exists.' } );
        }
    }
}