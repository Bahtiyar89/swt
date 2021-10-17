import React, { useState } from 'react';
import { View, Image, ScrollView, SafeAreaView } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Checkbox,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text';
import { useToast } from 'react-native-toast-notifications';

import * as loginActions from 'app/store/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';

interface IState {
  loginReducer: ILoginState;
}

const Registration: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = useSelector((state: IState) => state.loginReducer.id);
  const dispatch = useDispatch();
  const onLogin = () => dispatch(loginActions.requestLogin('test', '1234'));
  const onForgot = () => NavigationService.navigate('ForgotPassword');

  const toast = useToast();
  const elements = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };
  const [user, seTuser] = useState({ ...elements });

  const validationElements = {
    name: false,
    email: false,
    password: false,
    password_confirm: false,
    phone: false,
    chebox: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const [password_confirm, seTpassword_confirm] = useState('');
  const [passwordShow, seTpasswordShow] = useState(true);
  const [passwordConfirmShow, seTpasswordConfirmShow] = useState(true);
  const [checked, setChecked] = React.useState(false);
  const [model, setmodel] = React.useState(false);

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'name':
          varPr.name = val;
          break;
        case 'email':
          varPr.email = val;
          break;
        case 'phone':
          varPr.phone = val;
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
    if (user.name.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, name: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, name: false });
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

    if (user.phone.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, phone: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, phone: false });
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

  const submit = () => {
    const err = validation();
    console.log('err...', JSON.stringify(err));
    console.log('user...', JSON.stringify(validObj));
    if (err) {
      toast.show('Было ошибка повторите заново');
    } else {
      toast.show('Вы успешно зарегистрированы');
      NavigationService.navigate('Login');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.signInText}>Регистрация</Text>
          <View style={{ flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Имя Фамилия Отчество</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.name}>
              Введите И.Ф.О
            </HelperText>
          </View>

          <TextInput
            placeholder="Иванов Иван Иванович"
            mode="outlined"
            style={styles.textInput}
            onChangeText={val => handleChange(val, 'name')}
            value={user.name}
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
              visible={validObj.phone}>
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
                onChangeText={val => handleChange(val, 'phone')}
                placeholder="+ 7 (123) 123 12 34"
                value={user.phone}
              />
            )}
            style={styles.textInput}
          />

          <View style={{ marginTop: 10, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Пароль</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.password}>
              Неправельный пароль!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder="Введите пароль"
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

          <View style={{ marginTop: 10, flexDirection: 'row', width: '90%' }}>
            <Text style={{ flex: 1 }}>Повторный Пароль</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.password_confirm}>
              Пароль не совпадают!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder="Введите повторный пароль"
            style={styles.textInput}
            onChangeText={val => seTpassword_confirm(val)}
            right={
              <TextInput.Icon
                onPress={() => seTpasswordConfirmShow(!passwordConfirmShow)}
                name={require('../../assets/padlock_repeate.png')}
              />
            }
            secureTextEntry={passwordConfirmShow}
            value={password_confirm}
          />

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
            style={{ width: '90%', marginTop: 20, backgroundColor: '#333333' }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
