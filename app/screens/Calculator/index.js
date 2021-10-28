import React, { Fragment, useContext, useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Button, Surface, TextInput, Checkbox } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import I18n from '../../../i18';

const CalculatorScreen = () => {
  const authContext = useContext(AuthContext);
  const { isSigned } = authContext;
  const [checked, setChecked] = useState(false);
  const { width } = Dimensions.get('window');
  console.log('width2:', typeof width);

  return (
    <Fragment>
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
              <Text>Страна отправления</Text>
              <Text>Страна назначения</Text>
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
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('sender')}
            </Text>
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              + {I18n.t('choose_from_adres_book')}
            </Text>
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('nsl')}
            </Text>
            <TextInput
              label={'Иванов Иван Иванович'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('phone')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '+9 (999) 999 99 99',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="+ 7 (123) 123 12 34"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('pasport')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '9999 999999',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="3220 231245"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('inn')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '999999999999999999',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="322043253234231245"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('adress')}
            </Text>
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
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
                }}
                mode="contained">
                <Text style={{ color: 'white', fontSize: 12 }}>
                  Сдать в отделении
                </Text>
              </Button>
              <Button
                style={{
                  backgroundColor: '#f9f9f9',
                  borderWidth: 2,
                  borderColor: '#000',
                }}
                mode="contained">
                <Text style={{ color: '#000', fontSize: 12 }}>
                  Забрать курьером
                </Text>
              </Button>
            </View>
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('reciver')}
            </Text>
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              + {I18n.t('choose_from_adres_book')}
            </Text>
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('nsl')}
            </Text>
            <TextInput
              label={'Иванов Иван Иванович'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('phone')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '+9 (999) 999 99 99',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="+ 7 (123) 123 12 34"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('pasport')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '9999 999999',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="3220 231245"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('inn')}
            </Text>
            <TextInput
              mode="outlined"
              render={props => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '999999999999999999',
                  }}
                  onChangeText={val => console.log('val')}
                  placeholder="322043253234231245"
                />
              )}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {I18n.t('adress')}
            </Text>
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <TextInput
              label={'Москва, ул. Леонова, д. 35'}
              mode="outlined"
              style={{ width: '90%' }}
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
                  width: '45%',
                }}
                mode="contained">
                <Text style={{ color: '#000', fontSize: 10 }}>
                  Получить на ПВЗ
                </Text>
              </Button>
              <Button
                style={{
                  width: '45%',
                  backgroundColor: '#333333',
                }}
                mode="contained">
                <Text style={{ color: 'white', fontSize: 10 }}>
                  Доставка курьером
                </Text>
              </Button>
            </View>
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {'Описание товара'}
            </Text>
            <TextInput
              placeholder={
                'Выбрать из адресной книги рыбный текстВыбрать из адресной книги рыбный текстВыбрать из адресной книги рыбный текст'
              }
              numberOfLines={3}
              mode="outlined"
              multiline={true}
              style={{ width: '90%' }}
            />
            <Text style={{ width: '90%', paddingTop: '2%' }}>
              {'Ссылка на интернет магазин'}
            </Text>
            <TextInput
              label={'lamoda.ru/krossy'}
              mode="outlined"
              style={{ width: '90%' }}
            />
            <View
              style={{
                width: '90%',
                marginTop: 10,
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Стоимость перевозки</Text>
              <Text>1250,50 ₽</Text>
            </View>
            <Button
              style={{
                width: '90%',
                marginTop: 20,
                backgroundColor: '#333333',
              }}
              mode="contained"
              onPress={() => console.log('pressed')}>
              <Text style={{ width: '90%', color: '#f9f9f9' }}>
                Оформить заказ
              </Text>
            </Button>
            <Text style={{ width: '90%', paddingTop: '2%', color: '#979797' }}>
              {'Застрахуйте свою посылку'}
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
                {'Страхование груза'}
              </Text>
            </View>

            <Text style={{ width: '90%', color: '#979797', marginBottom: 10 }}>
              {
                'При нажатии на кнопку Оформить заказ Вы даете соглашение на публичную оферту'
              }
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default CalculatorScreen;
