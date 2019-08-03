import firebase from 'firebase';
import Fire from '../Fire';
import React from 'react';
import { Modal, View, Button, Text, AsyncStorage, TextInput, Alert } from 'react-native';

/**
 * Home Screen
 * 
 * @desc First screen you see when you load app unauthenticated.
 */
export default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            authListener: () => {
                firebase.auth().onAuthStateChanged(async user => {
                    if (user) {
                        // Do logged in stuff
                        await AsyncStorage.setItem('userToken', Fire.shared.uid);
                        this.props.navigation.navigate('App');
                    }
                });
            },
            modalVisible: false,
            resetEmail: '',
        }
    }

    componentDidMount() {
        const { authListener } = this.state;
        authListener();
    }

    componentWillUnmount() {
        this.setState({ authListener: null });
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {

        const pageStyle = { flexGrow: 1, justifyContent: 'center' }

        const logoStyle = { textAlign: 'center', fontSize: 50, marginBottom: 30 }

        const loginStyle = { backgroundColor: '#185CC6', padding: 10, width: '90%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 }

        const inputStyle = { padding: 10, width: '90%', height: 50, marginBottom: 10, marginRight: 'auto', marginLeft: 'auto', borderRadius: 6, borderColor: 'gray', borderWidth: 1 }

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
                <View style={{width: '100%'}}>
                    <Button
                        title='Forgot Password'
                        onPress={() => this.setModalVisible(!this.state.modalVisible)}
                    />
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        style={{width: '100%'}}
                        onRequestClose={() => this.setState({modalVisible: false})}>
                        <View
						 	style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center'}}
						>
							<Text style={{textAlign: 'center', marginBottom: 10, fontSize: 18}}>Reset Password</Text>
							<TextInput
								placeholder="Email Address"
								onChangeText={resetEmail => {
									this.setState({resetEmail});
								}}
                                value={this.state.resetEmail}
                                style={inputStyle}
                                autoCapitalize='none'
                                returnKeyType='done'
							/>
							<Button
                                title="Reset Password"
                                onPress={ async () => {
                                    const res = await Fire.shared.resetPasswordHandler( this.state.resetEmail );

                                    if ( res ) {
                                        Alert.alert('Password Reset Fam.');
                                    }
                                }}
							/>
							<Button
								title="Cancel"
								onPress={() => this.setState({modalVisible: false})}
							/>
						</View>
                    </Modal>
                </View>
            </View>
        )
    }
}