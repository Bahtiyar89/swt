import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Button,
  Avatar,
  IconButton,
  Badge,
  HelperText,
  TextInput,
  Checkbox,
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
  const [language, seTlanguage] = useState('');

  const validationElements = {
    email: false,
    phone: false,
  };

  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const validation = () => {
    let err = false;
    if (!language.includes('@')) {
      err = true;
      seTvalidObj({ ...validObj, email: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, email: false });
      }, 1000);
      return err;
    }
  };

  const onButtonPressed = () => {
    let err = validation();
    if (err) {
    } else {
      okPressed(language);
    }
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <Modal isVisible={model}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelHeaderText}>Выбор локализации</Text>
          <View style={styles.modelTextAndError}>
            <Text style={{ flex: 1 }}>Язык</Text>
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
            onChangeText={val => seTlanguage(val)}
            value={language}
          />

          <HelperText type="error" visible={validObj.email}>
            Введите номер телефона!
          </HelperText>

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Checkbox.Android
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={'#397AF9'}
            />
            <Text style={{ flex: 1 }}>
              По-умолчанию использовать Русский язык
            </Text>
          </View>

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
