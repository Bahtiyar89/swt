import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import NavigationService from 'app/navigation/NavigationService';

import styles from './styles';
const RestoreAccount: React.FC = () => {
  const goBack = () => NavigationService.goBack();
  return (
    <View style={styles.container}>
      <Button
        icon="upload"
        style={{
          width: '90%',
          marginTop: 20,
          marginBottom: 30,
          backgroundColor: '#333333',
        }}
        mode="contained">
        <Text style={{ color: 'white' }}>загрузить файл</Text>
      </Button>
      <Button
        style={{
          width: '90%',
          marginTop: 20,
          marginBottom: 30,
          backgroundColor: '#333333',
        }}
        mode="contained">
        <Text style={{ color: 'white' }}>Загрузить</Text>
      </Button>
    </View>
  );
};

export default RestoreAccount;
