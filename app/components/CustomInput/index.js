import React from 'react';
import { TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import Validation from '../validation';
import styles from './styles';
import { View } from 'react-native';

const CustomInput = props => {
  const { t } = useTranslation();
  const { valtext, visible, valErrText, inputLabel, onChangeInput, value } =
    props;

  return (
    <View style={{ width: '100%' }}>
      <Validation text={valtext} visible={visible} errText={valErrText} />
      <TextInput
        label={''}
        mode="outlined"
        onChangeText={val => onChangeInput(val)}
        value={value}
      />
    </View>
  );
};

export default CustomInput;
