import React, { useEffect, Fragment, useContext, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, Checkbox, Portal, Dialog } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AuthContext from '../../context/auth/AuthContext';
import GoodsContext from '../../context/goods/GoodsContext';
import I18n from '../../../i18';
import Login from '../Login';
import utility from '../../utils/Utility';
import CustomAlert from '../../components/customAlert';
import CustomInput from 'app/components/CustomInput';
import CustomInputPhoneNumber from 'app/components/CustomInputPhoneNumber';
import styles from './styles';

const CalculatorScreen = props => {
  const { t } = useTranslation();
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
  const { isSigned, file } = authContext;
  const {
    postBalanceToCheck,
    userBalance,
    modalSaveGood,
    loading,
    postAGood,
    modalSaveGoodHide,
  } = goodsContext;
  const [checked, setChecked] = useState(true);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');
  const [maskedPhoneNumberReceiver, setMaskedPhoneNumberReceiver] =
    useState('');
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
              name: 'wieght',
              valString: stMain.weight,
            },
            {
              name: 'volume',
              valString: stMain.volume,
            },
            {
              name: 'city_From',
              valString: stMain.city_From,
            },
            {
              name: 'city_To',
              valString: stMain.city_To,
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
            {
              name: 'Price',
              valString: stMain.Price,
            }, // not values
            {
              name: 'PriceGood',
              valString: stMain.Price,
            },
            {
              name: 'Measurement_L',
              valString: stMain.volume,
            },
            {
              name: 'Measurement_W',
              valString: stMain.volume,
            },
            {
              name: 'Measurement_H',
              valString: stMain.volume,
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
          navigation.navigate('PaymentScreen');
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
  console.log('stMain: ', stMain);

  const phoneNumSend = val => {
    let unmasked = val.replace(/[+, ]/g, '');
    setMaskedPhoneNumber(val);
    seTstMain({ ...stMain, sender_Tel: unmasked });
  };
  const phoneNumReceiver = val => {
    let unmasked = val.replace(/[+, ]/g, '');
    setMaskedPhoneNumberReceiver(val);
    seTstMain({ ...stMain, recip_Tel: unmasked });
  };
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
            <View style={styles.header}>
              <Text style={styles.calc}>{t('t:calculator')}</Text>
              <View style={styles.countries}>
                <Text>{t('t:departure_country')}</Text>
                <Text>{t('t:destination_country')}</Text>
              </View>

              <View style={styles.fromTo}>
                <Text style={styles.fromToText}>{stMain.city_From}</Text>
                <Text style={styles.fromToText}>{stMain.city_To}</Text>
              </View>

              <Text style={styles.send}>{t('t:sender')}</Text>
              <CustomInput
                valtext={t('t:name')}
                visible={validObj.sender_name}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:name')}
                value={fioAdress.sender_name}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_name: val })
                }
              />
              <CustomInput
                valtext={t('t:surname')}
                visible={validObj.sender_surname}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:surname')}
                value={fioAdress.sender_surname}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_surname: val })
                }
              />
              <CustomInput
                valtext={t('t:middlename')}
                visible={validObj.sender_middlename}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:middlename')}
                value={fioAdress.sender_middlename}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_middlename: val })
                }
              />

              <CustomInputPhoneNumber
                labelText={t('t:phone')}
                onChangeInput={val => phoneNumSend(val)}
                inputText={maskedPhoneNumber}
                inputType="numeric"
                mask={true}
              />

              <CustomInput
                valtext={t('t:pasport')}
                visible={validObj.sender_DocID}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:pasport')}
                value={stMain.sender_DocID}
                onChangeInput={val =>
                  seTstMain({ ...stMain, sender_DocID: val })
                }
              />
              <CustomInput
                valtext={t('t:inn')}
                visible={validObj.sender_INN}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:inn')}
                value={stMain.sender_INN}
                onChangeInput={val => seTstMain({ ...stMain, sender_INN: val })}
              />
              <CustomInput
                valtext={t('t:email')}
                visible={validObj.sender_EMail}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:email')}
                value={stMain.sender_EMail}
                onChangeInput={val =>
                  seTstMain({ ...stMain, sender_EMail: val })
                }
              />
              <CustomInput
                valtext={t('t:index')}
                visible={validObj.sender_index}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:index')}
                value={fioAdress.sender_index}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_index: val })
                }
              />
              <CustomInput
                valtext={t('t:town')}
                visible={validObj.sender_index}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:town')}
                value={fioAdress.sender_town}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_town: val })
                }
              />
              <CustomInput
                valtext={t('t:street')}
                visible={validObj.sender_street}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:street')}
                value={fioAdress.sender_street}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_street: val })
                }
              />
              <CustomInput
                valtext={t('t:home')}
                visible={validObj.sender_home}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:home')}
                value={fioAdress.sender_home}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, sender_home: val })
                }
              />

              <Button style={styles.giveToDep} mode="contained">
                <Text style={{ color: 'white' }}>
                  {t('t:give_to_department')}
                </Text>
              </Button>

              <Text style={styles.receiver}>{t('t:reciver')}</Text>

              <CustomInput
                valtext={t('t:name')}
                visible={validObj.recip_name}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:name')}
                value={fioAdress.recip_name}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_name: val })
                }
              />
              <CustomInput
                valtext={t('t:surname')}
                visible={validObj.recip_surname}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:surname')}
                value={fioAdress.recip_surname}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_surname: val })
                }
              />
              <CustomInput
                valtext={t('t:middlename')}
                visible={validObj.recip_surname}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:middlename')}
                value={fioAdress.recip_middlename}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_middlename: val })
                }
              />
              <CustomInput
                valtext={t('t:middlename')}
                visible={validObj.recip_surname}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:middlename')}
                value={fioAdress.recip_middlename}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_middlename: val })
                }
              />

              <CustomInputPhoneNumber
                labelText={t('t:phone')}
                onChangeInput={val => phoneNumReceiver(val)}
                inputText={maskedPhoneNumberReceiver}
                inputType="numeric"
                mask={true}
              />

              <CustomInput
                valtext={t('t:pasport')}
                visible={validObj.recip_surname}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:pasport')}
                value={stMain.recip_DocID}
                onChangeInput={val =>
                  seTstMain({ ...stMain, recip_DocID: val })
                }
              />
              <CustomInput
                valtext={t('t:inn')}
                visible={validObj.recip_INN}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:inn')}
                value={stMain.recip_INN}
                onChangeInput={val => seTstMain({ ...stMain, recip_INN: val })}
              />
              <CustomInput
                valtext={t('t:email')}
                visible={validObj.recip_EMail}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:email')}
                value={stMain.recip_EMail}
                onChangeInput={val =>
                  seTstMain({ ...stMain, recip_EMail: val })
                }
              />
              <CustomInput
                valtext={t('t:index')}
                visible={validObj.recip_index}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:index')}
                value={fioAdress.recip_EMail}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_index: val })
                }
              />
              <CustomInput
                valtext={t('t:town')}
                visible={validObj.recip_town}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:town')}
                value={fioAdress.recip_town}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_town: val })
                }
              />
              <CustomInput
                valtext={t('t:street')}
                visible={validObj.recip_street}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:street')}
                value={fioAdress.recip_street}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_street: val })
                }
              />
              <CustomInput
                valtext={t('t:home')}
                visible={validObj.recip_home}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:home')}
                value={fioAdress.recip_home}
                onChangeInput={val =>
                  seTfioAdress({ ...fioAdress, recip_home: val })
                }
              />
              <CustomInput
                valtext={t('t:product_description')}
                visible={validObj.recip_home}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:product_description')}
                value={stMain.DescrGood}
                onChangeInput={val => seTstMain({ ...stMain, DescrGood: val })}
              />
              <CustomInput
                valtext={t('t:link_web')}
                visible={validObj.LinkOnGood}
                valErrText={t('t:field_not_be_empty')}
                inputLabel={t('t:link_web')}
                value={stMain.LinkOnGood}
                onChangeInput={val => seTstMain({ ...stMain, LinkOnGood: val })}
              />

              <View style={styles.priceWrapper}>
                <Text>{t('t:transportation_cost')}</Text>
                <Text>{stMain.Price} $.</Text>
              </View>
              <Button
                style={styles.oform}
                mode="contained"
                onPress={() => onButtonPressed()}>
                <Text style={{ color: '#f9f9f9' }}>{t('t:checkout')}</Text>
              </Button>
              <Text style={styles.ensureTxt}>{t('t:insure_your_package')}</Text>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Checkbox.Android
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={'#397AF9'}
                />
                <Text style={{ flex: 1, margin: 8, color: '#979797' }}>
                  {t('t:cargo_insurance')}
                </Text>
              </View>

              <Text
                style={{ width: '100%', color: '#979797', marginBottom: 10 }}>
                {t('t:info_text')}
              </Text>
            </View>
            <CustomAlert
              displayAlert={cantSaveAlert}
              displayAlertIcon={true}
              alertTitleText={'Оформление заказа откланено!'}
              alertMessageText={'Вы не заполнили форму в главном экране!'}
              displayPositiveButton={true}
              positiveButtonText={t('t:ok')}
              displayNegativeButton={false}
              negativeButtonText={t('t:cancel')}
              onPressNegativeButton={() => seTcantSaveAlert(false)}
              onPressPositiveButton={() => seTcantSaveAlert(false)}
            />
            <CustomAlert
              displayAlert={balanceAlert}
              displayAlertIcon={true}
              alertTitleText={t('t:checkout_rejected')}
              alertMessageText={I18n.t(
                'you_dont_have_enough_balance_please_top_up_your_balance',
              )}
              displayPositiveButton={true}
              positiveButtonText={t('t:ok')}
              displayNegativeButton={false}
              negativeButtonText={t('t:cancel')}
              onPressNegativeButton={() => seTbalanceAlert(false)}
              onPressPositiveButton={() => seTbalanceAlert(false)}
            />
            <Portal>
              <Dialog visible={modalSaveGood} onDismiss={hideDialog}>
                <Dialog.Title>
                  {t('t:your_order_has_been_accepted')}
                </Dialog.Title>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>{t('t:ok')}</Button>
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

CalculatorScreen.propTypes = {
  navigation: PropTypes.object,
};

CalculatorScreen.defaultProps = {
  navigation: {},
};

export default CalculatorScreen;
