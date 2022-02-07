import React, { useEffect, Fragment, useContext, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import {
  Button,
  TextInput,
  Checkbox,
  Portal,
  Dialog,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaskInput from 'react-native-mask-input';

import AuthContext from '../../context/auth/AuthContext';
import GoodsContext from '../../context/goods/GoodsContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';
import Validation from '../../components/validation';
import CustomAlert from '../../components/customAlert';

const CalculatorScreen = props => {
  const { navigation } = props;
  const maskDigits = [
    '+',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ];
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

  const [fioAdress, seTfioAdress] = useState({
    sender_name: '',
    sender_surname: '',
    sender_middlename: '',
    sender_index: '',
    sender_town: '',
    sender_street: '',
    sender_home: '',
    recip_name: '',
    recip_surname: '',
    recip_middlename: '',
    recip_index: '',
    recip_town: '',
    recip_street: '',
    recip_home: '',
  });

  const authContext = useContext(AuthContext);
  const goodsContext = useContext(GoodsContext);
  const { user, isSigned, file } = authContext;
  const {
    postBalanceToCheck,
    userBalance,
    modalSaveGood,
    loading,
    postAGood,
    modalSaveGoodHide,
  } = goodsContext;
  const [checked, setChecked] = useState(true);

  const validationElements = {
    sender_name: false,
    sender_surname: false,
    sender_middlename: false,
    sender_index: false,
    sender_town: false,
    sender_street: false,
    sender_home: false,
    sender_Tel: false,
    sender_DocID: false,
    sender_INN: false,
    sender_EMail: false,
    //sender_Addr: false,
    //recip_FIO: false,
    recip_Tel: false,
    recip_DocID: false,
    recip_INN: false,
    recip_EMail: false,
    recip_Addr: false,
    DescrGood: false,
    LinkOnGood: false,
    recip_name: false,
    recip_surname: false,
    recip_middlename: false,
    recip_index: false,
    recip_town: false,
    recip_street: false,
    recip_home: false,
  };
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [arr, seTarr] = useState([]);
  const [walletKeys, seTwalletKeys] = useState({
    sk: '',
    pk: '',
  });

  const [cantSaveAlert, seTcantSaveAlert] = useState(false);
  const [balanceAlert, seTbalanceAlert] = useState(false);

  const fetchCalculator = async () => {
    seTarr([]);
    const calculator = await utility.getItemObject('calculator');

    if (calculator) {
      seTarr(calculator);
    }
  };

  async function encrypData() {
    await utility.getItemObject('wkeys').then(keys => {
      if (keys) {
        postBalanceToCheck(keys);
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
        fetchCalculator();

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
    if (fioAdress.sender_name.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_name: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_name: false });
      }, 10000);
      return err;
    }
    if (fioAdress.sender_surname.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_surname: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_surname: false });
      }, 10000);
      return err;
    }
    if (fioAdress.sender_middlename.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_middlename: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_middlename: false });
      }, 10000);
      return err;
    }

    /*  if (stMain.sender_FIO.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_FIO: false });
      }, 10000);
      return err;
    }*/
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
    if (fioAdress.sender_index.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_index: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_index: false });
      }, 10000);
      return err;
    }
    if (fioAdress.sender_town.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_town: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_town: false });
      }, 10000);
      return err;
    }
    if (fioAdress.sender_street.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_street: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_street: false });
      }, 10000);
      return err;
    }
    if (fioAdress.sender_home.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, sender_home: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_home: false });
      }, 10000);
      return err;
    }
    /*if (stMain.sender_Addr < 3) {
      err = true;
      seTvalidObj({ ...validObj, sender_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, sender_Addr: false });
      }, 3000);
      return err;
    }*/
    if (fioAdress.recip_name.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_name: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_name: false });
      }, 1000);
      return err;
    }
    if (fioAdress.recip_surname.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_surname: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_surname: false });
      }, 1000);
      return err;
    }
    if (fioAdress.recip_middlename.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_middlename: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_middlename: false });
      }, 1000);
      return err;
    }
    /* if (stMain.recip_FIO.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_FIO: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_FIO: false });
      }, 1000);
      return err;
    }*/
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
    if (fioAdress.recip_index.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_index: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_index: false });
      }, 1000);
      return err;
    }
    if (fioAdress.recip_town.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_town: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_town: false });
      }, 1000);
      return err;
    }
    if (fioAdress.recip_street.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_street: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_street: false });
      }, 1000);
      return err;
    }
    if (fioAdress.recip_home.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, recip_home: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_home: false });
      }, 1000);
      return err;
    }
    /* if (stMain.recip_Addr.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, recip_Addr: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, recip_Addr: false });
      }, 1000);
      return err;
    }*/
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
    } else {
      const err = validation();
      if (err) {
      } else {
        console.log('22: ', arr);
        seTstMain({
          ...stMain,
          sender_FIO:
            fioAdress.sender_name +
            ' ' +
            fioAdress.sender_surname +
            ' ' +
            fioAdress.sender_middlename,
          sender_Addr:
            fioAdress.sender_index +
            ' ' +
            fioAdress.sender_town +
            ' ' +
            fioAdress.sender_street +
            ' ' +
            fioAdress.sender_home,
          recip_FIO:
            fioAdress.recip_name +
            ' ' +
            fioAdress.recip_surname +
            ' ' +
            fioAdress.recip_middlename,
          recip_Addr:
            fioAdress.recip_index +
            ' ' +
            fioAdress.recip_town +
            ' ' +
            fioAdress.recip_street +
            ' ' +
            fioAdress.recip_home,
        });
        if (userBalance.balance < 0.5) {
          seTbalanceAlert(true);
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
              valString:
                fioAdress.sender_name +
                ' ' +
                fioAdress.sender_surname +
                ' ' +
                fioAdress.sender_middlename,
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
              valString:
                fioAdress.sender_index +
                ' ' +
                fioAdress.sender_town +
                ' ' +
                fioAdress.sender_street +
                ' ' +
                fioAdress.sender_home,
            },
            {
              name: 'recip_FIO',
              valString:
                fioAdress.recip_name +
                ' ' +
                fioAdress.recip_surname +
                ' ' +
                fioAdress.recip_middlename,
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
              valString:
                fioAdress.recip_index +
                ' ' +
                fioAdress.recip_town +
                ' ' +
                fioAdress.recip_street +
                ' ' +
                fioAdress.recip_home,
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

          // arr.push(stMain);
          console.log('arr push: ', arr);
          postAGood(columns, walletKeys, arr);
          seTstMain({
            ...stMain,
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
          });
          seTfioAdress({
            sender_name: '',
            sender_surname: '',
            sender_middlename: '',
            sender_index: '',
            sender_town: '',
            sender_street: '',
            sender_home: '',
            recip_name: '',
            recip_surname: '',
            recip_middlename: '',
            recip_index: '',
            recip_town: '',
            recip_street: '',
            recip_home: '',
          });
        }
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
  }, [props?.route?.params, isSigned]);

  return (
    <Fragment>
      {isSigned ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Spinner
              visible={loading}
              textContent={'Загружается...'}
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
                  {stMain.city_From}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {stMain.city_To}
                </Text>
              </View>

              <Text style={{ width: '90%', marginTop: 10 }}>
                {I18n.t('sender')}
              </Text>

              <Validation
                text={I18n.t('name')}
                visible={validObj.sender_name}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('name')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_name: val })
                }
                value={fioAdress.sender_name}
              />

              <Validation
                text={I18n.t('surname')}
                visible={validObj.sender_surname}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('surname')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_surname: val })
                }
                value={fioAdress.sender_surname}
              />

              <Validation
                text={I18n.t('middlename')}
                visible={validObj.sender_middlename}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('middlename')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_middlename: val })
                }
                value={fioAdress.sender_middlename}
              />

              {/*
              <TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, sender_FIO: val })}
                value={stMain.sender_FIO}
              />
*/}
              <Validation
                text={I18n.t('phone')}
                visible={validObj.sender_Tel}
                errText={I18n.t('field_not_be_empty')}
              />

              <TextInput
                style={{ width: '90%' }}
                mode="outlined"
                value={stMain.sender_Tel}
                render={props => {
                  return (
                    <MaskInput
                      style={{ paddingLeft: 10 }}
                      onChangeText={(masked, unmasked) => {
                        seTstMain({ ...stMain, sender_Tel: unmasked });
                      }}
                      keyboardType="decimal-pad"
                      value={props.value}
                      mask={maskDigits}
                    />
                  );
                }}
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
                text={I18n.t('index')}
                visible={validObj.sender_index}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('index')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_index: val })
                }
                value={fioAdress.sender_index}
              />

              <Validation
                text={I18n.t('town')}
                visible={validObj.sender_town}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('town')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_town: val })
                }
                value={fioAdress.sender_town}
              />

              <Validation
                text={I18n.t('street')}
                visible={validObj.sender_street}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('street')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_street: val })
                }
                value={fioAdress.sender_street}
              />

              <Validation
                text={I18n.t('home')}
                visible={validObj.sender_home}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('home')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, sender_home: val })
                }
                value={fioAdress.sender_home}
              />
              {/*
              <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, sender_Addr: val })}
                value={stMain.sender_Addr}
               />*/}
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
                text={I18n.t('name')}
                visible={validObj.recip_name}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('name')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_name: val })
                }
                value={fioAdress.recip_name}
              />

              <Validation
                text={I18n.t('surname')}
                visible={validObj.recip_surname}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('surname')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_surname: val })
                }
                value={fioAdress.recip_surname}
              />
              <Validation
                text={I18n.t('middlename')}
                visible={validObj.recip_middlename}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('middlename')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_middlename: val })
                }
                value={fioAdress.recip_middlename}
              />
              {/*<TextInput
                label={'Иванов Иван Иванович'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, recip_FIO: val })}
                value={stMain.recip_FIO}
              />
            */}
              <Validation
                text={I18n.t('phone')}
                visible={validObj.recip_Tel}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                style={{ width: '90%' }}
                mode="outlined"
                value={stMain.recip_Tel}
                render={props => {
                  return (
                    <MaskInput
                      style={{ paddingLeft: 10 }}
                      onChangeText={(masked, unmasked) => {
                        seTstMain({ ...stMain, recip_Tel: unmasked });
                      }}
                      keyboardType="number-pad"
                      value={props.value}
                      mask={maskDigits}
                    />
                  );
                }}
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
                text={I18n.t('index')}
                visible={validObj.recip_index}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('index')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_index: val })
                }
                value={fioAdress.recip_index}
              />

              <Validation
                text={I18n.t('town')}
                visible={validObj.recip_town}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('town')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_town: val })
                }
                value={fioAdress.recip_town}
              />

              <Validation
                text={I18n.t('street')}
                visible={validObj.recip_street}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('street')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_street: val })
                }
                value={fioAdress.recip_street}
              />

              <Validation
                text={I18n.t('home')}
                visible={validObj.recip_home}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('home')}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val =>
                  seTfioAdress({ ...fioAdress, recip_home: val })
                }
                value={fioAdress.recip_home}
              />
              {/* <TextInput
                label={'Москва, ул. Леонова, д. 35'}
                mode="outlined"
                style={{ width: '90%' }}
                onChangeText={val => seTstMain({ ...stMain, recip_Addr: val })}
                value={stMain.recip_Addr}
             />*/}
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
            <CustomAlert
              displayAlert={balanceAlert}
              displayAlertIcon={true}
              alertTitleText={'Оформление заказа откланено!'}
              alertMessageText={
                'У вас не достаточно балансa, пожалуйста пополните баланс!'
              }
              displayPositiveButton={true}
              positiveButtonText={I18n.t('ok')}
              displayNegativeButton={false}
              negativeButtonText={'CANCEL'}
              onPressNegativeButton={() => seTbalanceAlert(false)}
              onPressPositiveButton={() => seTbalanceAlert(false)}
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
