import React, { useContext } from 'react';
import { View, Button, StatusBar } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeController from '../components/ThemeController';
import AuthContext from '../context/auth/AuthContext';

import Login from 'app/screens/Login';
import Home from 'app/screens/Home';
import RestoreAccount from 'app/screens/RestoreAccount';
import Registration from '../screens/Registration';
import TimerController from '../components/TimerController';
import PaymentScreen from 'app/screens/PaymentScreen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

const LoggedInNavigator = () => {
  return (
    <LoggedInStack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          //headerShown: false,
          headerRight: () => <ThemeController />,
          headerLeft: () => <TimerController />,
        }}
        component={Home}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
    </LoggedInStack.Navigator>
  );
};

interface IProps {
  theme: Theme;
}
const Navigation: React.FC<IProps> = (props: IProps) => {
  const authContext = useContext(AuthContext);
  const { isSigned, signOut, user } = authContext;
  const { theme } = props;

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={LoggedInNavigator}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Профиль',
            headerRight: () => <ThemeController />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: 'Регистрация',
            headerRight: () => <ThemeController />,
          }}
        />
        <Stack.Screen
          name="RestoreAccount"
          component={RestoreAccount}
          options={{
            title: 'Восстановить',
            headerRight: () => <ThemeController />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
