import React, { useState, useContext } from 'react';
import { View, ScrollView, SafeAreaView, Platform } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Checkbox,
} from 'react-native-paper';
//import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text';
import { useToast } from 'react-native-toast-notifications';
import basex from 'bs58-rn';
import Sodium from 'react-native-sodium';
import Buffer from 'buffer';

//import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import AuthContext from '../../context/auth/AuthContext';
//import NavigationService from 'app/navigation/NavigationService';
import I18n from '../../../i18';
import utility from '../../utils/Utility';
import RNFS from 'react-native-fs';
import CustomAlert from '../../components/customAlert';
import KeysModal from '../Profile/keys';

interface IState {
  loginReducer: ILoginState;
}

interface IProps {
  navigation: any;
}

const Registration: React.FC<IProps> = (props: IProps) => {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const { register, postRegisterBalanceToCheck } = authContext;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const id = useSelector((state: IState) => state.loginReducer.id);
  //const dispatch = useDispatch();
  //const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  //const onForgot = () => NavigationService.navigate('RestoreAccount');

  const toast = useToast();
  const elements = {
    fio: '',
    email: '',
    password: '',
    phone_number: '',
    username: '',
  };
  const [user, seTuser] = useState({ ...elements });

  const validationElements = {
    fio: false,
    email: false,
    password: false,
    password_confirm: false,
    phone_number: false,
    chebox: false,
    username: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const [password_confirm, seTpassword_confirm] = useState('');
  const [passwordShow, seTpasswordShow] = useState(true);
  const [passwordConfirmShow, seTpasswordConfirmShow] = useState(true);
  const [haveKeysModal, seThaveKeysModal] = useState(false);
  const [keysDownloadModal, seTkeysDownloadModal] = useState(false);
  const [modelWallet, seTmodelWallet] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [model, setmodel] = React.useState(false);
  const [filePath, seTfilePath] = useState('');
  const [displayAlert, seTdisplayAlert] = useState(false);
  const [walletKeys, seTwalletKeys] = useState({
    sk: '',
    pk: '',
  });

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'fio':
          varPr.fio = val;
          break;
        case 'username':
          varPr.username = val;
          break;
        case 'email':
          varPr.email = val;
          break;
        case 'phone_number':
          varPr.phone_number = val;
          break;
        case 'password':
          varPr.password = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (user.fio.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, fio: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, fio: false });
      }, 1000);
      return err;
    }
    if (user.username.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, username: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, username: false });
      }, 1000);
      return err;
    }
    if (!user.email.includes('@')) {
      err = true;
      seTvalidObj({ ...validObj, email: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, email: false });
      }, 1000);
      return err;
    }

    if (user.phone_number.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, phone_number: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, phone_number: false });
      }, 1000);
      return err;
    }

    if (user.password !== password_confirm) {
      err = true;
      seTvalidObj({ ...validObj, password_confirm: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, password_confirm: false });
      }, 1000);
    }

    if (!checked) {
      err = true;
      seTvalidObj({ ...validObj, chebox: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, chebox: false });
      }, 1000);
      return err;
    }

    return err;
  };

  const submit = async () => {
    await utility.getItemObject('wkeys').then(keys => {
      if (keys) {
        seThaveKeysModal(true);
      } else {
        postRegisterBalanceToCheck(walletKeys, navigation);
      }
    });
    /*
    const err = validation();
    console.log('err...', JSON.stringify(err));
    console.log('user...', JSON.stringify(validObj));
    console.log('user...', user);
    if (err) {
      toast.show('Было ошибка повторите заново');
    } else {
      register(user, navigation);
    }*/
  };

  const generateKeys = async () => {
    const ALPHABET =
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const base58 = basex(ALPHABET);
    let key = await Sodium.crypto_sign_keypair();
    console.log('keyR', key);
    let encoded_SK_Base58 = base58.encode(Buffer.Buffer.from(key.sk, 'base64'));
    let encoded_PK_Base58 = base58.encode(Buffer.Buffer.from(key.pk, 'base64'));
    const obj = {};
    obj['sk'] = encoded_SK_Base58;
    obj['pk'] = encoded_PK_Base58;
    seTwalletKeys({
      ...walletKeys,
      sk: encoded_SK_Base58,
      pk: encoded_PK_Base58,
    });
  };

  const downloadKeys = async () => {
    await utility.getItemObject('wkeys').then(keys => {
      if (keys) {
        utility.removeItem('wkeys');
        seTkeysDownloadModal(true);
      } else {
        postRegisterBalanceToCheck(walletKeys, navigation);
      }
    });
  };
  console.log('walletKeys: ', walletKeys);
  const positivButtonPressed = () => {
    console.log('ok Pressed');
    seThaveKeysModal(false);
    seTmodelWallet(true);
  };
  const keysDownloadPressed = () => {
    console.log('ok Pressed');
    seTkeysDownloadModal(false);
    seTmodelWallet(false);
  };
  console.log('seThaveKeysModal', haveKeysModal);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.signInText}>Регистрация</Text>
          <Button
            icon="lead-pencil"
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 10,
            }}
            disabled={
              walletKeys.pk.length === 44 && walletKeys.sk.length === 88
            }
            onPress={generateKeys}
            mode="contained">
            <Text style={{ textAlign: 'center', color: '#000' }}>
              {'Сгенирировать Ключи'}
            </Text>
          </Button>
          <Button
            icon="download"
            style={{
              width: '90%',
            }}
            disabled={walletKeys.pk.length != 44 && walletKeys.sk.length != 88}
            onPress={downloadKeys}
            mode="contained">
            <Text style={{ textAlign: 'center', color: '#000' }}>
              {'Скачать Ключи'}
            </Text>
          </Button>
          <View style={{ marginTop: 5, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Публичный ключ</Text>
          </View>
          <TextInput
            editable={false}
            placeholder="Публичный ключ"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'fio')}
            value={walletKeys.pk}
          />
          <View style={{ marginTop: 5, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Секретный ключ</Text>
          </View>
          <TextInput
            editable={false}
            placeholder="Секретный ключ"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'fio')}
            value={walletKeys.sk}
          />
          {/*  <View style={{ flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Имя Фамилия Отчество</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.fio}>
              Введите И.Ф.О
            </HelperText>
          </View>

          <TextInput
            placeholder="Иванов Иван Иванович"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'fio')}
            value={user.fio}
          />

          <View style={{ marginTop: 10, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Имя пользователя</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.username}>
              Имя пользователя
            </HelperText>
          </View>

          <TextInput
            placeholder="maksim"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'username')}
            value={user.username}
          />

          <View style={{ marginTop: 10, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>E-mail</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.email}>
              Email недействителень!
            </HelperText>
          </View>

          <TextInput
            placeholder="example@100express.com"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'email')}
            right={<TextInput.Icon name={require('../../assets/email.png')} />}
            value={user.email}
          />

          <View style={{ marginTop: 10, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Телефон</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.phone_number}>
              Введите номер телефона!
            </HelperText>
          </View>

          <TextInput
            mode="outlined"
            render={props => (
              <TextInputMask
                type={'custom'}
                options={{
                  mask: '+9 (999) 999 99 99',
                }}
                onChangeText={val => handleChange(val, 'phone_number')}
                placeholder="+ 7 (123) 123 12 34"
                value={user.phone_number}
              />
            )}
            style={styles.textInput}
          />
              */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <View style={{ width: '10%' }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={'#397AF9'}
              />
            </View>

            <Text
              style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              Соглашение на обработку{' '}
              <Text style={{ color: '#397AF9' }} onPress={() => setmodel(true)}>
                персональных данных
              </Text>
            </Text>
          </View>
          <HelperText
            style={{ alignItems: 'flex-end' }}
            type="error"
            visible={validObj.chebox}>
            Соглашение должно быть нажато!
          </HelperText>
          <Button
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 30,
              backgroundColor: '#333333',
            }}
            mode="contained"
            onPress={submit}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </Button>
        </View>
        <Modal isVisible={model}>
          <View style={{ backgroundColor: 'white' }}>
            <Text>Персональе данные тут...</Text>
            <Text>Персональе данные тут...</Text>
            <Text>Персональе данные тут...</Text>
            <Button mode="contained" onPress={() => setmodel(false)}>
              <Text style={styles.buttonText}>Продолжить</Text>
            </Button>
          </View>
        </Modal>
        {/*
        <CustomAlert
          displayAlert={displayAlert}
          displayAlertIcon={true}
          alertTitleText={I18n.t('file_saved_under_name')}
          alertMessageText={filePath}
          displayPositiveButton={true}
          positiveButtonText={I18n.t('ok')}
          displayNegativeButton={false}
          negativeButtonText={'CANCEL'}
          onPressNegativeButton={() => seTdisplayAlert(false)}
          onPressPositiveButton={() => seTdisplayAlert(false)}
        />*/}
        <CustomAlert
          displayAlert={haveKeysModal}
          displayAlertIcon={true}
          alertTitleText={'У вас уже имеются ключи'}
          alertMessageText={
            'Вы не можете зарегистрироваться, потому что у вас уже имеются ключи'
          }
          displayPositiveButton={true}
          positiveButtonText={I18n.t('ok')}
          displayNegativeButton={false}
          negativeButtonText={'CANCEL'}
          onPressNegativeButton={positivButtonPressed}
          onPressPositiveButton={positivButtonPressed}
        />
        <CustomAlert
          displayAlert={keysDownloadModal}
          displayAlertIcon={true}
          alertTitleText={'Нажимайте регистрацию заново'}
          alertMessageText={'У вас были уже ключи мы удалили имеющихся ключей'}
          displayPositiveButton={true}
          positiveButtonText={I18n.t('ok')}
          displayNegativeButton={false}
          negativeButtonText={'CANCEL'}
          onPressNegativeButton={keysDownloadPressed}
          onPressPositiveButton={keysDownloadPressed}
        />
        {modelWallet && (
          <KeysModal
            model={modelWallet}
            cancelPressed={() => seTmodelWallet(false)}
            themeReducer={{ isDark: false }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
