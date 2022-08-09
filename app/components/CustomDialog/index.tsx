import React, {
  Fragment,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import styles from './styles';
import I18n from '../../../i18';
import Validation from '../validation';
import Utility from '../../utils/Utility';
import F4Context from '../../context/f4_context';

const CustomDialog = ({ title, visible, setvisible }: any) => {
  return (
    <Fragment>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setvisible(false)}>
          <Dialog.Title>
            {title.length < 10 ? `${I18n.t('cost')} ` : ''}
            {title}
            {title.length < 10 ? '$' : ''}
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setvisible(false)}>{I18n.t('ok')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default CustomDialog;
