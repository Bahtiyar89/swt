import React, { useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';

const MyShipmentsScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  return (
    <>
      {isSigned ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>MyShipmentsScreen !</Text>
        </View>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MyShipmentsScreen;
