import React, { useState, useContext } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Dialog, Portal } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import DocumentPicker, {
  DirectoryPickerResponse,
  isInProgress,
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import { useToast } from 'react-native-toast-notifications';
import RNFS from 'react-native-fs';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../context/auth/AuthContext';
import Registration from '../Registration';
import CustomInput from 'app/components/CustomInput';
import DownloadSvg from '../../assets/DownloadSvg';
import warning from '../../utils/toastMessages/warning';
import success from '../../utils/toastMessages/success';
import styles from './styles';

const Login = props => {
  const toast = useToast();
  const { t } = useTranslation();
  const { navigation } = props;

  const [isModalVisible, setModalVisible] = useState(false);

  const authContext = useContext(AuthContext);
  const {
    signin,
    signOut,
    user /*loading*/,
    loading,
    postFileBalanceToCheck,
    balance,
    tokens,
    closeModel,
    modalBalanceErr,
  } = authContext;

  const handleChange = (val, fieldName) => {
    seTuserState(prev => {
      const varPr = { ...prev };
      switch (fieldName) {
        case 'username':
          varPr.pk = val;
          break;
        case 'password':
          varPr.sk = val;
          break;
      }
      return varPr;
    });
  };

  const validation = () => {
    let err = false;
    if (userState.pk.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, username: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, username: false });
      }, 1000);
      return err;
    }
    if (userState.sk.length < 3) {
      err = true;
      seTvalidObj({ ...validObj, password: true });
      setTimeout(() => {
        seTvalidObj({ ...validObj, password: false });
      }, 1000);
    }
    return err;
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const validationElements = {
    username: false,
    password: false,
  };

  const [userState, seTuserState] = useState({
    pk: '',
    sk: '',
  });
  const [validObj, seTvalidObj] = useState({ ...validationElements });

  const handleError = err => {
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

  const submit = async () => {
    const err = validation();
    if (err) {
      toast.show(t('t:repeatWrong'), warning);
    } else {
      postFileBalanceToCheck(userState);
    }
  };

  const navigateToRegistration = () => {
    closeModel();
    navigation.navigate('Registration');
  };

  const uploadFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.allFiles,
      });

      [pickerResult].map(async item => {
        toast.show(t('t:attached_succesfull'), success);
        await RNFS.readFile(item.fileCopyUri, 'utf8')
          .then(data => {
            console.log('data::: ', data);

            seTuserState(JSON.parse(data));
            //  postFileBalanceToCheck(JSON.parse(data));
          })
          .catch(error => {
            toast.show(t('t:attache_again'), warning);
          });
      });
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={t('t:loading')}
        textStyle={{ color: '#3498db' }}
      />
      <Text style={styles.signInText}>{t('t:authorization')}</Text>
      <View style={{ width: '90%' }}>
        <CustomInput
          valtext={t('t:pkey')}
          visible={validObj.username}
          valErrText={t('t:field_not_be_empty')}
          inputLabel={t('t:name')}
          value={userState.pk}
          onChangeInput={val => handleChange(val, 'username')}
          placeholder="FLSXfhuXoZb8azzHgUN9Dt3HEup4FYndbwEHx7jmGpht"
        />

        <CustomInput
          valtext={t('t:skey')}
          visible={validObj.username}
          valErrText={t('t:field_not_be_empty')}
          inputLabel={t('t:name')}
          value={userState.sk}
          onChangeInput={val => handleChange(val, 'password')}
          placeholder="FLSXfhuXoZb8azzHgUN9Dt3HEup4FYndbwEHx7jmGpht"
        />

        <TouchableOpacity onPress={uploadFile} style={styles.uploadBtn}>
          <DownloadSvg />
          <Text style={styles.btnText}>{t('t:choose_file')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={submit} style={styles.uploadBtn}>
          <Text style={styles.btnText}>{t('t:enter')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={styles.tBtn}>
          <Text style={styles.textRegist}>{t('t:registration')}</Text>
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog visible={modalBalanceErr}>
          <Dialog.Content>
            <Text style={styles.notRegist}>{t('t:notRegistered')}</Text>
            <TouchableOpacity
              onPress={navigateToRegistration}
              style={styles.tBtn}>
              <Text style={styles.textRegist}>{t('t:registration')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={closeModel} style={styles.tBtn}>
              <Text style={styles.textRegist}>{t('t:repeat')}</Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Registration
        isVisible={isModalVisible}
        setVisible={() => setModalVisible(!isModalVisible)}
      />
    </SafeAreaView>
  );
};

export default Login;
