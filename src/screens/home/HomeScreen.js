import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Button,
  Text,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getWeather} from '../../api/OpenWeather';
import Weather from '../../components/Weather';

export default function HomeScreen() {
  const [dataWeather, setDataWeather] = useState({});
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*Definição da função para requerer acesso à localização do dispositivo*/
    async function requestPermissions() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Habilitar Serviço de Localização',
            message: 'Permita que o app obtenha sua localização',
          },
        );
        /*Verificação de permição e chamada da função para obter o posicionamento */
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getPosition();
        } else {
          setShowError(true);
          setIsLoading(false);
          alert('Permissão Negada');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    if (Platform.OS === 'ios') {
      // chamada da função para obter o posicionamento
      getPosition();
    } else {
      /*Caso o sistema seja Android, Chamada da função para requerer acesso à localização do dispositivo*/
      requestPermissions();
    }
  }, []);

  /*Acesso à localização.
  getCurrentPosition:  realiza a requisição para a API da OpenWeather
  É habilitada a exibição da mensagem de erro caso ocorra algum problema*/
  function getPosition() {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        getWeather(currentLatitude, currentLongitude).then(data => {
          setIsLoading(false);
          if (data) {
            setDataWeather(data); // retorno da API da OpenWeather
          } else {
            setShowError(true);
            setDataWeather({});
          }
        });
      },
      error => {
        setShowError(true);
        setIsLoading(false);
      },
      {enableHighAccuracy: true, timeout: 50000, maximumAge: 1000},
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  function renderError(showError) {
    if (showError) {
      return (
        <Text style={styles.textError}>
          Não foi possível obter a previsão do tempo
        </Text>
      );
    }

    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderError(showError)}

      <Weather data={dataWeather} />
      <Button
        title="Atualizar"
        onPress={() => {
          setShowError(false);
          setIsLoading(true);
          getPosition();
        }}
      />
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
  textError: {
    color: '#d01c27',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
