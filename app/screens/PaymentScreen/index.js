import React, { Fragment, useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import QrCodeModal from './qrCodeModal';

const PaymentScreen = ({ navigation }) => {
  const [qrModal, seTqrModal] = useState(false);
  return (
    <Fragment>
      <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleSize}>Оплата</Text>

          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Pressable
              style={{ alignSelf: 'center', flexDirection: 'row' }}
              onPress={() => navigation.goBack()}>
              <Icon name={'keyboard-backspace'} size={20} />
              <Text style={styles.textSize}>Калькулятор</Text>
            </Pressable>
          </View>

          <View style={styles.profileHeaderContainer}>
            <Avatar.Image
              size={65}
              source={require('../../assets/gubin.png')}
            />
            <View style={styles.profileNameSurname}>
              <Text style={styles.userTextSize}>{'Aлександр Гравчев'}</Text>
              <Text style={styles.userSubText}>
                {'Москва'}, {'Россия'}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.sendCountryText}>Страна отправления</Text>
            <Text style={[styles.sendCountryText, { width: '40%' }]}>
              Страна назначения
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.userTextSize}>Россия,</Text>
              <Text style={styles.userTextSize}>Kемерово </Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={styles.userTextSize}>США,</Text>
              <Text style={styles.userTextSize}>Лос Анжлес</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textSize}>Стоимость перевозки</Text>
            <Text style={[{ width: '40%' }, styles.scanText]}>1250,50 ₽</Text>
          </View>

          <Text
            style={{
              marginTop: 10,
            }}>
            Способ оплаты
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              style={{
                backgroundColor: '#333333',
                width: '48%',
              }}
              mode="contained">
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  lineHeight: 24,
                }}>
                {'Wechat'}
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: '#f9f9f9',
                borderWidth: 2,
                borderColor: '#000',
                width: '48%',
              }}
              mode="contained">
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  color: '#000',
                }}>
                {'AliPlay'}
              </Text>
            </Button>
          </View>
          <Button
            style={{
              width: '100%',
              marginTop: 20,
              backgroundColor: '#333333',
            }}
            mode="contained"
            onPress={() => seTqrModal(true)}>
            <Text style={{ width: '100%', color: '#f9f9f9' }}>
              {'Оплатить'}
            </Text>
          </Button>
          <QrCodeModal visible={qrModal} hideModal={() => seTqrModal(false)} />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Fragment>
  );
};

export default PaymentScreen;
