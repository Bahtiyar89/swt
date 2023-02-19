import React from 'react';
import { TextInput } from 'react-native-paper';

import Validation from '../validation';
import { View } from 'react-native';

const CustomInput = props => {
  const {
    valtext,
    visible,
    valErrText,
    inputLabel,
    onChangeInput,
    value,
    placeholder,
  } = props;

  return (
    <View style={{ width: '100%' }}>
      <Validation text={valtext} visible={visible} errText={valErrText} />
      <TextInput
        placeholder={placeholder ? placeholder : ''}
        label={''}
        mode="outlined"
        onChangeText={val => onChangeInput(val)}
        value={value}
      />
    </View>
  );
};

export default CustomInput;
