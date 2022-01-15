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
import Sodium from "react-native-sodium";
//import { useToast } from 'react-native-toast-notifications';
//import Base64 from 'base64-js' 
//import * as encoding from 'text-encoding';

import AuthContext from '../../context/auth/AuthContext';
import styles from './styles';
import I18n from '../../../i18';
import utility from '../../utils/Utility';
import GoodsContext from '../../context/goods/GoodsContext';

const MainScreen = props => {
  const elements = {
    city_From: '',
    city_To: '',
    weight: '',
    volume: '',
  };

  const [state, seTstate] = useState({ ...elements });
  const authContext = useContext(AuthContext);
  const goodsContext = useContext(GoodsContext);

  const { calculateArray, signOut, user } = authContext;
  const { calculatPriceGood, setMainGood, fetchAllGoods, good, allGoods } =
    goodsContext;

  const [scan, setScan] = useState(false);
  const [calculated, seTcalculated] = useState(0);
  const [result, setResult] = useState();

  onSuccess = e => {
    setResult(e.data);
    setScan(false);
  };

  startScan = () => {
    setScan(true);
    setResult();
  };

  const onButtonCalculate = () => {
    let weight = parseFloat(state.weight);
    seTcalculated(weight * 20.75);
    setMainGood(state);
    showDialog();
  };
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const redirectButton = () => {
    setVisible(false);
    calculatPriceGood(calculated);
    props.navigation.navigate('Calculator');
  };
/*
  let uint8array = new encoding.TextEncoder().encode("Проверка текста текста");
  const encryptedMessageFromByteArray = Base64.fromByteArray(uint8array)
  console.log("encryptedMessageFromByteArray: ", encryptedMessageFromByteArray);
  const k = Base64.fromByteArray(new Uint8Array([
    0x1b, 0x27, 0x55, 0x64, 0x73, 0xe9, 0x85, 0xd4, 0x62, 0xcd, 0x51, 0x19, 0x7a, 0x9a, 0x46, 0xc7,
    0x60, 0x09, 0x54, 0x9e, 0xac, 0x64, 0x74, 0xf2, 0x06, 0xc4, 0xee, 0x08, 0x44, 0xf6, 0x83, 0x89]))

  const n = Base64.fromByteArray(new Uint8Array([
    0x69, 0x69, 0x6e, 0xe9, 0x55, 0xb6, 0x2b, 0x73, 0xcd, 0x62, 0xbd, 0xa8,
    0x75, 0xfc, 0x73, 0xd6, 0x82, 0x19, 0xe0, 0x03, 0x6b, 0x7a, 0x0b, 0x37]))
  Sodium.crypto_secretbox_easy(encryptedMessageFromByteArray, n, k).then((c) => {
    console.log("c: ", c);
    { 
      //this.testPassed('crypto_secretbox_easy_1')
    }
    Sodium.crypto_secretbox_open_easy(c, n, k)
      .then((mm) => {
        {
          console.log("mm: ",mm);
          //this.testPassed('crypto_secretbox_open_easy_1', encryptedMessageFromByteArray === mm)
      }
        let p = Base64.toByteArray(mm);
        var uint8array = new encoding.TextDecoder().decode(p);
        console.log("uint8array: 55", uint8array);
      })
      .catch((error) =>{
        console.log("error: 33",error);
        // this.testFailed('crypto_secretbox_open_easy_1', error)
        })
  }).catch((error) => {
    console.log("error: 44",error);
    //  this.testFailed('crypto_secretbox_easy_1', error)
  })
*/
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
              <Text style={styles.textparagraph}>{I18n.t('from')}</Text>
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={state.city_From}
                style={styles.textInput}
                onChangeText={val => seTstate({ ...state, city_From: val })}
              />
              <Text style={styles.textparagraph}>{I18n.t('to')}</Text>
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={state.city_To}
                style={styles.textInput}
                onChangeText={val => seTstate({ ...state, city_To: val })}
              />
              <Text style={styles.textparagraph}>{I18n.t('weight_kg')}</Text>
              <TextInput
                label={I18n.t('weight')}
                mode="outlined"
                value={state.weight}
                style={styles.textInput}
                onChangeText={val => seTstate({ ...state, weight: val })}
              />
              <Text style={styles.textparagraph}>{I18n.t('capacity_m3')}</Text>
              <TextInput
                label={I18n.t('capacity')}
                mode="outlined"
                value={state.volume}
                style={styles.textInput}
                onChangeText={val => seTstate({ ...state, volume: val })}
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
