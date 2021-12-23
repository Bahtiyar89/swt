import React, { Fragment, useContext, useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, TextInput, Checkbox, HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useFocusEffect } from '@react-navigation/native';

import AuthContext from '../../context/auth/AuthContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';

const CalculatorScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  const [checked, setChecked] = useState(false);
  const elements = {
    sender: '',
    fio: '',
    phone: '',
    passportId: '',
    INN: '',
    adress1: '',
    adress2: '',
    receiver: '',
    receiverFIO: '',
    receiverPhone: '',
    receiverPassportId: '',
    receiverINN: '',
    receiverAdress1: '',
    receiverAdress2: '',
    productDescription: '',
    link: '',
  };
  const [state, seTstate] = useState({ ...elements });
  const [arr, seTarr] = useState([]);

  const fetchUser = async () => {
    const userData = await utility.getItemObject('calculator');
    seTarr(userData);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchUser();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  console.log('arr: ', arr);
  const onButtonPressed = () => {
    arr.push(state);
    utility.setItemObject('calculator', arr);
    console.log('pressed', arr);
  };

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
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, sender: val })}
                value={state.sender}
              />

              <Text style={{ width: '90%', paddingTop: '2%' }}>
                + {I18n.t('choose_from_adres_book')}
              </Text>
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
                onChangeText={val => seTstate({ ...state, fio: val })}
                value={state.fio}
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
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val => seTstate({ ...state, phone: val })}
                    value={state.phone}
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
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '9999 999999',
                    }}
                    onChangeText={val =>
                      seTstate({ ...state, passportId: val })
                    }
                    value={state.passportId}
                    placeholder="3220 231245"
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
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '999999999999999999',
                    }}
                    onChangeText={val => seTstate({ ...state, INN: val })}
                    value={state.INN}
                    placeholder="322043253234231245"
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
                onChangeText={val => seTstate({ ...state, adress1: val })}
                value={state.adress1}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstate({ ...state, adress2: val })}
                value={state.adress2}
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
                onChangeText={val => seTstate({ ...state, receiverFIO: val })}
                value={state.receiverFIO}
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
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val =>
                      seTstate({ ...state, receiverPhone: val })
                    }
                    value={state.receiverPhone}
                    onChangeText={val => console.log('val')}
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
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '9999 999999',
                    }}
                    onChangeText={val =>
                      seTstate({ ...state, receiverPassportId: val })
                    }
                    value={state.receiverPassportId}
                    placeholder="3220 231245"
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
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    options={{
                      mask: '999999999999999999',
                    }}
                    onChangeText={val =>
                      seTstate({ ...state, receiverINN: val })
                    }
                    value={state.receiverINN}
                    onChangeText={val => console.log('val')}
                    placeholder="322043253234231245"
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
                onChangeText={val =>
                  seTstate({ ...state, receiverAdress1: val })
                }
                value={state.receiverAdress1}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTstate({ ...state, receiverAdress2: val })
                }
                value={state.receiverAdress2}
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
                onChangeText={val =>
                  seTstate({ ...state, productDescription: val })
                }
                value={state.productDescription}
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
                onChangeText={val => seTstate({ ...state, link: val })}
                value={state.link}
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
                <Text>1250,50 ₽</Text>
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
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default CalculatorScreen;
