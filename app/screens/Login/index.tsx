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
import Validation from '../../components/validation'

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
  //const onForgot = () => NavigationService.navigate('RestoreAccount');
  // const onRegistration = () => NavigationService.navigate('Registration');
  const onRegistration = () => navigation.navigate('Registration');
  const onRestoreAccount = () => navigation.navigate('RestoreAccount');

  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const authContext = useContext(AuthContext);
  const { signin, signOut, user, loading } = authContext;

  const validationElements = {
    username: false,
    password: false,
  };

  const [userState, seTuserState] = useState({
    data: {
      username: '',
      password: '',
    },
  });
  const [validObj, seTvalidObj] = useState({ ...validationElements });
  const [passwordShow, seTpasswordShow] = useState(true);

  const handleChange = (val: string, fieldName: string) => {
    seTuserState(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'username':
          varPr.data.username = val;
          break;
        case 'password':
          varPr.data.password = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (userState.data.username.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, username: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, username: false });
      }, 1000);
      return err;
    }
    if (userState.data.password.length < 3) {
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
    console.log(userState);

    if (err) {
    } else {
      signin(userState);
      //  onLogin();
    }
  };

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
          <View style={{width: '90%'}}>
            <Validation
              text={'Имя пользователя'}
              visible={validObj.username}
              errText={I18n.t('incorrect_username')}
            />
          </View>

          <TextInput
            placeholder="Максим"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'username')}
            right={<TextInput.Icon name={require('../../assets/email.png')} />}
            value={userState.data.username}
          />
          <View style={{width: '90%', marginTop: 20}}>
            <Validation
              text={I18n.t('password')}
              visible={validObj.password}
              errText={I18n.t('password_wrong')}
            />
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
            value={userState.data.password}
          />

          <Button
            style={{ width: '90%', marginTop: 20, backgroundColor: '#333333' }}
            mode="contained"
            onPress={submit}>
            <Text style={styles.buttonText}>{I18n.t('enter')}</Text>
          </Button>
          <View style={styles.floatLeft_right}>
            <Button
              uppercase={false}
              mode="text"
              onPress={onRegistration}>
              {I18n.t('registration')}
            </Button>
            <Button
              uppercase={false}
              mode="text"
              onPress={onRestoreAccount}>
              {I18n.t('restore_account')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
