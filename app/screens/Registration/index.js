import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Checkbox,
} from 'react-native-paper';

import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import basex from 'bs58-rn';
import Sodium from 'react-native-sodium';
import Buffer from 'buffer';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

//import * as loginActions from 'app/store/actions/loginActions';
import AuthContext from '../../context/auth/AuthContext';
//import NavigationService from 'app/navigation/NavigationService';
import Colors from '../../utils/Сolors';
import styles from './styles';

const Registration = props => {
  const { setVisible, isVisible } = props;
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const { loading, register, postRegisterBalanceToCheck, RegisterNewUser } =
    authContext;
  const toast = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const id = useSelector((state: IState) => state.loginReducer.id);
  //const dispatch = useDispatch();
  //const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  //const onForgot = () => NavigationService.navigate('RestoreAccount');

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
      toast.show(<>{t('t:agreement_checked')}</>, {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else if (walletKeys.pk.length < 10 || walletKeys.sk.length < 10) {
      toast.show(<>{t('t:generate_keys')}</>, {
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
    <Modal
      backdropColor={Colors.white}
      style={{ backgroundColor: Colors.white }}
      isVisible={isVisible}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Spinner
              visible={loading}
              textContent={t('t:loading')}
              textStyle={{ color: '#3498db' }}
            />
            <Text style={styles.signInText}>{t('t:register')}</Text>
            {/************************************************* NAME ROW */}
            <Text style={styles.title}>{t('t:name')}</Text>
            <TextInput
              placeholder={'Иван'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.firstName}
              onChangeText={val => seTnewUser({ ...newUser, firstName: val })}
            />
            {/************************************************* USERNAME ROW */}
            <Text style={styles.title}>{t('t:surname')}</Text>
            <TextInput
              placeholder={'Иванов'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.lastName}
              onChangeText={val => seTnewUser({ ...newUser, lastName: val })}
            />
            {/************************************************* MIDDLENAME ROW */}
            <Text style={styles.title}>{t('t:middlename')}</Text>
            <TextInput
              placeholder={'Иванович'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.middleName}
              onChangeText={val => seTnewUser({ ...newUser, middleName: val })}
            />
            <Text style={styles.title}>{t('t:phone')}</Text>
            <TextInput
              placeholder={'+7 777 777 7789'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.phone}
              onChangeText={val => seTnewUser({ ...newUser, phone: val })}
            />
            {/************************************************* EMAIL ROW */}
            <Text style={styles.title}>{t('t:email')}</Text>
            <TextInput
              placeholder={'email@express.com'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.email}
              onChangeText={val => seTnewUser({ ...newUser, email: val })}
            />
            {/************************************************* Store ROW */}
            <Text style={styles.title}>{'NAME STORE/ COMPANY'}</Text>
            <TextInput
              placeholder={'Добрянка'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.comp_st_name}
              onChangeText={val =>
                seTnewUser({ ...newUser, comp_st_name: val })
              }
            />

            {/************************************************* Store link ROW */}
            <Text style={styles.title}>{'Link to store'}</Text>
            <TextInput
              placeholder={'linkexample.com'}
              mode="outlined"
              style={styles.textInput}
              value={newUser.store_link}
              onChangeText={val => seTnewUser({ ...newUser, store_link: val })}
            />
            <Button
              icon="lead-pencil"
              style={styles.pencil}
              disabled={
                walletKeys.pk.length === 44 && walletKeys.sk.length === 88
              }
              onPress={generateKeys}
              mode="contained">
              <Text style={styles.generate}>{t('t:generateKeys')}</Text>
            </Button>

            <View style={styles.keys}>
              <Text style={{ flex: 1 }}>{t('t:pkey')}</Text>
            </View>
            <TextInput
              editable={false}
              placeholder={t('t:skey')}
              mode="outlined"
              style={styles.textInput}
              value={walletKeys.pk}
            />
            <View style={styles.keys}>
              <Text style={{ flex: 1 }}>{t('t:skey')}</Text>
            </View>
            <TextInput
              editable={false}
              placeholder={t('t:skey')}
              mode="outlined"
              style={styles.textInput}
              value={walletKeys.sk}
            />

            <View style={styles.check}>
              <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color={'#397AF9'}
              />

              <TouchableOpacity style={styles.checkButton}>
                <Text style={styles.checkText}>
                  {t('t:agreement')} {t('t:personal_data')}
                </Text>
              </TouchableOpacity>
            </View>
            <Button style={styles.regButton} mode="contained" onPress={submit}>
              <Text style={styles.buttonText}>{t('t:registration')}</Text>
            </Button>
            <Button
              style={styles.regButton}
              mode="contained"
              onPress={setVisible}>
              <Text style={styles.buttonText}>{t('t:wentlogin')}</Text>
            </Button>
          </View>
          <Modal isVisible={model}>
            <View style={{ backgroundColor: 'white' }}>
              <Text>{t('t:personal_information')}</Text>
              <Text>{t('t:personal_information')}</Text>
              <Text>{t('t:personal_information')}</Text>
              <Button mode="contained" onPress={() => setmodel(false)}>
                <Text style={styles.buttonText}>{t('t:continue')}</Text>
              </Button>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

Registration.propTypes = {
  setVisible: PropTypes.object,
};

Registration.defaultProps = {
  setVisible: {},
};
Registration.propTypes = {
  isVisible: PropTypes.object,
};

Registration.defaultProps = {
  isVisible: {},
};
export default Registration;
