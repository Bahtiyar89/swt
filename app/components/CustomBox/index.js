import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const CustomBox = ({
  countOptHandler,
  setNotificationSize,
  setNotificationSizeText,
  image,
  boxSizeText,
  countOptSizeText,
  size,
  kg,
}) => {
  const toast = useToast();
  const { t } = useTranslation();

  return (
    <View style={styles.boxWrapper}>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => countOptHandler(kg, countOptSizeText)}>
          <Image source={image} style={styles.imageSize} />
        </TouchableOpacity>
        <View style={{ padding: 5 }}>
          <Text onPress={() => countOptHandler(kg)}>
            {t('t:size') + boxSizeText}
          </Text>
          <Text
            onPress={() => countOptHandler(kg, countOptSizeText)}
            style={{ color: '#00000088' }}>
            {size} cм
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: '#00000088', marginRight: 3 }}>
          {t('t:up_to')} {kg + t('t:kg')}
        </Text>
        <TouchableOpacity
          onPress={() => setNotificationSize(setNotificationSizeText)}>
          <Image
            source={require('../../assets/exclamation-mark.png')}
            style={styles.questionMark}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomBox;
