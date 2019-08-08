import React from 'react';
import { View, Text, ProgressViewIOS, StyleSheet } from 'react-native';
import { string, number } from 'prop-types';

const style = StyleSheet.create({
    passStrengthStyle: { padding: 10, width: '94%', marginRight: 'auto', marginLeft: 'auto', borderRadius: 6 },
    passStrengthTitleStyle: { marginTop: 70, fontWeight: '500' },
    progressBarStyle: { marginTop: 20, transform: [{ scaleX: 1.0 }, { scaleY: 11.0 }] },
});

function PassStrengthBar( props ) {
    const {
        passwordScore,
        progressViewStyle,
        progressTintColor,
        trackTintColor,
    } = props;

    const {
        passStrengthStyle,
        passStrengthTitleStyle,
        progressBarStyle
    } = style;

    return (
        <View style={ passStrengthStyle }>
            <Text style={ passStrengthTitleStyle }>Password Strength</Text>
            <ProgressViewIOS
                progress={ passwordScore / 100 }
                progressViewStyle={ progressViewStyle }
                progressTintColor={ progressTintColor }
                trackTintColor={ trackTintColor }
                style={ progressBarStyle }
            />
        </View>
    );
}

PassStrengthBar.propTypes = {
    passwordScore: number.isRequired,
    progressViewStyle: string,
    progressTintColor: string,
    trackTintColor: string,
}

PassStrengthBar.defaultProps = {
    progressViewStyle: 'default',
    progressTintColor: '#185CC6',
    trackTintColor: '#f6f6f6',
}

export default React.memo( PassStrengthBar );