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
    phone: '',
  };
  const [user, seTuser] = useState({ ...elements });

  const validationElements = {
    email: false,
    phone: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const handleChange = (val: string, fieldName: string) => {
    seTuser(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'email':
          varPr.email = val;
          break;
        case 'phone':
          varPr.phone = val;
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
    if (user.phone.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, phone: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, phone: false });
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
          <Text style={styles.modelHeaderText}>Редактирование профиля</Text>
          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>E-mail</Text>
            <HelperText
              style={styles.modelHelperText}
              type="error"
              visible={validObj.email}>
              Email недействителень!
            </HelperText>
          </View>
          <TextInput
            placeholder="example@100express.com"
            mode="outlined"
            onChangeText={val => handleChange(val, 'email')}
            right={<TextInput.Icon name={require('../../assets/email.png')} />}
            value={user.email}
          />

          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>Телефон</Text>
            <HelperText
              style={{
                alignItems: 'flex-end',
              }}
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
                style={{
                  flex: 1,
                  padding: 10,
                }}
                onChangeText={val => handleChange(val, 'phone')}
                placeholder="+ 7 (123) 123 12 34"
                value={user.phone}
              />
            )}
          />
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
