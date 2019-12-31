import React from 'react';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './src/screens/home/HomeScreen';
import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from './src/screens/splash/SplashScreen';

const RootStack = createStackNavigator(
  {
    Splash: SplashScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    portraitOnlyMode: true,
  },
);

export const Container = createAppContainer(RootStack);

export default function App() {
  return <Container />;
}
