import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/store/actions/loginActions';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';

import MainScreen from '../Main';
import CalculatorScreen from '../Calculator';
import MyShipmentsScreen from '../MyShipment';
import ChatScreen from '../Chat';
import ProfileScreen from '../Profile';
import styles from './styles';

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/home.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            tabBarLabel: 'Калкулятор',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/calculator.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="MyShipments"
          component={MyShipmentsScreen}
          options={{
            tabBarLabel: 'Мои отправления',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/my_shipment.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Чат',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/chat.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profilecreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/user-4.png')} //Change your icon image here
                style={{ height: 25, width: 25 }}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {/*<View style={styles.container}>
        <Button icon="logout" mode="outlined" onPress={onLogout}>
          Logout
        </Button>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
  */}
    </>
  );
};

export default Home;
