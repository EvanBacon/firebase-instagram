import React from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    loadingStyle: { justifyContent: "center", alignContent: "center", height: '100%', width: '100%' }
});

function Loading() {
    const { loadingStyle } = style;
    return (
        <View style={ loadingStyle }>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
}

export default React.memo(Loading);