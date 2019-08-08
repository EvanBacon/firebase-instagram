import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { shape, arrayOf, string } from 'prop-types';

const { width } = Dimensions.get('window');

const statWidth = width / 3;

const style = StyleSheet.create({
    statAreaStyle: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: 75, alignItems: 'center' },
    singleBoxStyle: { width: statWidth },
    statStyle: { fontSize: 20, textAlign: "center" },
    titleStyle: { color: 'grey', textAlign: "center" },
});

function AccountStats(props) {
    const { accountInfo: { followers = [], following = [], posts = [] } } = props;
    const { statAreaStyle, statBoxStyle, statStyle, titleStyle } = style;
    return (
        <View style={ statAreaStyle }>  
            <View style={ statBoxStyle }>
                <Text style={ statStyle }>
                    {`${followers.length}`}
                </Text>
                <Text style={ titleStyle }>
                    Followers
                </Text>
            </View>
            <View style={ statBoxStyle }>
                <Text style={ statStyle }>
                    {`${posts.length}`}
                </Text>
                <Text style={ titleStyle }>
                    Posts
                </Text>
            </View>
            <View style={ statBoxStyle }>
                <Text style={ statStyle }>
                    {`${following.length}`}
                </Text>
                <Text style={ titleStyle }>
                    Following
                </Text>
            </View>
        </View>
    );
}

AccountStats.propsTypes = {
    accountInfo: shape({
        followers: arrayOf(string).isRequired,
        following: arrayOf(string).isRequired,
        posts: arrayOf(string).isRequired,
    }).isRequired,
}

export default React.memo(AccountStats);
