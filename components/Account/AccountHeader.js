import React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    headerStyle: { justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', height: 150 },
    profilePicStyle: { width: 70, height: 70, borderRadius: 70/2 },
    usernameStyle: { fontSize: 18 },
    headerRightStyle: { backgroundColor: 'blue', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' },
    headerLeftStyle: { backgroundColor: 'red', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' },
});

function AccountHeader(props) {
    const { accountInfo: { profilePictureUrl, username } } = props;
    const { headerStyle, headerRightStyle, headerLeftStyle, profilePicStyle, usernameStyle } = style;
    const uri = profilePictureUrl ? profilePictureUrl : 'https://scontent-lga3-1.cdninstagram.com/vp/d5c47042a03d0d01f7da53c8e023a1eb/5DCD0694/t51.2885-19/s320x320/66113339_606527399754110_6647810716449374208_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com';
    return (
        <View style={headerStyle} >
            <View style={ headerLeftStyle }>
                <Image
                    style={profilePicStyle}
                    source={{ uri }}
                />
            </View>
            <View style={headerRightStyle}>
                <Text style={usernameStyle}>
                    { username }
                </Text>
                <View>
                    <Button
                        title='Edit Profile'
                        onPress={() => console.log('Coming soon!')}
                    />
                </View>
            </View>
        </View>
    );
}

export default React.memo(AccountHeader);
