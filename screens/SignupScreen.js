import Fire from '../Fire';

import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';

export default class SignupScreen extends React.Component {
    state = {
        isPassValid: false,
        passwordScore: 0,
        password: '',
        isEmailValid: false,
        email: '',
        signupError: ''
    };

    render() {
        const {
            email,
            password,
            signupError
        } = this.state;

        const inputStyle = {height: 40, borderColor: 'gray', borderWidth: 1};

        return (
            <View>
                <Text>Sign Up</Text>
                <TextInput
                    placeholder='Email'
                    autoCompleteType='email'
                    textContentType='username'
                    keyboardType='email-address'
                    onChangeText={this._handleEmailInput}
                    value={email}
                    style={inputStyle}
                    autoCapitalize='none'
                />
                <TextInput
                    placeholder='Password'
                    textContentType='password'
                    secureTextEntry={true}
                    onChangeText={this._handlePasswordInput}
                    value={password}
                    style={inputStyle}
                    autoCapitalize='none'
                />
                <Button
                    title='Add User'
                    onPress={this._handleAddUser}
                />
                { signupError ? <Text>{ signupError }</Text> : null }
            </View>
        );
    }

    /**
     * Add Users To Database
     */
    _handleAddUser = async () => {
        const {
            email,
            password,
            isEmailValid,
            isPassValid,
        } = this.state;

        if ( ! password || ! email || ! isEmailValid || ! isPassValid ) {
            return;
        }

        return Fire.shared.createUser({email, password });

    }

    /**
     * Add Email to State and validate while typing
     */
    _handleEmailInput = email => {
        this.setState( { email, signupError: '' }, () => this._emailValidator( this.state.email ) );
    };

    /**
     * Validate Email Format
     */
    _emailValidator = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const check = re.test(String(email).toLowerCase());
        this.setState({isEmailValid: check});
    }

    /**
     * Add Password to State while typing
     */
    _handlePasswordInput = password => {
        this.setState( { password, signupError: '' }, () => this._passwordValidator( this.state.password ) );
    }

    /**
     * Validate Password Pattern
     */
    _passwordValidator = password => {
        const numbers = password.match(/\d+/g);
        const uppers  = password.match(/[A-Z]/);
        const lowers  = password.match(/[a-z]/);
        const special = password.match(/[!@#$%\^&*\+]/);

        if ( null === numbers ) {
            return this.setState({isPassValid: false, signupError: 'Password must contain at least 1 number.'});
        }

        if ( null === uppers ) {
            return this.setState({isPassValid: false, signupError: 'Password must contain at least 1 upppercase character.'});
        }

        if ( null === lowers ) {
            return this.setState({isPassValid: false, signupError: 'Password must contain at least 1 lowercase character.'});
        }

        if ( null === special ) {
            return this.setState({isPassValid: false, signupError: 'Password must contain at least 1 special character.'});
        }

        if (numbers !== null && uppers !== null && lowers !== null && special !== null) {
            return this.setState({isPassValid: true, signupError: ''});
        }

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
}