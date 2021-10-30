import React, { Fragment, useEffect, useContext } from 'react';
import { ScrollView, SafeAreaView, View, Text, Image } from 'react-native';
import { Button, IconButton, Card, Title, Paragraph } from 'react-native-paper';
import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import I18n from '../../../i18';

const MyShipmentsScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  return (
    <Fragment>
      {isSigned ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
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
              <Card
                style={{
                  width: '90%',
                  margin: 5,
                  borderColor: '#000',
                  borderWidth: 2,
                }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
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

              <Card
                style={{
                  width: '90%',
                  margin: 5,
                  borderColor: '#000',
                  borderWidth: 2,
                }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton
                      icon="checkbox-blank-circle"
                      size={10}
                      color="orange"
                      style={{ margin: 0 }}
                    />
                    <Text style={{ paddingLeft: 3 }}>Не вручен</Text>
                  </View>
                  <Title style={{ fontSize: 16 }}>№ 4325348723</Title>
                  <Paragraph>Санкт-Петербург — Москва</Paragraph>
                  <Paragraph>Полная дата доставки: 27.11.2021</Paragraph>
                </Card.Content>
              </Card>
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
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default MyShipmentsScreen;
