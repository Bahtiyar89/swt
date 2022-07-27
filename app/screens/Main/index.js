import React, { useCallback, useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import styles from './styles';
import I18n from '../../../i18';
import Validation from '../../components/validation';
import Utility from '../../utils/Utility';
import F4Context from '../../context/f4_context';

const MainScreen = props => {
  const f4Context = useContext(F4Context);
  const { locale } = f4Context;

  const toast = useToast();
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
      toast.show(I18n.t('you_did_not_specify_the_length_of_the_item'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
      return err;
    }
    if (dimensions.width.length < 1) {
      err = true;
      toast.show(I18n.t('you_did_not_specify_the_width_of_the_item'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
      return err;
    }
    if (dimensions.height.length < 1) {
      err = true;
      toast.show(I18n.t('you_did_not_specify_the_height_of_the_item'), {
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
      I18n.locale = locale;
      if (locale == 'ru') {
        seTseperatior('.');
      } else {
        seTseperatior(',');
      }
      return () => {};
    }, [locale]),
  );
  console.log('locale: main', locale);
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
      toast.show(I18n.t('enter_weight_please'), {
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
            sum = toast.show(I18n.t('the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;

        case 'sizeS':
          if (stMain.weight.replace(',', '.') <= 2) {
            sum = parseFloat(2 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(I18n.t('the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeM':
          if (stMain.weight.replace(',', '.') <= 5) {
            sum = parseFloat(5 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(I18n.t('the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeL':
          if (stMain.weight.replace(',', '.') <= 12) {
            sum = parseFloat(12 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(I18n.t('the_wrong_weight'));
            seTapproximatePrice(sum);
          }
          seTsizeXs(true);
          break;
        case 'sizeTr':
          if (stMain.weight.replace(',', '.') <= 50) {
            sum = parseFloat(50 * 13.25 + 7.5);
            seTapproximatePrice(Number.parseFloat(sum).toFixed(1));
          } else {
            sum = toast.show(I18n.t('the_wrong_weight'));
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
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          {!scan && (
            <>
              <Text style={styles.headerText}>
                {I18n.t('TabNav.shipments')}
              </Text>

              <Text style={styles.textparagraph}>{I18n.t('track_order')}</Text>
              <TextInput
                label={I18n.t('order_number')}
                mode="outlined"
                right={<TextInput.Icon name="barcode" onPress={startScan} />}
                style={styles.textInput}
                value={result}
              />
              <Text style={styles.textparagraph}>
                + {I18n.t('track_by_number')}
              </Text>
              <Text style={styles.headerLowerText}>
                {I18n.t('TabNav.calculator')}
              </Text>
              <Validation
                text={I18n.t('from')}
                visible={validObj.city_From}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={stMain.city_From}
                style={styles.textInput}
                onChangeText={val => seTstMain({ ...stMain, city_From: val })}
              />
              <Validation
                text={I18n.t('to')}
                visible={validObj.city_To}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={stMain.city_To}
                style={styles.textInput}
                onChangeText={val => seTstMain({ ...stMain, city_To: val })}
              />
              <Validation
                text={I18n.t('weight_kg')}
                visible={validObj.weight}
                errText={I18n.t('field_not_be_empty')}
              />
              {/* <TextInput
                label={I18n.t('weight')}
                mode="outlined"
                value={stMain.weight}
                style={styles.textInput}
                keyboardType="decimal-pad"
                onChangeText={value => onExchangeRateInputChange(value)}
             />*/}
              <View style={{ marginTop: 0, width: '90%' }}>
                <FloatingLabelInput
                  value={stMain.weight}
                  staticLabel={
                    stMain.weight.length > 0 || labelWeight ? true : false
                  }
                  hintTextColor={'#fff'}
                  label={I18n.t('weight')}
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
                values={[I18n.t('about'), I18n.t('exactly')]}
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
                      <TouchableOpacity onPress={() => countOpt(0.5, 'sizeXs')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>
                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(0.5, 'sizeXs')}>
                          {I18n.t('size') + ' XS'}
                        </Text>
                        <Text
                          onPress={() => countOpt(0.5, 'sizeXs')}
                          style={{ color: '#00000088' }}>
                          17x12x9 cм
                        </Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: '#00000088', marginRight: 3 }}>
                        {I18n.t('up_to')} 0.5{I18n.t('kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiXs(true)}>
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
                  {/* //////////////////////////////////////////////////////////////////////// S */}
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
                      <TouchableOpacity onPress={() => countOpt(2, 'sizeS')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>

                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(2, 'sizeS')}>
                          {I18n.t('size') + ' S'}
                        </Text>
                        <Text
                          onPress={() => countOpt(2, 'sizeS')}
                          style={{ color: '#00000088' }}>
                          21x20x11 cм
                        </Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 5 }}>
                      <Text style={{ color: '#00000088' }}>
                        {I18n.t('up_to')} 2{I18n.t('kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiS(true)}>
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

                  {/* //////////////////////////////////////////////////////////////////////// M */}
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
                      <TouchableOpacity onPress={() => countOpt(5, 'sizeM')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>
                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(5, 'sizeM')}>
                          {I18n.t('size') + ' M'}
                        </Text>
                        <Text
                          onPress={() => countOpt(5, 'sizeM')}
                          style={{ color: '#00000088' }}>
                          33x25x15 cм
                        </Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 5 }}>
                      <Text style={{ color: '#00000088' }}>
                        {I18n.t('up_to')} 5{I18n.t('kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiM(true)}>
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

                  {/* //////////////////////////////////////////////////////////////////////// L */}
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
                      <TouchableOpacity onPress={() => countOpt(12, 'sizeL')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>
                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(12, 'sizeL')}>
                          {I18n.t('size') + ' L'}
                        </Text>
                        <Text
                          onPress={() => countOpt(12, 'sizeL')}
                          style={{ color: '#00000088' }}>
                          34x33x26 cм
                        </Text>
                      </View>
                    </View>
                    <View style={{ justifyContent: 'center', padding: 5 }}>
                      <Text style={{ color: '#00000088' }}>
                        {I18n.t('up_to')} 12{I18n.t('kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiL(true)}>
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

                  {/* //////////////////////////////////////////////////////////////////////// XL */}
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
                      <TouchableOpacity onPress={() => countOpt(50, 'sizeTr')}>
                        <Image
                          source={require('../../assets/box.png')} //Change your icon image here
                          style={{ height: 45, width: 45 }}
                        />
                      </TouchableOpacity>

                      <View style={{ padding: 5 }}>
                        <Text onPress={() => countOpt(50, 'sizeTr')}>
                          {'XL'}
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
                        {I18n.t('up_to')} 50{I18n.t('kg')}
                      </Text>
                      <TouchableOpacity onPress={() => seTnotiTr(true)}>
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

                  {/* //////////////////////////////////////////////////////////////////////// XXl */}
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
                        {I18n.t('up_to')} 75{I18n.t('kg')}
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
                    {I18n.t('dimensions')}, cм
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
                        label={I18n.t('length')}
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
                        label={I18n.t('width')}
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
              {/*
              <Validation
                text={I18n.t('capacity_m3')}
                visible={validObj.volume}
                errText={I18n.t('field_not_be_empty')}
              />
              <TextInput
                label={I18n.t('capacity')}
                mode="outlined"
                value={stMain.volume}
                style={styles.textInput}
                keyboardType="decimal-pad"
                onChangeText={val => seTstMain({ ...stMain, volume: val })}
              />
              */}
              <Button onPress={() => onButtonCalculate()} style={styles.button}>
                <Text style={styles.buttonText}>{I18n.t('сalculate')}</Text>
              </Button>
            </>
          )}
          {scan && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity onPress={() => setScan(false)}>
                <Text>{I18n.t('close_scan')}</Text>
              </TouchableOpacity>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                onRead={onSuccess}
                topContent={
                  <Text style={styles.centerText}>
                    {I18n.t('scan_your_qr_code')}
                  </Text>
                }
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => setScan(false)}>
                    <Text style={styles.buttonText}>
                      {I18n.t('cancel_scan')}
                    </Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}

          {/* //////////////////////////////////////////////////////////////////////// PORTRAL XS */}
          <Portal>
            <Dialog visible={sizeXs} onDismiss={() => seTsizeXs(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeXs(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiXs} onDismiss={() => seTnotiXs(false)}>
              <Dialog.Title>{I18n.t('notification')} Xs</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiXs(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL S */}

          <Portal>
            <Dialog visible={sizeS} onDismiss={() => seTsizeS(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeS(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiS} onDismiss={() => seTnotiS(false)}>
              <Dialog.Title>{I18n.t('notification')} S</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiS(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL M */}

          <Portal>
            <Dialog visible={sizeM} onDismiss={() => seTsizeM(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeM(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiM} onDismiss={() => seTnotiM(false)}>
              <Dialog.Title>{I18n.t('notification')} M</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiM(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL L */}

          <Portal>
            <Dialog visible={sizeL} onDismiss={() => seTsizeL(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeL(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiL} onDismiss={() => seTnotiL(false)}>
              <Dialog.Title>{I18n.t('notification')} LLL</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiL(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL TRELLOR */}

          <Portal>
            <Dialog visible={sizeTr} onDismiss={() => seTsizeTr(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeTr(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiTr} onDismiss={() => seTnotiTr(false)}>
              <Dialog.Title>{I18n.t('notification')} TR</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiTr(false)}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/* //////////////////////////////////////////////////////////////////////// PORTRAL TRELLOR */}

          <Portal>
            <Dialog visible={sizeXXL} onDismiss={() => seTsizeXXL(false)}>
              <Dialog.Title>
                {approximatePrice.length < 10 ? `${I18n.t('cost')} ` : ''}
                {approximatePrice}
                {approximatePrice.length < 10 ? '$' : ''}
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTsizeXXL(false)}>
                  {I18n.t('ok')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={notiXXL} onDismiss={() => seTnotiTr(false)}>
              <Dialog.Title>{I18n.t('notification')} XXs</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => seTnotiXXL(false)}>
                  {I18n.t('ok')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>
                {I18n.t('price')} {stMain.Price} $
              </Dialog.Title>
              <Dialog.Actions>
                <Button onPress={hideDialog}>{I18n.t('try_again')}</Button>
                <Button onPress={redirectButton}>{I18n.t('ok')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
