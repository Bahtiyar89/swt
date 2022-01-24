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
import { TextInputMask } from 'react-native-masked-text';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import AuthContext from '../../context/auth/AuthContext';
import GoodsContext from '../../context/goods/GoodsContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';
import Validation from '../../components/validation';

const CalculatorScreen = props => {
  const { navigation } = props;

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
  const { modalSaveGood, loading, good, postAGood, modalSaveGoodHide } =
    goodsContext;
  const [checked, setChecked] = useState(false);
  const columns = [
    {
      name: 'sender_FIO',
      valString: 'bahtiyar',
    },
    {
      name: 'sender_EMail',
      valString: 'bah@gmail.com',
    },
    {
      name: 'sender_Tel',
      valString: '83924798327',
    },
    {
      name: 'sender_DocID',
      valString: '38742389',
    },
    {
      name: 'sender_INN',
      valString: '8274392',
    },
    {
      name: 'sender_Addr',
      valString: 'slkajdklsajds sakjd',
    },
    {
      name: 'recip_FIO',
      valString: 'jdsfjkds',
    },
    {
      name: 'recip_EMail',
      valString: 'ebah@mail.ru',
    },
    {
      name: 'recip_Tel',
      valString: '38778732473',
    },
    {
      name: 'recip_DocID',
      valString: '83297398274',
    },
    {
      name: 'recip_INN',
      valString: '8437589437543',
    },
    {
      name: 'recip_Addr',
      valString: 'jdksfjdsk dshjf',
    },
    {
      name: 'LinkOnGood',
      valString: 'www.gmail.com',
    },
    {
      name: 'DescrGood',
      valString: 'descriptipj',
    },
  ];

  const [stateColumns, seTstateColumns] = useState([...columns]);

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

  const fetchUser = async () => {
    seTarr([]);
    const userData = await utility.getItemObject('calculator');

    if (userData) {
      seTarr(userData);
    }
  };

  async function encrypData() {
    await utility.getItemObject('wkeys').then(keys => {
      console.log('keys: ', keys);
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
    if (stateColumns[4].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_FIO: false });
      }, 1000);
      return err;
    }
    if (stateColumns[6].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_Tel: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_Tel: false });
      }, 1000);
      return err;
    }
    if (stateColumns[7].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_DocID: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_DocID: false });
      }, 1000);
      return err;
    }
    if (stateColumns[8].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_INN: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_INN: false });
      }, 1000);
      return err;
    }
    if (stateColumns[5].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_EMail: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_EMail: false });
      }, 1000);
      return err;
    }
    if (stateColumns[9].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_Addr: false });
      }, 1000);
      return err;
    }
    if (stateColumns[10].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_FIO: false });
      }, 1000);
      return err;
    }
    if (stateColumns[12].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_Tel: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_Tel: false });
      }, 1000);
      return err;
    }
    if (stateColumns[13].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_DocID: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_DocID: false });
      }, 1000);
      return err;
    }
    /*
    if (stateColumns[14].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_INN: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_INN: false });
      }, 1000);
      return err;
    }*/
    if (stateColumns[11].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_EMail: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_EMail: false });
      }, 1000);
      return err;
    }
    /*
    if (stateColumns[15].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_Addr: false });
      }, 1000);
      return err;
    }
    if (stateColumns[17].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, DescrGood: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, DescrGood: false });
      }, 1000);
      return err;
    }
    if (stateColumns[16].valString < 3) {
      err = true;
      seTvalidObj({ ...validObj, LinkOnGood: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, LinkOnGood: false });
      }, 1000);
      return err;
    }*/
    return err;
  };
  const onButtonPressed = () => {
    const err = validation();
    const contractParams = [...stateColumns, ...calculated];
    console.log('contractParams: ', contractParams);
    console.log('arr: ', arr);

    //arr.push(state);
    postAGood(contractParams, walletKeys, arr);
  };

  const hideDialog = () => modalSaveGoodHide(false);
  const onChangeCalculator = (val, dataType) => {
    seTstateColumns(state => {
      // loop over the todos list and find the provided id.
      return state.map(item => {
        //gets everything that was already in item, and updates "done"
        //else returns unmodified item
        return item.name === dataType ? { ...item, valString: val } : item;
      });
    }); // set state to new object with updated list
  };

  console.log('calculated: ', calculated);
  console.log('file: ', file);
  console.log('walletKeys: ', walletKeys);
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
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'sender_FIO')}
                value={stateColumns[0].valString}
              />

              <Validation
                text={I18n.t('phone')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                mode="outlined"
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    style={{ color: '#333333' }}
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val => onChangeCalculator(val, 'sender_Tel')}
                    value={stateColumns[2].valString}
                    placeholder="+ 7 (123) 123 12 34"
                  />
                )}
                style={{ width: '90%' }}
              />

              <Validation
                text={I18n.t('pasport')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => onChangeCalculator(val, 'sender_DocID')}
                value={stateColumns[3].valString}
                placeholder="3220 231245"
                style={{ width: '90%' }}
              />

              <Validation
                text={I18n.t('inn')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => onChangeCalculator(val, 'sender_INN')}
                value={stateColumns[4].valString}
                placeholder="322043253234231245"
                style={{ width: '90%' }}
              />

              <Validation
                text={I18n.t('email')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'sender_EMail')}
                value={stateColumns[1].valString}
              />

              <Validation
                text={I18n.t('adress')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'sender_Addr')}
                value={stateColumns[5].valString}
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
              <Validation
                text={I18n.t('nsl')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'recip_FIO')}
                value={stateColumns[6].valString}
              />

              <Validation
                text={I18n.t('phone')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                render={props => (
                  <TextInputMask
                    type={'custom'}
                    style={{ color: '#333333' }}
                    options={{
                      mask: '+9 (999) 999 99 99',
                    }}
                    onChangeText={val => onChangeCalculator(val, 'recip_Tel')}
                    value={stateColumns[8].valString}
                    placeholder="+ 7 (123) 123 12 34"
                  />
                )}
                style={{ width: '90%', color: 'white' }}
              />

              <Validation
                text={I18n.t('pasport')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => onChangeCalculator(val, 'recip_DocID')}
                value={stateColumns[9].valString}
                placeholder="A0123824"
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('inn')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                mode="outlined"
                onChangeText={val => onChangeCalculator(val, 'recip_INN')}
                value={stateColumns[10].valString}
                placeholder="2222222222"
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('email')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'maksim@mail.ru'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'recip_EMail')}
                value={stateColumns[7].valString}
              />
              <Validation
                text={I18n.t('adress')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'recip_Addr')}
                value={stateColumns[11].valString}
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
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'description'}
                onChangeText={val => onChangeCalculator(val, 'DescrGood')}
                value={stateColumns[13].valString}
                numberOfLines={3}
                mode="outlined"
                multiline={false}
                style={{ width: '90%' }}
              />
              <Validation
                text={I18n.t('link_web')}
                visible={false}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={'lamoda.ru/krossy'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => onChangeCalculator(val, 'LinkOnGood')}
                value={stateColumns[12].valString}
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
                <Text>{calculated[4]?.valString} $.</Text>
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
