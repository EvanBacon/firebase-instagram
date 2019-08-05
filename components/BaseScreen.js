import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { string, oneOfType, arrayOf, node } from 'prop-types';

const style = StyleSheet.create({
    pageStyleCenter: { flexGrow: 1, justifyContent: 'center' },
    pageStyleDefault: { flexGrow: 1, marginTop: 100 },
});

function BaseScreen( props ) {
    const { children, layout } = props;
    const { pageStyleCenter, pageStyleDefault } = style;

    const whichLayout = layout === 'default'
        ? pageStyleDefault
        : pageStyleCenter;

    return (
        <ScrollView
                contentContainerStyle={ whichLayout }
                keyboardShouldPersistTaps='handled'
        >
            { children }
        </ScrollView>
    );
}

BaseScreen.propTypes = {
    children: oneOfType( [ arrayOf( node ), node ] ),
    layout: string,
}

BaseScreen.defaultProps = {
    layout: 'default'
}

export default React.memo( BaseScreen );
