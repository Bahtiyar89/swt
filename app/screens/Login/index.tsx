import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';
import { IThemeState } from 'app/models/reducers/theme';
import AuthContext from '../../context/auth/AuthContext';
import I18n from '../../../i18';

interface IState {
  loginReducer: ILoginState;
  themeReducer: IThemeState;
}

interface IProps {
  navigation: any;
}

const Login: React.FC<IProps> = (props: IProps) => {
  const { navigation } = props;

  // const id = useSelector((state: IState) => state.loginReducer.id);
  //const dispatch = useDispatch();
  // const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  //const onForgot = () => NavigationService.navigate('ForgotPassword');
  // const onRegistration = () => NavigationService.navigate('Registration');
  const onRegistration = () => navigation.navigate('Registration');

  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const authContext = useContext(AuthContext);
  const { signin, signOut, loading } = authContext;
  const elements = {
    email: '',
    password: '',
  };

  const validationElements = {
    email: false,
    password: false,
  };

  const [user, seTuser] = useState({ ...elements });
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [passwordShow, seTpasswordShow] = useState(true);

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'email':
          varPr.email = val;
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
    if (!user.email.includes('@')) {
      err = true;
      seTvalidObj({ ...validObj, email: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, email: false });
      }, 1000);
      return err;
    }
    if (user.password.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, password: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, password: false });
      }, 1000);
    }
    return err;
  };

  const submit = () => {
    const err = validation();
    if (err) {
    } else {
      signin(user);
      //  onLogin();
    }
  };
  console.log('loading:', loading);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Spinner
            visible={loading}
            textContent={'Загружается...'}
            textStyle={{ color: '#3498db' }}
          />
          <Text style={styles.signInText}>{I18n.t('authorization')}</Text>
          <View style={{ flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>E-mail</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.email}>
              {I18n.t('incorrect_email')}
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
          <View style={{ marginTop: 20, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>{I18n.t('password')}</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.password}>
              {I18n.t('password_wrong')}!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder={I18n.t('password_enter')}
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                onPress={() => seTpasswordShow(!passwordShow)}
                name={require('../../assets/padlock.png')}
              />
            }
            secureTextEntry={passwordShow}
            value={user.password}
          />

          <Button
            style={{ width: '90%', marginTop: 20, backgroundColor: '#333333' }}
            mode="contained"
            onPress={submit}>
            <Text style={styles.buttonText}>{I18n.t('enter')}</Text>
          </Button>
          <Button
            mode="text"
            style={styles.forgot}
            labelStyle={styles.labelStyle}
            onPress={onRegistration}>
            {I18n.t('registration')}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
