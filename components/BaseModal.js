import React from 'react';
import {
  Modal, View, Button, Text, StyleSheet, ViewPropTypes,
} from 'react-native';
import {
  string, bool, func, arrayOf, node,
} from 'prop-types';

const style = StyleSheet.create({
  containerStyle: {
    position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center',
  },
  titleStyle: { textAlign: 'center', marginBottom: 10, fontSize: 18 },
  modalStyle: { width: '100%' },
});

function BaseModal(props) {
  const {
    title,
    closeBtnText,
    openBtnText,
    openBtnStyle,
    modalVisible,
    children,
    transparent,
    animationType,
    toggle,
  } = props;

  const {
    modalStyle,
    containerStyle,
    titleStyle,
  } = style;

  const maybeShowTitle = title
    ? <Text style={titleStyle}>{ title }</Text>
    : null;

  return (
    <>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={modalVisible}
        style={modalStyle}
        onRequestClose={() => toggle()}
      >
        <View
          style={containerStyle}
        >
          { maybeShowTitle }
          { children }
          <Button
            title={closeBtnText || 'Close'}
            onPress={() => toggle()}
          />
        </View>
      </Modal>
      <View style={openBtnStyle}>
        <Button
          title={openBtnText}
          onPress={() => toggle()}
        />
      </View>
    </>
  );
}

BaseModal.propTypes = {
  modalVisible: bool.isRequired,
  toggle: func.isRequired,
  children: arrayOf(node),
  openBtnText: string,
  openBtnStyle: ViewPropTypes.style,
  closeBtnText: string,
  title: string,
  transparent: bool,
  animationType: string,
};

BaseModal.defaultProps = {
  children: null,
  openBtnText: 'Open',
  openBtnStyle: {},
  closeBtnText: 'Close',
  title: '',
  transparent: false,
  animationType: 'slide',
};

export default React.memo(BaseModal);
