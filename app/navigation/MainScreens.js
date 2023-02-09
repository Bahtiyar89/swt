import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import HomeSvg from 'app/assets/tabImages/HomeSvg';
import MainScreen from 'app/screens/Main';
import CalculatorScreen from 'app/screens/Calculator';
import MyShipmentsScreen from 'app/screens/MyShipment';
import ChatScreen from 'app/screens/Chat';
import ProfileScreen from 'app/screens/Profile';

const Tab = createBottomTabNavigator();

const MainScreens = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainScreenTab"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('t:main'),
          tabBarIcon: ({ focused }) => <HomeSvg focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('t:calculator'),
          tabBarIcon: () => (
            <Image
              source={require('../assets/calculator.png')} //Change your icon image here
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyShipments"
        component={MyShipmentsScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('t:shipments'),
          tabBarIcon: () => (
            <Image
              source={require('../assets/my_shipment.png')} //Change your icon image here
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('t:chat'),
          tabBarIcon: () => (
            <Image
              source={require('../assets/chat.png')} //Change your icon image here
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profilecreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('t:profile'),
          tabBarIcon: () => (
            <Image
              source={require('../assets/user.png')} //Change your icon image here
              style={{ height: 25, width: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainScreens;
