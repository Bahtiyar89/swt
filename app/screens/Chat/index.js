import React, { useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';

import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import I18n from '../../../i18';

const ChatScreen = props => {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;

  return (
    <>
      {isSigned ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{I18n.t('inprogress')} !</Text>
        </View>
      ) : (
        <Login navigation={navigation} />
      )}
    </>
  );
};

export default ChatScreen;
