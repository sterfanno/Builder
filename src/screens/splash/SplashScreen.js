import React, {useEffect} from 'react';
import {Image, Text, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

export default function SplashScreen(props) {
  //Definição do tempo mínimo para a apresentação da SplashScreen: timeout
  useEffect(() => {
    setTimeout(() => {
      const reset = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})], //Navegação para a tela principal.
      });
      props.navigation.dispatch(reset);
    }, 2000);
  }, [props.navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../assets/sunny.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbc4d4',
  },
  image: {
    width: 250,
    height: 250,
  },
});
