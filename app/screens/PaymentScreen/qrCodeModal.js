import React, { useState } from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { Button, Modal, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function QrCodeModal({ navigation, visible, hideModal }) {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 20,
  };
  const [replenish, seTreplenish] = useState('');
  const [send, seTsend] = useState('');
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Text
          style={[
            styles.scanText,
            { fontSize: 14, lineHeight: 24, marginTop: 10, marginBottom: 10 },
          ]}>
          Отсканируйте для оплаты
        </Text>
        <QRCode
          value="some string value"
          color={'#2C8DDB'}
          backgroundColor={'white'}
          size={100}
          logoMargin={2}
          logoSize={20}
          logoBorderRadius={10}
          logoBackgroundColor={'transparent'}
        />
        <Button
          style={{
            width: '100%',
            marginTop: 20,
            backgroundColor: '#333333',
          }}
          mode="contained"
          onPress={() => hideModal(false)}>
          <Text style={{ width: '100%', color: '#f9f9f9' }}>
            {'Продолжить'}
          </Text>
        </Button>
      </Modal>
    </Portal>
  );
}
