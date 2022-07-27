/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications';
import F4State from './context/f4_state';
import AuthState from './context/auth/AuthState';
import GoodsState from './context/goods/GoodsState';
import F4Context from './context/f4_context';
import {
  PaperThemeDefault,
  PaperThemeDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from 'app/config/theme-config';
import configureStore from 'app/store';
import { IThemeState } from 'app/models/reducers/theme';
import Navigation from './navigation/Navigation';

const { persistor, store } = configureStore();

interface IState {
  themeReducer: IThemeState;
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <Navigation theme={combinedTheme} />
    </PaperProvider>
  );
};

const EntryPoint: React.FC = () => {
  return (
    <ToastProvider placement="top" offsetTop={40}>
      <Provider store={store}>
        <F4State>
          <AuthState>
            <GoodsState>
              <PersistGate
                loading={<ActivityIndicator />}
                persistor={persistor}>
                <RootNavigation />
              </PersistGate>
            </GoodsState>
          </AuthState>
        </F4State>
      </Provider>
    </ToastProvider>
  );
};

export default EntryPoint;
