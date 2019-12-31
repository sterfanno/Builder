import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import PropTypes from 'prop-types';



export default function Weather(props) {
  console.log('props.data', props.data);
  //Verificação do objeto
  if (!Object.getOwnPropertyNames(props.data).length > 0) {
    return null;
  }
  const {main, coord, name, sys, weather} = props.data;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 50, height: 50, resizeMode: 'contain'}}
        source={{
          uri: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text style={styles.textTemp}>{main.temp} ºC</Text>
      <Text>
        {name}, {sys.country}
      </Text>
      <Text style={styles.textCoords}>Humidade: {main.humidity}%</Text>
      <Text style={styles.textCoords}>
        Sensação térmica: {main.feels_like} ºC
      </Text>
      <Text style={styles.textCoords}>
        Coordenadas: [{coord.lat}, {coord.lon}]
      </Text>
    </SafeAreaView>
  );
}

Weather.propTypes = {
  data: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textTemp: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  textCoords: {
    fontSize: 12,
  },
});
