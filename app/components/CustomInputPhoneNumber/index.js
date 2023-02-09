/* eslint-disable react-native/no-inline-styles */
import React, { Fragment } from 'react';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Text } from 'react-native';
import styles from './styles';

const CustomInputPhoneNumber = props => {
  const { inputText, labelText, inputType = 'numeric', onChangeInput } = props;

  return (
    <Fragment>
      <Text style={styles.labelText}>{labelText}</Text>
      <FloatingLabelInput
        {...props.props}
        value={inputText}
        containerStyles={styles.containerStyle}
        labelStyles={styles.labelStyle}
        inputStyles={styles.inputStyle}
        onChangeText={value => onChangeInput(value)}
        mask={'+7 999 999 99 99'}
        keyboardType={'number-pad'}
      />
    </Fragment>
  );
};

export default CustomInputPhoneNumber;
