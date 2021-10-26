import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';

const CalculatorScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  return (
    <>
      {isSigned ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Calculator !</Text>
        </View>
      ) : (
        <Login />
      )}
    </>
  );
};

export default CalculatorScreen;
