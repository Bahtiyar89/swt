import React from 'react';
import { View, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

interface IProps {
  text: any;
  visible: boolean;
  errText: string;
}
const Validation: React.FC<IProps> = (props: IProps) => {
  const { text, visible, errText } = props;

  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      <Text style={{ flex: 1 }}>{text}</Text>
      <HelperText
        style={{ alignItems: 'flex-end' }}
        type="error"
        visible={visible}>
        {errText}
      </HelperText>
    </View>
  );
};

export default Validation;
