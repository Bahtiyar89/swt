import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DocumentPicker, {
  DirectoryPickerResponse,
  isInProgress,
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useToast } from 'react-native-toast-notifications';

import I18n from '../../../i18';
import NavigationService from 'app/navigation/NavigationService';
import { doGet, doPost } from '../../utils/apiActions';
import utility from '../../utils/Utility';
import styles from './styles';

interface IProps {
  navigation: any;
}

const RestoreAccount: React.FC<IProps> = (props: IProps) => {
  const { navigation } = props;
  const toast = useToast();
  //const goBack = () => NavigationService.goBack();
  const [result, setResult] =
    useState<
      Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
    >();
  const [path, seTpath] = useState('');
  const [balance, seTbalance] = useState('');
  const [loading, seTloading] = useState('');

  useEffect(() => {
    if (result instanceof Array) {
      result.map((item: any) => {
        toast.show('Ваш файл сохранен успешно', {
          type: 'success',
          duration: 4000,
          animationType: 'zoom-in',
        });
        seTpath(item.fileCopyUri);
      });
    }
  }, [result]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const doPostBalance = async (postData: any) => {
    //const token = await utility.getItem('token');
    const obj = JSON.parse(postData);
    const config = {
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {},
    };

    return await axios
      .post(
        'http://176.113.80.7:62000/api/Monitor/GetBalance/',
        {
          PublicKey: obj.pk,
          networkAlias: 'MainNet',
        },
        config,
      )
      .then(({ data }) => {
        console.log('data: ', data);
        toast.show('Ваш профиль востановлен', {
          type: 'success',
          duration: 4000,
          animationType: 'zoom-in',
        });
        seTbalance(data);
        utility.setItemObject('wkeys', obj);
        navigation.goBack();
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const readFile = async () => {
    const file = await RNFS.readFile(path, 'utf8');
    doPostBalance(file);
  };

  return (
    <View style={styles.container}>
      <Button
        icon="upload"
        style={{
          width: '90%',
          marginTop: 20,
          marginBottom: 30,
        }}
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'cachesDirectory',
              type: types.allFiles,
            });
            setResult([pickerResult]);
          } catch (e) {
            handleError(e);
          }
        }}
        mode="contained">
        <Text style={{ textAlign: 'center', color: '#000' }}>
          {I18n.t('choose_file')}
        </Text>
      </Button>
      <Button
        style={{
          width: '90%',
          marginTop: 20,
          marginBottom: 30,
          backgroundColor: '#333333',
        }}
        onPress={readFile}
        mode="contained">
        <Text style={{ color: 'white' }}>{I18n.t('upload')}</Text>
      </Button>
    </View>
  );
};

export default RestoreAccount;
