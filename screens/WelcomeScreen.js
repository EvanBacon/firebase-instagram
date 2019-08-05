import firebase from 'firebase';
import Fire from '../Fire';
import React from 'react';
import { View, Button, Text, AsyncStorage, StyleSheet } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import PasswordResetModal from '../components/PasswordResetModal';

const style = StyleSheet.create({
    logoStyle: { textAlign: 'center', fontSize: 50, marginBottom: 30, marginTop: 'auto' },
    loginStyle: { backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 },
    accountStyle: { marginTop: 30, marginBottom: 'auto' },
});

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            authListener: () => {
                const { navigate } = this.props.navigation;

                firebase.auth().onAuthStateChanged(async user => {
                    if ( user ) {
                        // Do logged in stuff
                        await AsyncStorage.setItem('userToken', Fire.uid);
                        return navigate('App');
                    }
                });
            },
            resetEmail: '',
            setResetEmail: resetEmail => this.setState({ resetEmail }),
            toggleModal: () =>  this.setState( prevState => ({ modalVisible: ! prevState.modalVisible } )),
            modalVisible: false,
        }
    }

    componentDidMount() {
        const { authListener } = this.state;
        return authListener();
    }

    componentWillUnmount() {
        return this.setState({ authListener: null });
    }

    render() {

        const {
            navigation: { navigate },
        } = this.props;

        const {
            modalVisible,
            resetEmail,
            toggleModal,
            setResetEmail,
        } = this.state;

        const {
            logoStyle,
            loginStyle,
            accountStyle,
        } = style;

        return (
                <BaseScreen layout='center'>
                    <Text style={ logoStyle }>
                        Finsta 🔥
                    </Text>
                    <View style={ loginStyle }>
                        <Button
                            title='Login'
                            onPress={() => navigate('SignIn')}
                            color='#f5f5f5'
                        />
                    </View>
                    <View style={ accountStyle }>
                        <Button
                            title='Create Account'
                            onPress={() => navigate('SignUp')}
                        />
                    </View>
                    <PasswordResetModal
                        modalVisible={ modalVisible }
                        toggle={ toggleModal }
                        reset={ setResetEmail }
                        resetEmail={ resetEmail }
                    />
                </BaseScreen>
        )
    }
}
