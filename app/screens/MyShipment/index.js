import React, { Fragment, useState, useEffect, useContext } from 'react';
import { ScrollView, SafeAreaView, View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, IconButton, Card, Title, Paragraph } from 'react-native-paper';
import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import I18n from '../../../i18';
import utility from '../../utils/Utility';

const MyShipmentsScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned, getCheckout, calculateArray } = authContext;
  const [state, seTstate] = useState([]);

  const fetchUser = async () => {
    await utility.getItemObject('calculator').then(t => {
      if (t) {
        seTstate(t);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // fetchUser();
      fetchUser();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  console.log('shipment: ', state);
  console.log('calculateArray', calculateArray);
  return (
    <Fragment>
      {isSigned ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
            }}>
            {I18n.t('my_sendings')}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            {I18n.t('registered_sendings')}
          </Text>
          <FlatList
            style={{
              flex: 1,
            }}
            data={state}
            keyExtractor={state => (Math.random(100) * 10).toString()}
            renderItem={({ state }) => (
              <Card
                style={{
                  flex: 1,
                  width: '90%',
                  margin: 5,
                  borderColor: '#000',
                  borderWidth: 2,
                }}>
                <Card.Content>
                  <View>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="green"
                      style={{ margin: 0 }}
                    />
                    <Text style={{ paddingLeft: 3 }}>Не доставлен</Text>
                  </View>
                  <Title style={{ fontSize: 16 }}>№ 4325348723</Title>
                  <Paragraph>Санкт-Петербург — Москва</Paragraph>
                  <Paragraph>Полная дата доставки: 27.11.2021</Paragraph>
                </Card.Content>
              </Card>
            )}
          />

          <Button
            uppercase={false}
            color="#333333"
            onPress={() => console.log('Pressed')}>
            + {I18n.t('look_all')}
          </Button>
          <Text>{I18n.t('no_registered_sendings')}</Text>
          <Button
            style={{
              width: '90%',
              marginTop: 20,
              backgroundColor: '#333333',
            }}
            mode="contained"
            onPress={() => console.log('lll')}>
            <Text style={{ color: 'white' }}>
              {I18n.t('register_sendings')}
            </Text>
          </Button>
        </View>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default MyShipmentsScreen;
