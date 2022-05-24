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
import basex from 'bs58-rn';
import Sodium from 'react-native-sodium';
import Buffer from 'buffer';
import { useToast } from 'react-native-toast-notifications';

//import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import AuthContext from '../../context/auth/AuthContext';
//import NavigationService from 'app/navigation/NavigationService';
import I18n from '../../../i18';

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
  const toast = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const id = useSelector((state: IState) => state.loginReducer.id);
  //const dispatch = useDispatch();
  //const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  //const onForgot = () => NavigationService.navigate('RestoreAccount');

  const validationElements = {
    chebox: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const [checked, setChecked] = React.useState(false);
  const [model, setmodel] = React.useState(false);
  const [walletKeys, seTwalletKeys] = useState({
    sk: '',
    pk: '',
  });

  const submit = () => {
    if (!checked) {
      toast.show(I18n.t('agreement_checked'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else if (walletKeys.pk.length < 10 || walletKeys.sk.length < 10) {
      toast.show(I18n.t('generate_keys'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      postRegisterBalanceToCheck(walletKeys, navigation);
    }
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

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.signInText}>{I18n.t('register')}</Text>
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
              {I18n.t('generateKeys')}
            </Text>
          </Button>

          <View style={{ marginTop: 5, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>{I18n.t('pkey')}</Text>
          </View>
          <TextInput
            editable={false}
            placeholder={I18n.t('skey')}
            mode="outlined"
            style={styles.textInput}
            value={walletKeys.pk}
          />
          <View style={{ marginTop: 5, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>{I18n.t('skey')}</Text>
          </View>
          <TextInput
            editable={false}
            placeholder={I18n.t('skey')}
            mode="outlined"
            style={styles.textInput}
            value={walletKeys.sk}
          />

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
            }}>
            <View style={{ width: '10%' }}>
              <Checkbox.Android
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
              {I18n.t('agreement')}{' '}
              <Text style={{ color: '#397AF9' }} onPress={() => setmodel(true)}>
                {I18n.t('personal_data')}
              </Text>
            </Text>
          </View>
          <Button
            style={{
              width: '90%',
              marginTop: 20,
              marginBottom: 30,
              backgroundColor: '#333333',
            }}
            mode="contained"
            onPress={submit}>
            <Text style={styles.buttonText}>{I18n.t('registration')}</Text>
          </Button>
        </View>
        <Modal isVisible={model}>
          <View style={{ backgroundColor: 'white' }}>
            <Text>{I18n.t('personal_information')}</Text>
            <Text>{I18n.t('personal_information')}</Text>
            <Text>{I18n.t('personal_information')}</Text>
            <Button mode="contained" onPress={() => setmodel(false)}>
              <Text style={styles.buttonText}>{I18n.t('continue')}</Text>
            </Button>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
