import React from 'react';

import { Button, Dialog, Portal } from 'react-native-paper';

import styles from './styles';
import I18n from '../../../i18';

const CustomNotify = ({ visible, title, setvisible }: any) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setvisible(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => setvisible(false)}>{I18n.t('ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CustomNotify;
