import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Button,
  Avatar,
  IconButton,
  Badge,
  HelperText,
  TextInput,
} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import styles from './styles';

interface IState {
  model: boolean;
  okPressed: (params: any) => void;
  noPressed: () => void;
}

const ProfileEditModal: React.FC<IState> = ({
  okPressed,
  noPressed,
  model,
}: IState) => {
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

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'email':
          varPr.email = val;
          break;
        case 'phone':
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

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed(user);
    }
  };

  return (
    <>
      <Modal isVisible={model}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelHeaderText}>Изменить пароль</Text>

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>Новый пароль</Text>
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
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                //    onPress={() => seTpasswordShow(!passwordShow)}
                name={require('../../assets/padlock.png')}
              />
            }
            //secureTextEntry={passwordShow}
            value={user.password}
          />

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>Старый пароль</Text>
            <HelperText
              style={{ alignItems: 'flex-end' }}
              type="error"
              visible={validObj.password}>
              Пароли не совпадают!
            </HelperText>
          </View>
          <TextInput
            mode="outlined"
            placeholder="Введите пароль"
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                //    onPress={() => seTpasswordShow(!passwordShow)}
                name={require('../../assets/padlock.png')}
              />
            }
            //secureTextEntry={passwordShow}
            value={user.password}
          />
          <TextInput
            mode="outlined"
            placeholder="Введите пароль"
            //style={styles.textInput}
            onChangeText={val => handleChange(val, 'password')}
            right={
              <TextInput.Icon
                // onPress={() => seTpasswordConfirmShow(!passwordConfirmShow)}
                name={require('../../assets/padlock_repeate.png')}
              />
            }
            //secureTextEntry={passwordShow}
            value={user.password}
          />

          <Text style={{ paddingTop: 10 }}>
            <Text style={{ fontWeight: '600' }}>Примечание:</Text> Пароль должен
            иметь не менее 6 символов и использовать строчные буквы, заглавные
            буквы и цифры
          </Text>

          <View style={styles.modelYesNo}>
            <Button onPress={() => noPressed()}>
              <Text style={styles.modelButtonNoColor}>Нет</Text>
            </Button>
            <Button onPress={() => onButtonPressed()}>
              <Text style={styles.modelButtonYesColor}>Да</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
