import React, { useEffect, Fragment, useContext, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {
  Button,
  TextInput,
  Checkbox,
  HelperText,
  Portal,
  Dialog,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaskedTextInput } from 'react-native-mask-text';

import AuthContext from '../../context/auth/AuthContext';
import GoodsContext from '../../context/goods/GoodsContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';
import Validation from '../../components/validation';
import CustomAlert from '../../components/customAlert';

const CalculatorScreen = props => {
  const { navigation } = props;
  const elements = {
    sender_FIO: '',
    sender_EMail: '',
    sender_Tel: '',
    sender_DocID: '',
    sender_INN: '',
    sender_Addr: '',
    recip_FIO: '',
    recip_EMail: '',
    recip_Tel: '',
    recip_DocID: '',
    recip_INN: '',
    recip_Addr: '',
    LinkOnGood: '',
    DescrGood: '',
    city_From: '',
    city_To: '',
    weight: '',
    volume: '',
    Price: '',
  };

  const [stMain, seTstMain] = useState({ ...elements });
  const calculated = props?.route?.params?.state
    ? props?.route?.params?.state
    : [
        {
          name: 'city_From',
          valString: '',
        },
        {
          name: 'city_To',
          valString: '',
        },
        {
          name: 'weight',
          valString: '',
        },
        {
          name: 'volume',
          valString: '',
        },
        {
          name: 'Price',
          valString: '',
        },
      ];
  const authContext = useContext(AuthContext);
  const goodsContext = useContext(GoodsContext);
  const { user, isSigned, file } = authContext;
  const { modalSaveGood, loading, postAGood, modalSaveGoodHide } = goodsContext;
  const [checked, setChecked] = useState(false);

  const [stateColumns, seTstateColumns] = useState();

  const validationElements = {
    sender_FIO: false,
    sender_Tel: false,
    sender_DocID: false,
    sender_INN: false,
    sender_EMail: false,
    sender_Addr: false,
    recip_FIO: false,
    recip_Tel: false,
    recip_DocID: false,
    recip_INN: false,
    recip_EMail: false,
    recip_Addr: false,
    DescrGood: false,
    LinkOnGood: false,
  };
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [arr, seTarr] = useState([]);
  const [walletKeys, seTwalletKeys] = useState({
    sk: '',
    pk: '',
  });

  const [focusSender, seTfocusSender] = useState(false);
  const [focusReceiver, seTfocusReceiver] = useState(false);
  const [cantSaveAlert, seTcantSaveAlert] = useState(false);

  const fetchUser = async () => {
    seTarr([]);
    const userData = await utility.getItemObject('calculator');

    if (userData) {
      seTarr(userData);
    }
  };

  async function encrypData() {
    await utility.getItemObject('wkeys').then(keys => {
      if (keys) {
        seTwalletKeys({ ...walletKeys, sk: keys?.sk, pk: keys?.pk });
      } else {
        seTwalletKeys({ ...walletKeys, sk: file?.sk, pk: file?.pk });
      }
    });
  }

  useEffect(() => {
    encrypData();
  }, [file]);

  useFocusEffect(
    React.useCallback(
      () => {
        // Do something when the screen is focused
        fetchUser();
        /*
      if (user) {
        seTstate({
          ...state,
          Price: good.Price,
          city_From: good.city_From,
          city_To: good.city_To,
          volume: good.volume,
          weight: good.weight,
        });
      }*/
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      },
      [
        /*user, good*/
      ],
    ),
  );

  const validation = () => {
    let err = false;
    if (stMain.sender_FIO.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_FIO: false });
      }, 10000);
      return err;
    }
    if (stMain.sender_Tel.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_Tel: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_Tel: false });
      }, 1000);
      return err;
    }
    if (stMain.sender_DocID.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_DocID: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_DocID: false });
      }, 1000);
      return err;
    }
    if (stMain.sender_INN.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_INN: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_INN: false });
      }, 1000);
      return err;
    }
    if (stMain.sender_EMail.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_EMail: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_EMail: false });
      }, 1000);
      return err;
    }
    if (stMain.sender_Addr < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_Addr: false });
      }, 3000);
      return err;
    }
    if (stMain.recip_FIO.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_FIO: false });
      }, 1000);
      return err;
    }
    if (stMain.recip_Tel.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_Tel: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_Tel: false });
      }, 1000);
      return err;
    }
    if (stMain.recip_DocID.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_DocID: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_DocID: false });
      }, 1000);
      return err;
    }

    if (stMain.recip_INN.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_INN: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_INN: false });
      }, 1000);
      return err;
    }
    if (stMain.recip_EMail.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_EMail: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_EMail: false });
      }, 1000);
      return err;
    }

    if (stMain.recip_Addr.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_Addr: false });
      }, 1000);
      return err;
    }
    if (stMain.DescrGood.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, DescrGood: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, DescrGood: false });
      }, 1000);
      return err;
    }
    if (stMain.LinkOnGood.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, LinkOnGood: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, LinkOnGood: false });
      }, 1000);
      return err;
    }
    return err;
  };
  const onButtonPressed = () => {
    if (stMain.city_From.length < 3) {
      seTcantSaveAlert(true);
    } else if (stMain.city_To.length < 3) {
      seTcantSaveAlert(true);
    } else if (stMain.weight.length < 1) {
      seTcantSaveAlert(true);
    } else if (stMain.volume.length < 1) {
      seTcantSaveAlert(true);
    } else {
      const err = validation();
      if (err) {
      } else {
        const columns = [
          {
            name: 'city_From',
            valString: stMain.city_From,
          },
          {
            name: 'city_To',
            valString: stMain.city_To,
          },
          {
            name: 'weight',
            valString: stMain.weight,
          },
          {
            name: 'volume',
            valString: stMain.volume,
          },
          {
            name: 'Price',
            valString: stMain.Price,
          },
          {
            name: 'sender_FIO',
            valString: stMain.sender_FIO,
          },
          {
            name: 'sender_EMail',
            valString: stMain.sender_EMail,
          },
          {
            name: 'sender_Tel',
            valString: stMain.sender_Tel,
          },
          {
            name: 'sender_DocID',
            valString: stMain.sender_DocID,
          },
          {
            name: 'sender_INN',
            valString: stMain.sender_INN,
          },
          {
            name: 'sender_Addr',
            valString: stMain.sender_Addr,
          },
          {
            name: 'recip_FIO',
            valString: stMain.recip_FIO,
          },
          {
            name: 'recip_EMail',
            valString: stMain.recip_EMail,
          },
          {
            name: 'recip_Tel',
            valString: stMain.recip_Tel,
          },
          {
            name: 'recip_DocID',
            valString: stMain.recip_DocID,
          },
          {
            name: 'recip_INN',
            valString: stMain.recip_INN,
          },
          {
            name: 'recip_Addr',
            valString: stMain.recip_Addr,
          },
          {
            name: 'LinkOnGood',
            valString: stMain.LinkOnGood,
          },
          {
            name: 'DescrGood',
            valString: stMain.DescrGood,
          },
        ];

        arr.push(stMain);
        postAGood(columns, walletKeys, arr);
      }
    }
  };

  const hideDialog = () => modalSaveGoodHide(false);

  const fetchFromMainScreen = () => {
    if (isSigned) {
      if (typeof props?.route?.params === 'object') {
        seTstMain({
          ...stMain,
          city_From: props?.route?.params.city_From,
          city_To: props?.route?.params.city_To,
          weight: props?.route?.params.weight,
          volume: props?.route?.params.volume,
          Price: props?.route?.params.Price,
        });
      } else {
      }
    }
  };
  useEffect(() => {
    fetchFromMainScreen();
  }, [props?.route?.params]);
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

              <Text style={{ width: '90%', marginTop: 10 }}>
                {I18n.t('sender')}
              </Text>

              <Validation
                text={I18n.t('nsl')}
                visible={validObj.sender_FIO}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, sender_FIO: val })}
                value={stMain.sender_FIO}
              />

              <Validation
                text={I18n.t('phone')}
                visible={validObj.sender_Tel}
                errText={I18n.t('field_not_be_empty')}
              />
              <MaskedTextInput
                mask="+9 (999) 999 99 99"
                placeholder="+9 (999) 999 99 99"
                onChangeText={(text, rawText) => {
                  seTstMain({ ...stMain, sender_Tel: rawText });
                }}
                onFocus={() => seTfocusSender(true)}
                onBlur={() => seTfocusSender(false)}
                value={stMain.sender_Tel}
                style={{
                  backgroundColor: '#F5F5F5',
                  width: '90%',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 10,
                  borderColor: focusSender ? '#3498db' : '#808080',
                  color: 'black',
                }}
                keyboardType="number-pad"
              />
              <Validation
                text={I18n.t('pasport')}
                visible={validObj.sender_DocID}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val =>
                  seTstMain({ ...stMain, sender_DocID: val })
                }
                value={stMain.sender_DocID}
                placeholder="3220 231245"
                style={{ width: '90%' }}
              />

              <Validation
                text={I18n.t('inn')}
                visible={validObj.sender_INN}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => seTstMain({ ...stMain, sender_INN: val })}
                value={stMain.sender_INN}
                placeholder="322043253234231245"
                style={{ width: '90%' }}
              />

              <Validation
                text={I18n.t('email')}
                visible={validObj.sender_EMail}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTstMain({ ...stMain, sender_EMail: val })
                }
                value={stMain.sender_EMail}
              />

              <Validation
                text={I18n.t('adress')}
                visible={validObj.sender_Addr}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, sender_Addr: val })}
                value={stMain.sender_Addr}
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

              <Text style={{ width: '90%', textAlign: 'left', marginTop: 10 }}>
                {I18n.t('reciver')}
              </Text>
              <Validation
                text={I18n.t('nsl')}
                visible={validObj.recip_FIO}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, recip_FIO: val })}
                value={stMain.recip_FIO}
              />

              <Validation
                text={I18n.t('phone')}
                visible={validObj.recip_Tel}
                errText={I18n.t('field_not_be_empty')}
              />
              <MaskedTextInput
                mask="+9 (999) 999 99 99"
                placeholder="+9 (999) 999 99 99"
                onChangeText={(text, rawText) => {
                  seTstMain({ ...stMain, recip_Tel: rawText });
                }}
                onFocus={() => seTfocusReceiver(true)}
                onBlur={() => seTfocusReceiver(false)}
                value={stMain.sender_Tel}
                style={{
                  width: '90%',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 10,
                  borderColor: focusReceiver ? '#3498db' : '#808080',
                  color: 'black',
                }}
                keyboardType="number-pad"
              />
              <Validation
                text={I18n.t('pasport')}
                visible={validObj.recip_DocID}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => seTstMain({ ...stMain, recip_DocID: val })}
                value={stMain.recip_DocID}
                placeholder="A0123824"
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('inn')}
                visible={validObj.recip_INN}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => seTstMain({ ...stMain, recip_INN: val })}
                value={stMain.recip_INN}
                placeholder="2222222222"
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('email')}
                visible={validObj.recip_EMail}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, recip_EMail: val })}
                value={stMain.recip_EMail}
              />
              <Validation
                text={I18n.t('adress')}
                visible={validObj.recip_Addr}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, recip_Addr: val })}
                value={stMain.recip_Addr}
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
              <Validation
                text={I18n.t('product_description')}
                visible={validObj.DescrGood}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'description'}
                onChangeText={val => seTstMain({ ...stMain, DescrGood: val })}
                value={stMain.DescrGood}
                numberOfLines={3}
                mode="outlined"
                multiline={false}
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('link_web')}
                visible={validObj.LinkOnGood}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'lamoda.ru/krossy'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, LinkOnGood: val })}
                value={stMain.LinkOnGood}
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
                <Text>{stMain.Price} $.</Text>
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
            <CustomAlert
              displayAlert={cantSaveAlert}
              displayAlertIcon={true}
              alertTitleText={'Оформление заказа откланено!'}
              alertMessageText={'Вы не заполнили форму в главном экране!'}
              displayPositiveButton={true}
              positiveButtonText={I18n.t('ok')}
              displayNegativeButton={false}
              negativeButtonText={'CANCEL'}
              onPressNegativeButton={() => seTcantSaveAlert(false)}
              onPressPositiveButton={() => seTcantSaveAlert(false)}
            />
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
