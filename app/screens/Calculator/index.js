import React, { Fragment, useContext, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {
  Button,
  TextInput,
  Checkbox,
  HelperText,
  Portal,
  Dialog,
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import AuthContext from '../../context/auth/AuthContext';
import GoodsContext from '../../context/goods/GoodsContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';

const CalculatorScreen = props => {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const goodsContext = useContext(GoodsContext);
  const { user, isSigned, getCheckout, calculateArray, checkoutOrderMethod } =
    authContext;
  const { modalSaveGood, loading, good, postAGood, modalSaveGoodHide } =
    goodsContext;
  const [checked, setChecked] = useState(false);

  const elements = {
    // sender: '',
    sender_FIO: '',
    sender_Tel: '',
    sender_EMail: '',
    sender_DocID: '',
    sender_INN: '',
    sender_Addr: '',
    //  receiver: '',
    recip_FIO: '',
    recip_EMail: '',
    recip_Tel: '',
    recip_DocID: '',
    recip_INN: '',
    recip_Addr: '',
    LinkOnGood: '',
    DescrGood: '',
    Status: 'Status',
    Price: 0,
    city_From: '',
    city_To: '',
    volume: 0,
    weight: 0,
    trackid: 0,
  };
  const [state, seTstate] = useState({ ...elements });
  const [arr, seTarr] = useState([]);

  const fetchUser = async () => {
    seTarr([]);
    const userData = await utility.getItemObject('calculator');
    console.log('userData: ', userData);
    if (userData) {
      seTarr(userData);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchUser();
      if (user) {
        console.log('infffff', user);
        seTstate({
          ...state,
          Price: good.Price,
          city_From: good.city_From,
          city_To: good.city_To,
          volume: good.volume,
          weight: good.weight,
          trackid: Math.floor(Math.random() * 1000) + 100,
        });
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [user, good]),
  );

  const onButtonPressed = () => {
    //arr.push(state);
    postAGood(state, arr);
  };
  const hideDialog = () => modalSaveGoodHide(false);
  console.log('a2222: ', arr);
  return (
    <Fragment>
      {isSigned ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Spinner
              visible={loading}
              textContent={'Сохраняется...'}
              textStyle={{ color: '#3498db' }}
            />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: 28,
                }}>
                {I18n.t('TabNav.calculator')}
              </Text>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{I18n.t('departure_country')}</Text>
                <Text>{I18n.t('destination_country')}</Text>
              </View>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  Россия, Кемерово
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  США, Лос-Анджелес
                </Text>
              </View>

              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('sender')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              {/*   <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, sender: val })}
                value={state.sender}
              />

              <Text style={{ width: '90%', paddingTop: '2%' }}>
                + {I18n.t('choose_from_adres_book')}
              </Text>
           */}
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('nsl')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>

              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, sender_FIO: val })}
                value={state.sender_FIO}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('phone')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>

              <TextInput
                mode="outlined"
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    style={{ color: '#333333' }}
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val =>
                      seTstate({ ...state, sender_Tel: val })
                    }
                    value={state.sender_Tel}
                    placeholder="+ 7 (123) 123 12 34"
                  />
                )}
                style={{ width: '90%' }}
              />

              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('pasport')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>

              <TextInput
                mode="outlined"
                onChangeText={val => seTstate({ ...state, sender_DocID: val })}
                value={state.sender_DocID}
                placeholder="3220 231245"
                style={{ width: '90%' }}
              />

              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('inn')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                mode="outlined"
                onChangeText={val => seTstate({ ...state, sender_INN: val })}
                value={state.sender_INN}
                placeholder="322043253234231245"
                style={{ width: '90%' }}
              />

              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('email')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, sender_EMail: val })}
                value={state.sender_EMail}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('adress')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, sender_Addr: val })}
                value={state.sender_Addr}
              />
              <View
                style={{
                  width: '90%',
                  marginTop: 10,
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  style={{
                    backgroundColor: '#333333',
                    width: '48%',
                  }}
                  mode="contained">
                  <Text style={{ color: 'white', fontSize: 9 }}>
                    Сдать в отделении
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
                  <Text style={{ color: '#000', fontSize: 9 }}>
                    Забрать курьером
                  </Text>
                </Button>
              </View>

              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('reciver')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              {/*
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, receiver: val })}
                value={state.receiver}
              />
              <Text style={{ width: '90%', paddingTop: '2%' }}>
                + {I18n.t('choose_from_adres_book')}
              </Text>
              */}
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('nsl')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, recip_FIO: val })}
                value={state.recip_FIO}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('phone')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                mode="outlined"
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    style={{ color: '#333333' }}
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val => seTstate({ ...state, recip_Tel: val })}
                    value={state.recip_Tel}
                    placeholder="+ 7 (123) 123 12 34"
                  />
                )}
                style={{ width: '90%', color: 'white' }}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('pasport')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                mode="outlined"
                onChangeText={val => seTstate({ ...state, recip_DocID: val })}
                value={state.recip_DocID}
                placeholder="A0123824"
                style={{ width: '90%' }}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('inn')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                mode="outlined"
                onChangeText={val => seTstate({ ...state, recip_INN: val })}
                value={state.recip_INN}
                placeholder="2222222222"
                style={{ width: '90%' }}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('email')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, recip_EMail: val })}
                value={state.recip_EMail}
              />
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('adress')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, recip_Addr: val })}
                value={state.recip_Addr}
              />
              <View
                style={{
                  width: '90%',
                  marginTop: 10,
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderWidth: 2,
                    borderColor: '#000',
                    width: '49%',
                  }}
                  mode="contained">
                  <Text style={{ color: '#000', fontSize: 10 }}>
                    Получить на ПВЗ
                  </Text>
                </Button>
                <Button
                  style={{
                    width: '49%',
                    backgroundColor: '#333333',
                  }}
                  mode="contained">
                  <Text style={{ color: 'white', fontSize: 10 }}>
                    Доставка курьером
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  width: '90%',
                  paddingTop: '2%',
                  flexDirection: 'row',
                }}>
                <Text style={{ flex: 1 }}>{I18n.t('product_description')}</Text>
                <HelperText
                  style={{ alignItems: 'flex-end' }}
                  type="error"
                  visible={false}>
                  {I18n.t('field_not_be_empty')}
                </HelperText>
              </View>
              <TextInput
                placeholder={
                  'Выбрать из адресной книги рыбный текстВыбрать из адресной книги рыбный текстВыбрать из адресной книги рыбный текст'
                }
                onChangeText={val => seTstate({ ...state, DescrGood: val })}
                value={state.DescrGood}
                numberOfLines={3}
                mode="outlined"
                multiline={false}
                style={{ width: '90%' }}
              />
              <Text style={{ width: '90%', paddingTop: '2%' }}>
                {I18n.t('link_web')}
              </Text>
              <TextInput
                label={'lamoda.ru/krossy'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, LinkOnGood: val })}
                value={state.LinkOnGood}
              />
              <View
                style={{
                  width: '90%',
                  marginTop: 10,
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>{I18n.t('transportation_cost')}</Text>
                <Text>{good?.Price} $.</Text>
              </View>
              <Button
                style={{
                  width: '90%',
                  marginTop: 20,
                  backgroundColor: '#333333',
                }}
                mode="contained"
                onPress={() => onButtonPressed()}>
                <Text style={{ width: '90%', color: '#f9f9f9' }}>
                  {I18n.t('checkout')}
                </Text>
              </Button>
              <Text
                style={{ width: '90%', paddingTop: '2%', color: '#979797' }}>
                {I18n.t('insure_your_package')}
              </Text>

              <View style={{ flexDirection: 'row', width: '95%' }}>
                <Checkbox.Android
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={'#397AF9'}
                />
                <Text style={{ flex: 1, margin: 8, color: '#979797' }}>
                  {I18n.t('cargo_insurance')}
                </Text>
              </View>

              <Text
                style={{ width: '90%', color: '#979797', marginBottom: 10 }}>
                {I18n.t('info_text')}
              </Text>
            </View>
            <Portal>
              <Dialog visible={modalSaveGood} onDismiss={hideDialog}>
                <Dialog.Title>Ваш заказ был принят</Dialog.Title>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Хорошо</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Login navigation={navigation} />
      )}
    </Fragment>
  );
};

export default CalculatorScreen;
