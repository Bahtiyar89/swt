import React, { useRef, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Button, Avatar, IconButton, Badge } from 'react-native-paper';
//import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-notifications';

import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import styles from './styles';
import Utility from '../../utils/Utility';
import I18n from '../../../i18';

//import * as loginActions from 'app/store/actions/loginActions';
import ProfileEditModal from './profileEditModal';
import LocalizationModal from './localizationModal';
import KeysModal from './keys';
import GoodsContext from '../../context/goods/GoodsContext';
import F4Context from '../../context/f4_context';

interface IState {
  navigation: any;
}

const ProfileScreen: React.FC<IState> = ({ navigation }: IState) => {
  const f4Context = useContext(F4Context);
  const { changeAppLanguage } = f4Context;
  const authContext = useContext(AuthContext);
  const { signOut, file, user, isSigned } = authContext;

  const goodsContext = useContext(GoodsContext);
  const { postBalanceToCheck, addBalance, userBalance, loading } = goodsContext;
  const toastRef = useRef<any>();
  const [lang, seTlang] = useState('');

  useEffect(() => {
    Utility.getDeviceLanguageFromStorage()
      .then(lang => {
        console.log('lang:: ', lang);

        I18n.locale = lang;
        seTlang(lang);
      })
      .catch(_ => {
        console.log('err ', 'lang');
      });
    return () => {};
  }, []);
  console.log(' I18n.locale: ', I18n.locale);

  const goToProfile = () => {};
  const [model, setmodel] = useState(false);
  const [modelProfileEdit, seTmodelProfileEdit] = useState(false);
  const [modelLocalization, seTmodelLocalization] = useState(false);
  const [modelBalance, seTmodelBalance] = useState(false);
  const [modelWallet, seTmodelWallet] = useState(false);

  const onLogout = () => {
    setmodel(true);
  };

  const modelOkPressed = (params: any) => {
    console.log('params: ', params);
  };

  const modelLogOutPressed = () => {
    setmodel(false);
    signOut();
  };

  const updateLanguageStorage = () => {
    Utility.updateDeviceLanguageToStorage(lang);
    I18n.locale = lang;
    changeAppLanguage(lang);
    seTmodelLocalization(false);
  };

  const onChangeLanguage = (language: string) => {
    seTlang(language);
  };

  const replenishBalance = () => {
    if (userBalance.balance > 0.5) {
      toastRef.current.show(I18n.t('you_cannot_top_up_the_balance'), {
        type: 'warning',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      seTmodelBalance(false);
      addBalance(file);
    }
  };
  const getBalance = () => {
    postBalanceToCheck(file);
    seTmodelBalance(!modelBalance);
  };

  return (
    <>
      {isSigned ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              <Spinner
                visible={loading}
                textContent={I18n.t('loading')}
                textStyle={{ color: '#3498db' }}
              />
              <View style={styles.mainHeader}>
                <Text style={styles.profileHeaderText}>
                  {I18n.t('profile')}
                </Text>
                <View>
                  <IconButton
                    icon="bell-outline"
                    size={35}
                    onPress={goToProfile}
                  />
                  <Badge style={styles.badgeStyle}>3</Badge>
                </View>
              </View>
              <View style={styles.profileHeaderContainer}>
                <Avatar.Image
                  size={65}
                  source={require('../../assets/gubin.png')}
                />
                <View style={styles.profileNameSurname}>
                  <Text>{user?.fio}</Text>
                  <Text>
                    {I18n.t('city')}, {I18n.t('country')}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonMenuContainer}>
                <Button
                  color="#000"
                  onPress={() => seTmodelProfileEdit(!modelProfileEdit)}
                  uppercase={false}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {I18n.t('profile_edit')}
                </Button>
                <Button
                  color="#000"
                  onPress={() => seTmodelLocalization(!modelLocalization)}
                  uppercase={false}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {I18n.t('choose_localization')}
                </Button>

                {/*}
                <Button
                  color="#000"
                  onPress={getBalance}
                  uppercase={false}
                  style={{}}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {I18n.t('balance')}
      </Button>*/}
                <Button
                  color="#000"
                  onPress={() => seTmodelWallet(!modelWallet)}
                  uppercase={false}
                  style={{}}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {I18n.t('keys')}
                </Button>

                <Button
                  style={{ marginBottom: 10 }}
                  color="#B82424"
                  onPress={onLogout}
                  uppercase={false}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {I18n.t('logout')}
                </Button>
              </View>
              <ProfileEditModal
                okPressed={modelOkPressed}
                model={modelProfileEdit}
                noPressed={() => seTmodelProfileEdit(false)}
              />

              <LocalizationModal
                okPressed={updateLanguageStorage}
                onChangeLanguage={onChangeLanguage}
                model={modelLocalization}
                lang={lang}
                noPressed={() => seTmodelLocalization(false)}
              />

              {modelWallet && (
                <KeysModal
                  model={modelWallet}
                  cancelPressed={() => seTmodelWallet(false)}
                  themeReducer={{ isDark: false }}
                />
              )}

              <Modal isVisible={modelBalance}>
                <Toast placement="top" ref={toastRef} />
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                  }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {I18n.t('your_balance')}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                      marginTop: 5,
                    }}>
                    {userBalance?.balance}
                  </Text>
                  <Button
                    style={{
                      marginTop: 10,
                      backgroundColor: '#333333',
                    }}
                    mode="contained"
                    onPress={replenishBalance}>
                    <Text style={{ color: '#d9d9d9' }}>
                      {I18n.t('replenish_the_balance')}
                    </Text>
                  </Button>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Button onPress={() => seTmodelBalance(false)}>
                      <Text>{I18n.t('discard')}</Text>
                    </Button>
                  </View>
                </View>
              </Modal>

              <Modal isVisible={model}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                  }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {I18n.t('want_logout')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Button onPress={() => setmodel(false)}>
                      <Text>{I18n.t('no')}</Text>
                    </Button>
                    <Button onPress={modelLogOutPressed}>
                      <Text style={{ color: 'red' }}>{I18n.t('yes')}</Text>
                    </Button>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Login navigation={navigation} />
      )}
    </>
  );
};

export default ProfileScreen;
