import React, { useRef, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Button, Avatar, IconButton, Badge } from 'react-native-paper';
//import { useDispatch } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

import AuthContext from '../../context/auth/AuthContext';
import Login from '../Login';
import styles from './styles';
import Utility from '../../utils/Utility';
import I18n from '../../../i18';
import PropTypes from 'prop-types';

//import * as loginActions from 'app/store/actions/loginActions';
import ProfileEditModal from './profileEditModal';
import AppLanguage from './AppLanguage';
import KeysModal from './keys';
import GoodsContext from '../../context/goods/GoodsContext';

interface IState {
  navigation: any;
}

const ProfileScreen: React.FC<IState> = ({ navigation }: IState) => {
  //const dispatch = useDispatch();
  //const logout = () => dispatch(loginActions.logOut());
  const authContext = useContext(AuthContext);
  const { signOut, file, user, isSigned } = authContext;
  const { t, i18n } = useTranslation();
  const goodsContext = useContext(GoodsContext);
  const { postBalanceToCheck, addBalance, userBalance, loading } = goodsContext;
  const toastRef = useRef<any>();
  const [lang, seTlang] = useState('');

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
    seTmodelLocalization(false);
    return i18n.changeLanguage(lang);
  };

  const replenishBalance = () => {
    if (userBalance.balance > 0.5) {
      toastRef.current.show(t('t:you_cannot_top_up_the_balance'), {
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

  const setLanguage = (code: any) => {
    seTlang(code);
    //return i18n.changeLanguage(code);
  };

  return (
    <>
      {isSigned ? (
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              <Spinner
                visible={loading}
                textContent={t('t:loading')}
                textStyle={{ color: '#3498db' }}
              />
              <View style={styles.mainHeader}>
                <Text style={styles.profileHeaderText}>{t('t:profile')}</Text>
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
                    {t('t:city')}, {t('t:country')}
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
                  {t('t:profile_edit')}
                </Button>
                <Button
                  color="#000"
                  onPress={() => seTmodelLocalization(!modelLocalization)}
                  uppercase={false}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {t('t:choose_localization')}
                </Button>

                {/*}
                <Button
                  color="#000"
                  onPress={getBalance}
                  uppercase={false}
                  style={{}}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {t('t:balance')}
      </Button>*/}
                <Button
                  color="#000"
                  onPress={() => seTmodelWallet(!modelWallet)}
                  uppercase={false}
                  style={{}}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {t('t:keys')}
                </Button>

                <Button
                  style={{ marginBottom: 10 }}
                  color="#B82424"
                  onPress={onLogout}
                  uppercase={false}
                  icon="chevron-right"
                  contentStyle={{ flexDirection: 'row-reverse' }}>
                  {t('t:logout')}
                </Button>
              </View>
              <ProfileEditModal
                okPressed={modelOkPressed}
                model={modelProfileEdit}
                noPressed={() => seTmodelProfileEdit(false)}
              />

              <AppLanguage
                okPressed={updateLanguageStorage}
                onChangeLanguage={setLanguage}
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
                    {t('t:your_balance')}
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
                      {t('t:replenish_the_balance')}
                    </Text>
                  </Button>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Button onPress={() => seTmodelBalance(false)}>
                      <Text>{t('t:discard')}</Text>
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
                    {t('t:want_logout')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Button onPress={() => setmodel(false)}>
                      <Text>{t('t:no')}</Text>
                    </Button>
                    <Button onPress={modelLogOutPressed}>
                      <Text style={{ color: 'red' }}>{t('t:yes')}</Text>
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

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

ProfileScreen.defaultProps = {
  navigation: {},
};

export default ProfileScreen;
