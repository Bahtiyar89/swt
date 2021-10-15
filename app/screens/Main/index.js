import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useToast } from 'react-native-toast-notifications';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';

const MainScreen = () => {
  const [text, seTtext] = useState('');

  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();

  onSuccess = e => {
    setResult(e.data);
    setScan(false);
  };

  startScan = () => {
    setScan(true);
    setResult();
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          {!scan && (
            <>
              <Text style={styles.headerText}>Мои отправления</Text>

              <Text style={styles.textparagraph}>Отследить заказ</Text>
              <TextInput
                label="Номер заказа"
                mode="outlined"
                right={<TextInput.Icon name="barcode" onPress={startScan} />}
                style={styles.textInput}
                value={result}
              />
              <Text style={styles.textparagraph}>
                + Отследить по номеру телефона
              </Text>
              <Text style={styles.headerLowerText}>Калкулятор</Text>
              <Text style={styles.textparagraph}>Откуда</Text>
              <TextInput
                label="Город"
                mode="outlined"
                value={text}
                style={styles.textInput}
                onChangeText={text => setText(text)}
              />
              <Text style={styles.textparagraph}>Куда</Text>
              <TextInput
                label="Город"
                mode="outlined"
                value={text}
                style={styles.textInput}
                onChangeText={text => setText(text)}
              />
              <Text style={styles.textparagraph}>Вес, кг</Text>
              <TextInput
                label="Вес"
                mode="outlined"
                value={text}
                style={styles.textInput}
                onChangeText={text => setText(text)}
              />
              <Text style={styles.textparagraph}>Обьем, m3</Text>
              <TextInput
                label="Обьем"
                mode="outlined"
                value={text}
                style={styles.textInput}
                onChangeText={text => setText(text)}
              />
              <Button style={styles.button}>
                <Text style={styles.buttonText}>Рассчитать</Text>
              </Button>
              <Button icon="logout" mode="outlined" onPress={onLogout}>
                Logout
              </Button>
            </>
          )}
          {scan && (
            <View style={styles.sectionContainer}>
              <TouchableOpacity onPress={() => setScan(false)}>
                <Text>Закрыть сканирования</Text>
              </TouchableOpacity>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                onRead={onSuccess}
                topContent={
                  <Text style={styles.centerText}>Scan your QRCode!</Text>
                }
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => setScan(false)}>
                    <Text style={styles.buttonText}>Cancel Scan</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;
