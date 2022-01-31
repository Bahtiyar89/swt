import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Sodium from 'react-native-sodium';
//import { useToast } from 'react-native-toast-notifications';
import Base64 from 'base64-js';
import * as encoding from 'text-encoding';
import basex from 'bs58-rn';
import Buffer from 'buffer';

import styles from './styles';
import I18n from '../../../i18';
import Validation from '../../components/validation';

const MainScreen = props => {
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

  const [scan, setScan] = useState(false);
  const [calculated, seTcalculated] = useState('');
  const [result, setResult] = useState();

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
      let weight = parseFloat(stMain.weight);
      seTcalculated(weight * 20.75);
      seTstMain({ ...stMain, Price: (weight * 20.75).toString() });
      showDialog();
    }
  };
  const [visible, seTvisible] = useState(false);

  const showDialog = () => seTvisible(true);

  const hideDialog = () => seTvisible(false);
  const redirectButton = () => {
    seTvisible(false);

    let main = stMain;
    console.log('main', main);
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
    if (stMain.volume.length < 1) {
      err = true;
      seTvalidObj({ ...validObj, volume: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, volume: false });
      }, 1000);
      return err;
    }
    return err;
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
              <TextInput
                label={I18n.t('weight')}
                mode="outlined"
                value={stMain.weight}
                style={styles.textInput}
                keyboardType="decimal-pad"
                onChangeText={val => seTstMain({ ...stMain, weight: val })}
              />
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
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Стоит {calculated} $</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Еще раз</Button>
                <Button onPress={redirectButton}>Хорошо</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
