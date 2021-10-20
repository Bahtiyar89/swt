import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Avatar, IconButton, Badge } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import * as loginActions from 'app/store/actions/loginActions';

interface IState {
  navigation: any;
}

const ProfileScreen: React.FC<IState> = ({ navigation }: IState) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(loginActions.logOut());

  const goToProfile = () => {};
  const [model, setmodel] = useState(false);
  const onLogout = () => {
    setmodel(true);
  };
  const modelPressed = () => {
    setmodel(false);
    logout();
  };

  console.log('navigation:', navigation);
  return (
    <View
      style={{
        margin: 0,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '90%',
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 28,
          }}>
          Профиль
        </Text>
        <View>
          <IconButton
            style={{}}
            icon="bell-outline"
            size={35}
            onPress={goToProfile}
          />
          <Badge
            style={{
              position: 'absolute',
              top: 16,
              right: 14,
            }}>
            3
          </Badge>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          width: '90%',
        }}>
        <Avatar.Image size={65} source={require('../../assets/gubin.png')} />
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'column',
          }}>
          <Text>Aлександр Грачев</Text>
          <Text>Москва, Россия</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 20,
          flexDirection: 'column',
          width: '90%',
        }}>
        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
          uppercase={false}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Редактировать Профиль
        </Button>
        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Выбор локализации
        </Button>
        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Изменить пароль
        </Button>
        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Адресная книга
        </Button>

        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
          uppercase={false}
          style={{}}
          icon="chevron-right"
          contentStyle={{ flexDirection: 'row-reverse' }}>
          Черновики
        </Button>
        <Button
          color="#000"
          onPress={() => console.log('Pressed')}
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
              <Text style={{}}>Нет</Text>
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
