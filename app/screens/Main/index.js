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

import AuthContext from '../../context/auth/AuthContext';
import styles from './styles';
import I18n from '../../../i18';
import utility from '../../utils/Utility';
import GoodsContext from '../../context/goods/GoodsContext';

const MainScreen = props => {
  const elements = [
    {
      name: 'city_From',
      valString: 'istanbul',
    },
    {
      name: 'city_To',
      valString: 'ankara',
    },
    {
      name: 'weight',
      valString: '1',
    },
    {
      name: 'volume',
      valString: '1',
    },
    {
      name: 'Price',
      valString: '',
    },
  ];

  const [state, seTstate] = useState([...elements]);
  const authContext = useContext(AuthContext);
  const goodsContext = useContext(GoodsContext);

  const { calculateArray, signOut, user } = authContext;
  const { calculatPriceGood, setMainGood, fetchAllGoods, good, allGoods } =
    goodsContext;

  const [scan, setScan] = useState(false);
  const [calculated, seTcalculated] = useState('');
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
    let weight = parseFloat(state[2].valString);
    seTcalculated(weight * 20.75);
    let pr = weight * 20.75;
    seTstate(state => {
      // loop over the todos list and find the provided id.
      return state.map(item => {
        //gets everything that was already in item, and updates "done"
        //else returns unmodified item
        return item.name === 'Price'
          ? { ...item, valString: pr.toString() }
          : item;
      });
    });
    //setMainGood(state);
    showDialog();
  };
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const redirectButton = () => {
    setVisible(false);
    // calculatPriceGood(calculated);
    console.log('state: ', { state });
    props.navigation.navigate('Calculator', { state });
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

  const onChangeCalculator = (val, dataType) => {
    seTstate(state => {
      // loop over the todos list and find the provided id.
      return state.map(item => {
        //gets everything that was already in item, and updates "done"
        //else returns unmodified item
        return item.name === dataType ? { ...item, valString: val } : item;
      });
    }); // set state to new object with updated list
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
              <Text style={styles.textparagraph}>{I18n.t('from')}</Text>
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={state[0].valString}
                style={styles.textInput}
                onChangeText={val => onChangeCalculator(val, 'city_From')}
              />
              <Text style={styles.textparagraph}>{I18n.t('to')}</Text>
              <TextInput
                label={I18n.t('city')}
                mode="outlined"
                value={state[1].valString}
                style={styles.textInput}
                onChangeText={val => onChangeCalculator(val, 'city_To')}
              />
              <Text style={styles.textparagraph}>{I18n.t('weight_kg')}</Text>
              <TextInput
                label={I18n.t('weight')}
                mode="outlined"
                value={state[2].valString}
                style={styles.textInput}
                onChangeText={val => onChangeCalculator(val, 'weight')}
              />
              <Text style={styles.textparagraph}>{I18n.t('capacity_m3')}</Text>
              <TextInput
                label={I18n.t('capacity')}
                mode="outlined"
                value={state[3].valString}
                style={styles.textInput}
                onChangeText={val => onChangeCalculator(val, 'volume')}
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
