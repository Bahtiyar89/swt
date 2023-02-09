import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Button, TextInput, Dialog, Portal } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import I18n from '../../../i18';
import Validation from '../../components/validation';
import Utility from '../../utils/Utility';
import CustomBox from '../../components/CustomBox';

const MainScreen = props => {
  const toast = useToast();
  const { t } = useTranslation();
  const elements = {
    city_From: '',
    city_To: '',
    weight: '',
    volume: '',
    Price: '',
  };

  const [stMain, seTstMain] = useState({ ...elements });

  const validationElements = {
    city_From: false,
    city_To: false,
    weight: false,
    volume: false,
  };
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [visible, seTvisible] = useState(false);
  const [dimensions, seTdimensions] = useState({
    length: '',
    width: '',
    height: '',
  });

  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();
  const [labelWeight, seTlabelWeight] = useState(false);

  ////////////////////////////////////////////// DIMENSION LABELS
  const [labelLength, seTlabelLength] = useState(false);
  const [labelWidth, seTlabelWidth] = useState(false);
  const [labelHeight, seTlabelHeight] = useState(false);

  const [selectedIndex, seTselectedIndex] = useState(0);
  ////////////////////////////////////////////// SİZE XS
  const [notiXs, seTnotiXs] = useState(false);
  const [sizeXs, seTsizeXs] = useState(false);

  ////////////////////////////////////////////// SİZE S
  const [notiS, seTnotiS] = useState(false);
  const [sizeS, seTsizeS] = useState(false);

  ////////////////////////////////////////////// SİZE M
  const [notiM, seTnotiM] = useState(false);
  const [sizeM, seTsizeM] = useState(false);

  ////////////////////////////////////////////// SİZE L
  const [notiL, seTnotiL] = useState(false);
  const [sizeL, seTsizeL] = useState(false);

  ////////////////////////////////////////////// SİZE TROLLEY
  const [notiTr, seTnotiTr] = useState(false);
  const [sizeTr, seTsizeTr] = useState(false);
  ////////////////////////////////////////////// SİZE XXL
  const [notiXXL, seTnotiXXL] = useState(false);
  const [sizeXXL, seTsizeXXL] = useState(false);
  const [approximatePrice, seTapproximatePrice] = useState('');

  const onSuccess = e => {
    setResult(e.data);
    setScan(false);
  };

  const startScan = () => {
    setScan(true);
    setResult();
  };

  const onButtonCalculate = () => {
    const err = validation();

    if (err) {
    } else {
      // let weight = parseFloat(stMain.weight);
      // seTstMain({ ...stMain, Price: (weight * 20.75).toString() });
      let sum;
      let weight = parseFloat(stMain.weight.replace(',', '.'));
      console.log('weight: ', weight);
      console.log(
        'dimensions.length.length > 1: ',
        dimensions.length.length > 1 &&
          dimensions.height.length > 1 &&
          dimensions.width.length > 1,
      );
      if (
        dimensions.length.length >= 1 &&
        dimensions.height.length >= 1 &&
        dimensions.width.length >= 1
      ) {
        console.log('ifff: ');
        let price = parseFloat(
          parseFloat(
            parseFloat(
              dimensions.length * dimensions.width * dimensions.height,
            ) / 1000000,
          ) * 200,
        );
        if (weight > price) {
          sum = parseFloat(parseFloat(weight * 13.25) + 7.5);
        } else {
          sum = parseFloat(parseFloat(price * 13.25) + 7.5);
        }
        seTstMain({ ...stMain, Price: Number.parseFloat(sum).toFixed(1) });
      } else {
        console.log('else: ');
        seTstMain({
          ...stMain,
          Price: Number.parseFloat(approximatePrice).toFixed(1),
        });
      }

      showDialog();
    }
  };

  const showDialog = () => seTvisible(true);

  const hideDialog = () => seTvisible(false);
  const redirectButton = () => {
    seTvisible(false);
    let main = stMain;
    props.navigation.navigate('Calculator', main);
    seTstMain({
      ...stMain,
      city_From: '',
      city_To: '',
      Price: '',
      volume: '',
      weight: '',
    });
  };
  /*
  useEffect(() => {
    async function encrypData() {
      const ALPHABET =
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      let key = await Sodium.crypto_sign_keypair();
      console.log('key : ', key);
      const base58 = basex(ALPHABET);
      let buff = Buffer.Buffer.from(key.sk, 'base64');
      console.log('buff',buff);
      let encodedFoBase58 = base58.encode(buff);
      console.log("encodedFoBase58: ",encodedFoBase58);

      let decodedFoBase58 = base58.decode(encodedFoBase58);
      console.log("decodedFoBase58: ", decodedFoBase58);
      const encryptedMessageFromByteArray = Base64.fromByteArray(decodedFoBase58);
      console.log('dec', encryptedMessageFromByteArray);

      let decoded = base58.decode('43b7AeXY6zHDv8tK2PqZCbXH3CcvygEWxKQxzw6SEmX8u6xqCAHr5BbEekSwkpVJCw1CTAs38M2i5myox7tyU3SA');
      const decryptedMessageFromByteArray = Base64.fromByteArray(decoded);
      console.log('decryptedMessageFromByteArray:',decryptedMessageFromByteArray);
      let dt =await Sodium.crypto_sign_detached('A6EAoRxttSiyS2ECAWJi48bVfKDD5NCQQb2eF4gN1u38fGDFHMch5JgZqBke417d9FR7G9TTjdqLUqSsCDAcxaVA6DS1Myk2p291DB8hEhHuf9eSrtH2fjzE8F',decryptedMessageFromByteArray)
      console.log('dt 55555:', dt);
    }
    encrypData();
  }, []);
  */

  const validation = () => {
    let err = false;
    if (stMain.city_From.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, city_From: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, city_From: false });
      }, 1000);
      return err;
    }
    if (stMain.city_To.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, city_To: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, city_To: false });
      }, 1000);
      return err;
    }
    if (stMain.weight.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, weight: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, weight: false });
      }, 1000);
      return err;
    }
    if (dimensions.length.length < 1) {
      err = true;
      toast.show(t('t:you_did_not_specify_the_length_of_the_item'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
      return err;
    }
    if (dimensions.width.length < 1) {
      err = true;
      toast.show(t('t:you_did_not_specify_the_width_of_the_item'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
      return err;
    }
    if (dimensions.height.length < 1) {
      err = true;
      toast.show(t('t:you_did_not_specify_the_height_of_the_item'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
      return err;
    }

    /*
    if (stMain.volume.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, volume: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, volume: false });
      }, 1000);
      return err;
    }*/
    return err;
  };
  const [seperatior, seTseperatior] = useState('');
  useFocusEffect(
    useCallback(() => {
      Utility.getDeviceLanguageFromStorage()
        .then(lang => {
          if (lang == 'ru') {
            seTseperatior('.');
          } else {
            seTseperatior(',');
          }
        })
        .catch(_ => {
          console.log('err ', 'lang');
        });
      return () => {};
    }, []),
  );

  const onExchangeRateInputChange = async (value, fieldName) => {
    switch (fieldName) {
      case 'weight':
        if (value.includes(seperatior)) {
          let val = await value.replace(seperatior, '');
          seTstMain({ ...stMain, weight: val });
        } else {
          seTstMain({ ...stMain, weight: value });
        }
        break;
      case 'length':
        if (value.includes(seperatior)) {
          let val = await value.replace(seperatior, '');
          seTdimensions({ ...dimensions, length: val });
        } else {
          seTdimensions({ ...dimensions, length: value });
        }
        break;
      case 'width':
        if (value.includes(seperatior)) {
          let val = await value.replace(seperatior, '');
          seTdimensions({ ...dimensions, width: val });
        } else {
          seTdimensions({ ...dimensions, width: value });
        }
        break;
      case 'height':
        if (value.includes(seperatior)) {
          let val = await value.replace(seperatior, '');
          seTdimensions({ ...dimensions, height: val });
        } else {
          seTdimensions({ ...dimensions, height: value });
        }
        break;
      default:
        seTstMain({ ...stMain });
    }
  };

  const countOpt = async (value, fieldName) => {
    console.log('fieldName: ', fieldName);
    if (stMain.weight.length < 1) {
      toast.show(t('t:enter_weight_please'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      let sum;
      switch (fieldName) {
        case 'sizeXs':
          let price = parseFloat(
            parseFloat(parseFloat(17 * 12 * 9) / 1000000) * 200,
          );
          console.log('price: ', price);
          console.log('stMain.weight: ', stMain.weight.replace(',', '.'));
          if (stMain.weight.replace(',', '.') <= 0.5) {
            sum = parseFloat(parseFloat(0.5 * 13.25) + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(t('t:the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;

        case 'sizeS':
          if (stMain.weight.replace(',', '.') <= 2) {
            sum = parseFloat(2 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(t('t:the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeM':
          if (stMain.weight.replace(',', '.') <= 5) {
            sum = parseFloat(5 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(t('t:the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeL':
          if (stMain.weight.replace(',', '.') <= 12) {
            sum = parseFloat(12 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(t('t:the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeTr':
          if (stMain.weight.replace(',', '.') <= 50) {
            sum = parseFloat(50 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(t('t:the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        default:
          break;
      }

      sum = parseFloat(parseFloat(value * 13.25) + 7.5 + 7.5);

      if (fieldName === 'sizeL') {
        seTsizeL(true);
      }
      if (fieldName === 'sizeTr') {
        seTsizeTr(true);
      }
    }
  };
  const setNotificationSize = param => {
    if (param == 'seTnotiXs') {
      seTnotiXs(true);
    } else if (param == 'seTnotiS') {
      seTnotiS(true);
    } else if (param == 'seTnotiM') {
      seTnotiM(true);
    } else if (param == 'seTnotiL') {
      seTnotiL(true);
    } else if (param == 'seTnotiTr') {
      seTnotiL(true);
    } else {
      seTnotiXXL(true);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          {!scan && (
            <>
              <Text style={styles.headerText}>{t('t:shipments')}</Text>

              <Text style={styles.textparagraph}>{t('t:track_order')}</Text>
              <TextInput
                label={t('t:order_number')}
                mode="outlined"
                right={<TextInput.Icon name="barcode" onPress={startScan} />}
                style={styles.textInput}
                value={result}
              />
              <Text style={styles.textparagraph}>
                + {t('t:track_by_number')}
              </Text>
              <Text style={styles.headerLowerText}>{t('t:calculator')}</Text>
              <Validation
                text={t('t:from')}
                visible={validObj.city_From}
                errText={t('t:field_not_be_empty')}
              />
              <TextInput
                label={t('t:city')}
                mode="outlined"
                value={stMain.city_From}
                style={styles.textInput}
                onChangeText={val => seTstMain({ ...stMain, city_From: val })}
              />
              <Validation
                text={t('t:to')}
                visible={validObj.city_To}
                errText={t('field_not_be_empty')}
              />
              <TextInput
                label={t('t:city')}
                mode="outlined"
                value={stMain.city_To}
                style={styles.textInput}
                onChangeText={val => seTstMain({ ...stMain, city_To: val })}
              />
              <Validation
                text={t('t:weight_kg')}
                visible={validObj.weight}
                errText={t('field_not_be_empty')}
              />
              <View style={{ marginTop: 0, width: '90%' }}>
                <FloatingLabelInput
                  value={stMain.weight}
                  staticLabel={
                    stMain.weight.length > 0 || labelWeight ? true : false
                  }
                  hintTextColor={'#fff'}
                  label={t('t:weight')}
                  containerStyles={{
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    backgroundColor: '#f9f9f9',
                    borderColor: labelWeight ? '#3498db' : '#7e7e7e',
                    borderRadius: 5,
                    height: 60,
                  }}
                  onFocus={() => seTlabelWeight(true)}
                  onBlur={() => seTlabelWeight(false)}
                  labelStyles={{
                    fontWeight: '500',
                    backgroundColor: '#f9f9f9',
                    marginHorizontal: labelWeight ? -8 : -15,
                    paddingLeft: labelWeight ? 0 : 10,
                  }}
                  customLabelStyles={{
                    colorFocused: labelWeight ? '#3498db' : '#7e7e7e',
                    fontSizeFocused: 12,
                  }}
                  inputStyles={{
                    paddingHorizontal: 10,
                    marginLeft: -5,
                    color: '#000',
                  }}
                  maskType="currency"
                  currencyDivider={seperatior}
                  keyboardType="numeric"
                  maxDecimalPlaces={2}
                  hintTextColor={'#000'}
                  onChangeText={value =>
                    onExchangeRateInputChange(value, 'weight')
                  }
                />
              </View>

              <SegmentedControlTab
                values={[t('t:about'), t('t:exactly')]}
                selectedIndex={selectedIndex}
                onTabPress={val => seTselectedIndex(val)}
                tabsContainerStyle={{
                  height: 50,
                  backgroundColor: '#F2F2F2',
                  width: '90%',
                  marginTop: 10,
                }}
              />

              {selectedIndex === 0 && (
                <>
                  {/* //////////////////////////////////////////////////////////////////////// XS */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiXs'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' XS'}
                    countOptSizeText={'sizeXs'}
                    size={'17x12x9'}
                    kg={0.5}
                  />
                  {/* //////////////////////////////////////////////////////////////////////// S */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiXs'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' S'}
                    countOptSizeText={'seTnotiS'}
                    size={'21x20x11'}
                    kg={2}
                  />

                  {/* //////////////////////////////////////////////////////////////////////// M */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiM'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' M'}
                    countOptSizeText={'sizeM'}
                    size={'33x25x15'}
                    kg={5}
                  />

                  {/* //////////////////////////////////////////////////////////////////////// L */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiL'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' L'}
                    countOptSizeText={'sizeL'}
                    size={'34x33x26'}
                    kg={12}
                  />

                  {/* //////////////////////////////////////////////////////////////////////// XL */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiTr'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' XL'}
                    countOptSizeText={'sizeTr'}
                    size={'34x33x26'}
                    kg={50}
                  />

                  {/* //////////////////////////////////////////////////////////////////////// XXl */}
                  <CustomBox
                    countOptHandler={countOpt}
                    setNotificationSize={setNotificationSize}
                    setNotificationSizeText={'seTnotiXXL'}
                    image={require('../../assets/box.png')}
                    boxSizeText={' XXL'}
                    countOptSizeText={'sizeTr'}
                    size={'34x33x26'}
                    kg={75}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#00000088',
                      marginTop: 10,
                      height: 55,
                    }}>
                    <View style={{ padding: 3, flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => countOpt(75, 'sizeTr')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>

                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(50, 'sizeTr')}>
                          {'XXL'}
                        </Text>
                        <Text
                          onPress={() => countOpt(50, 'sizeTr')}
                          style={{ color: '#00000088' }}>
                          34x33x26 cм
                        </Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 5 }}>
                      <Text style={{ color: '#00000088' }}>
                        {t('t:up_to')} 75{t('t:kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiXXL(true)}>
                        <Image
                          source={require('../../assets/exclamation-mark.png')} //Change your icon image here
                          style={{
                            height: 25,
                            width: 25,
                            alignSelf: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
              {selectedIndex === 1 && (
                <>
                  <Text style={{ textAlign: 'left', width: '90%', margin: 10 }}>
                    {t('t:dimensions')}, cм
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '90%',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <View style={{ marginTop: 0, width: '30%' }}>
                      <FloatingLabelInput
                        value={dimensions.length}
                        staticLabel
                        hintTextColor={'#fff'}
                        label={t('t:length')}
                        containerStyles={{
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          backgroundColor: '#f9f9f9',
                          borderColor: labelLength ? '#3498db' : '#7e7e7e',
                          borderRadius: 5,
                          height: 60,
                        }}
                        onFocus={() => seTlabelLength(true)}
                        onBlur={() => seTlabelLength(false)}
                        labelStyles={{
                          fontWeight: '500',
                          backgroundColor: '#f9f9f9',
                          //  marginHorizontal: labelShow ? -8 : -15,
                          //  paddingLeft: labelShow ? 0 : 10,
                        }}
                        customLabelStyles={{
                          colorFocused: labelLength ? '#3498db' : '#7e7e7e',
                          fontSizeFocused: 12,
                        }}
                        inputStyles={{
                          paddingHorizontal: 10,
                          marginLeft: -5,
                          color: '#000',
                        }}
                        maskType="currency"
                        currencyDivider={seperatior}
                        keyboardType="numeric"
                        maxDecimalPlaces={2}
                        hintTextColor={'#000'}
                        onChangeText={value =>
                          onExchangeRateInputChange(value, 'length')
                        }
                      />
                    </View>

                    <View style={{ marginTop: 0, width: '30%' }}>
                      <FloatingLabelInput
                        value={dimensions.width}
                        staticLabel
                        hintTextColor={'#fff'}
                        label={t('t:width')}
                        containerStyles={{
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          backgroundColor: '#f9f9f9',
                          borderColor: labelWidth ? '#3498db' : '#7e7e7e',
                          borderRadius: 5,
                          height: 60,
                        }}
                        onFocus={() => seTlabelWidth(true)}
                        onBlur={() => seTlabelWidth(false)}
                        labelStyles={{
                          fontWeight: '500',
                          backgroundColor: '#f9f9f9',
                          //  marginHorizontal: labelShow ? -8 : -15,
                          //  paddingLeft: labelShow ? 0 : 10,
                        }}
                        customLabelStyles={{
                          colorFocused: labelWidth ? '#3498db' : '#7e7e7e',
                          fontSizeFocused: 12,
                        }}
                        inputStyles={{
                          paddingHorizontal: 10,
                          marginLeft: -5,
                          color: '#000',
                        }}
                        maskType="currency"
                        currencyDivider={seperatior}
                        keyboardType="numeric"
                        maxDecimalPlaces={2}
                        hintTextColor={'#000'}
                        onChangeText={value =>
                          onExchangeRateInputChange(value, 'width')
                        }
                      />
                    </View>

                    <View style={{ marginTop: 0, width: '30%' }}>
                      <FloatingLabelInput
                        value={dimensions.height}
                        staticLabel={true}
                        hintTextColor={'#fff'}
                        label={'Высота'}
                        containerStyles={{
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          backgroundColor: '#f9f9f9',
                          borderColor: labelHeight ? '#3498db' : '#7e7e7e',
                          borderRadius: 5,
                          height: 60,
                        }}
                        onFocus={() => seTlabelHeight(true)}
                        onBlur={() => seTlabelHeight(false)}
                        labelStyles={{
                          fontWeight: '500',
                          backgroundColor: '#f9f9f9',
                          //  marginHorizontal: labelShow ? -8 : -15,
                          //  paddingLeft: labelShow ? 0 : 10,
                        }}
                        customLabelStyles={{
                          colorFocused: labelHeight ? '#3498db' : '#7e7e7e',
                          fontSizeFocused: 12,
                        }}
                        inputStyles={{
                          paddingHorizontal: 10,
                          marginLeft: -5,
                          color: '#000',
                        }}
                        maskType="currency"
                        currencyDivider={seperatior}
                        keyboardType="numeric"
                        maxDecimalPlaces={2}
                        hintTextColor={'#000'}
                        onChangeText={value =>
                          onExchangeRateInputChange(value, 'height')
                        }
                      />
                    </View>
                  </View>
                </>
              )}

              <Button onPress={() => onButtonCalculate()} style={styles.button}>
                <Text style={styles.buttonText}>{t('t:сalculate')}</Text>
              </Button>
            </>
          )}
          {scan && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity onPress={() => setScan(false)}>
                <Text>{t('t:close_scan')}</Text>
              </TouchableOpacity>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                onRead={onSuccess}
                topContent={
                  <Text style={styles.centerText}>
                    {t('t:scan_your_qr_code')}
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => setScan(false)}>
                    <Text style={styles.buttonText}>{t('t:cancel_scan')}</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}

          {/* //////////////////////////////////////////////////////////////////////// PORTRAL XS */}
          <Portal>
            <Dialog visible={sizeXs} onDismiss={() => seTsizeXs(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeXs(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiXs} onDismiss={() => seTnotiXs(false)}>
              <Dialog.Title>{t('t:notification')} Xs</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiXs(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL S */}

          <Portal>
            <Dialog visible={sizeS} onDismiss={() => seTsizeS(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeS(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiS} onDismiss={() => seTnotiS(false)}>
              <Dialog.Title>{t('t:notification')} S</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiS(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL M */}

          <Portal>
            <Dialog visible={sizeM} onDismiss={() => seTsizeM(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeM(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiM} onDismiss={() => seTnotiM(false)}>
              <Dialog.Title>{t('t:notification')} M</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiM(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL L */}

          <Portal>
            <Dialog visible={sizeL} onDismiss={() => seTsizeL(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeL(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiL} onDismiss={() => seTnotiL(false)}>
              <Dialog.Title>{t('t:notification')} LLL</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiL(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL TRELLOR */}

          <Portal>
            <Dialog visible={sizeTr} onDismiss={() => seTsizeTr(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeTr(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiTr} onDismiss={() => seTnotiTr(false)}>
              <Dialog.Title>{t('t:notification')} TR</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiTr(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL TRELLOR */}

          <Portal>
            <Dialog visible={sizeXXL} onDismiss={() => seTsizeXXL(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeXXL(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiXXL} onDismiss={() => seTnotiTr(false)}>
              <Dialog.Title>{t('t:notification')} XXs</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiXXL(false)}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>
                {t('t:price')} {stMain.Price} $
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={hideDialog}>{t('t:try_again')}</Button>
                <Button onPress={redirectButton}>{t('t:ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
