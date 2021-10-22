import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Avatar, IconButton, Badge } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import * as loginActions from 'app/store/actions/loginActions';
import ProfileEditModal from './profileEditModal';
import LocalizationModal from './localizationModal';
import PasswordEditModal from './passwordEditModal';
import AdressBookModal from './adressBookModal';
import DraftModal from './draftModal';
import ArchiveModal from './archiveModal';
import styles from './styles';

interface IState {
  navigation: any;
}

const ProfileScreen: React.FC<IState> = ({ navigation }: IState) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(loginActions.logOut());

  const goToProfile = () => {};
  const [model, setmodel] = useState(false);
  const [modelProfileEdit, seTmodelProfileEdit] = useState(false);
  const [modelLocalization, seTmodelLocalization] = useState(false);
  const [modelEditPassword, seTmodelEditPassword] = useState(false);
  const [modelAdressBook, seTmodelAdressBook] = useState(false);
  const [modelDraft, seTmodelDraft] = useState(false);
  const [modelArchive, seTmodelArchive] = useState(false);

  const modelOpen = () => {
    setmodel(!model);
  };

  const onLogout = () => {
    setmodel(true);
  };

  const modelOkPressed = (params: any) => {
    console.log('params: ', params);
  };

  const modelPressed = () => {
    setmodel(false);
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.profileHeaderText}>Профиль</Text>
        <View>
          <IconButton icon="bell-outline" size={35} onPress={goToProfile} />
          <Badge style={styles.badgeStyle}>3</Badge>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <Avatar.Image size={65} source={require('../../assets/gubin.png')} />
        <View style={styles.profileNameSurname}>
          <Text>Aлександр Грачев</Text>
          <Text>Москва, Россия</Text>
        </View>
      </View>
      <View style={styles.buttonMenuContainer}>
        <Button
          color="#000"
          onPress={() => seTmodelProfileEdit(!modelProfileEdit)}
          uppercase={false}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Редактировать Профиль
        </Button>
        <Button
          color="#000"
          onPress={() => seTmodelLocalization(!modelLocalization)}
          uppercase={false}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Выбор локализации
        </Button>
        <Button
          color="#000"
          onPress={() => seTmodelEditPassword(!modelEditPassword)}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Изменить пароль
        </Button>
        <Button
          color="#000"
          onPress={() => seTmodelAdressBook(!modelAdressBook)}
          uppercase={false}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Адресная книга
        </Button>

        <Button
          color="#000"
          onPress={() => seTmodelDraft(!modelDraft)}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Черновики
        </Button>
        <Button
          color="#000"
          onPress={() => seTmodelArchive(!modelArchive)}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Архив
        </Button>
        <Button
          color="#B82424"
          onPress={onLogout}
          uppercase={false}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Выйти
        </Button>
      </View>
      <ProfileEditModal
        okPressed={modelOkPressed}
        model={modelProfileEdit}
        noPressed={() => seTmodelProfileEdit(false)}
      />

      <LocalizationModal
        okPressed={modelOkPressed}
        model={modelLocalization}
        noPressed={() => seTmodelLocalization(false)}
      />

      <PasswordEditModal
        okPressed={modelOkPressed}
        model={modelEditPassword}
        noPressed={() => seTmodelEditPassword(false)}
      />

      <AdressBookModal
        okPressed={modelOkPressed}
        model={modelAdressBook}
        noPressed={() => seTmodelAdressBook(false)}
      />

      <DraftModal
        okPressed={modelOkPressed}
        model={modelDraft}
        noPressed={() => seTmodelDraft(false)}
      />

      <ArchiveModal
        okPressed={modelOkPressed}
        model={modelArchive}
        noPressed={() => seTmodelArchive(false)}
      />

      <Modal isVisible={model}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
          }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Вы действительно хотите выйти ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button onPress={() => setmodel(false)}>
              <Text>Нет</Text>
            </Button>
            <Button onPress={modelPressed}>
              <Text style={{ color: 'red' }}>Да</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
