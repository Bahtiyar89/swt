import React, { useContext, useState } from 'react';
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
import { useToast } from 'react-native-toast-notifications';

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
