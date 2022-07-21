import React, { useState, useContext } from 'react';
import { View, ScrollView, SafeAreaView, Platform } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Checkbox,
} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
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
  const { loading, register, postRegisterBalanceToCheck, RegisterNewUser } =
    authContext;
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

  const elements = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    comp_st_name: '',
    store_link: '',
  };

  const [newUser, seTnewUser] = useState({ ...elements });

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
      const columns = [
        {
          name: 'firstName',
          valString: newUser.firstName,
        },
        {
          name: 'lastName',
          valString: newUser.lastName,
        },
        {
          name: 'middleName',
          valString: newUser.middleName,
        },
        {
          name: 'email',
          valString: newUser.email,
        },
        {
          name: 'phone',
          valString: newUser.phone,
        },
        {
          name: 'comp_st_name',
          valString: newUser.comp_st_name,
        },
        {
          name: 'store_link',
          valString: newUser.store_link,
        },
      ];

      postRegisterBalanceToCheck(walletKeys, navigation, columns, newUser);
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
  console.log('loading: ', loading);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Загружается...'}
            textStyle={{ color: '#3498db' }}
          />
          <Text style={styles.signInText}>{I18n.t('register')}</Text>
          {/************************************************* NAME ROW */}
          <Text style={{ width: '90%' }}>{I18n.t('name')}</Text>
          <TextInput
            placeholder={'Иван'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.firstName}
            onChangeText={val => seTnewUser({ ...newUser, firstName: val })}
          />
          {/************************************************* USERNAME ROW */}
          <Text style={{ marginTop: 5, width: '90%' }}>
            {I18n.t('surname')}
          </Text>
          <TextInput
            placeholder={'Иванов'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.lastName}
            onChangeText={val => seTnewUser({ ...newUser, lastName: val })}
          />
          {/************************************************* MIDDLENAME ROW */}
          <Text style={{ marginTop: 5, width: '90%' }}>
            {I18n.t('middlename')}
          </Text>
          <TextInput
            placeholder={'Иванович'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.middleName}
            onChangeText={val => seTnewUser({ ...newUser, middleName: val })}
          />
          <Text style={{ marginTop: 5, width: '90%' }}>{I18n.t('phone')}</Text>
          <TextInput
            placeholder={'+7 777 777 7789'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.phone}
            onChangeText={val => seTnewUser({ ...newUser, phone: val })}
          />
          {/************************************************* EMAIL ROW */}
          <Text style={{ marginTop: 5, width: '90%' }}>{I18n.t('email')}</Text>
          <TextInput
            placeholder={'email@express.com'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.email}
            onChangeText={val => seTnewUser({ ...newUser, email: val })}
          />
          {/************************************************* Store ROW */}
          <Text style={{ marginTop: 5, width: '90%' }}>
            {'NAME STORE/ COMPANY'}
          </Text>
          <TextInput
            placeholder={'Добрянка'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.comp_st_name}
            onChangeText={val => seTnewUser({ ...newUser, comp_st_name: val })}
          />

          {/************************************************* Store link ROW */}
          <Text style={{ marginTop: 5, width: '90%' }}>{'Link to store'}</Text>
          <TextInput
            placeholder={'linkexample.com'}
            mode="outlined"
            style={styles.textInput}
            value={newUser.store_link}
            onChangeText={val => seTnewUser({ ...newUser, store_link: val })}
          />
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
