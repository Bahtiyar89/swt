import React, { Fragment, useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import utility from '../../utils/Utility';
import styles from './styles';

const MyShipmentsScreen = props => {
  const { t } = useTranslation();
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  const [state, seTstate] = useState([]);

  const fetchUser = async () => {
    await utility.getItemObject('calculator').then(t => {
      console.log('tttttt: ', t);
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
  console.log('shipment:2 ', Object.values(state));
  let fullDate = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);

  return (
    <Fragment>
      {isSigned ? (
        <View style={styles.container}>
          <Text style={styles.mysendings}>{t('t:my_sendings')}</Text>
          <Text style={styles.registered}>{t('t:registered_sendings')}</Text>
          <FlatList
            style={{ flex: 1 }}
            data={state}
            keyExtractor={state => (Math.random(100) * 10).toString()}
            renderItem={({ item }) => {
              return (
                <Card style={styles.itemwrapper}>
                  <Card.Content>
                    <Title style={{ fontSize: 16 }}>
                      № {item.transactionId}
                    </Title>
                    <Paragraph>
                      {item.city_From} — {item.city_To}
                    </Paragraph>
                    <Paragraph>
                      Ориентировочная дата доставки:
                      {fullDate.getDate() +
                        '/' +
                        (fullDate.getMonth() + 1) +
                        '/' +
                        fullDate.getFullYear()}
                    </Paragraph>
                  </Card.Content>
                </Card>
              );
            }}
          />

          <Button
            uppercase={false}
            color="#333333"
            onPress={() => console.log('Pressed')}>
            + {t('t:look_all')}
          </Button>
          <Text>{t('t:no_registered_sendings')}</Text>
          <Button
            style={styles.register}
            mode="contained"
            onPress={() => console.log('lll')}>
            <Text style={{ color: 'white' }}>{t('t:register_sendings')}</Text>
          </Button>
        </View>
      ) : (
        <Login navigation={navigation} />
      )}
    </Fragment>
  );
};

export default MyShipmentsScreen;
