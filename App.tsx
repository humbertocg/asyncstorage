import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const [inputTexto, setInputTexto] = useState('');
  const [nombreStorage, setNombreStorage] = useState<any>('');

  const guardarDato = async () => {
    try {
      await AsyncStorage.setItem('name', inputTexto);
      setInputTexto('');
      setNombreStorage(inputTexto);
    } catch (ex) {}
  };

  const obtenerDato = async () => {
    try {
      const dato = await AsyncStorage.getItem('name');
      setNombreStorage(dato);
    } catch (ex) {
      throw ex;
    }
  };

  const elminarDato = async () => {
    await AsyncStorage.removeItem('name');
    await obtenerDato();
  };

  useEffect(() => {
    obtenerDato();
  }, [nombreStorage]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView contentContainerStyle={[styles.contenedor, styles.controls]}>
        {nombreStorage && <Text>Hola: {nombreStorage}</Text>}
        <TextInput
          value={inputTexto}
          style={styles.input}
          placeholder="Escribe tu nombre"
          onChangeText={text => {
            setInputTexto(text);
          }}
        />
        <Button
          title="Guardar"
          color={'#333'}
          onPress={() => {
            guardarDato();
          }}
        />
        {nombreStorage && (
          <TouchableHighlight
            style={styles.btnEliminar}
            onPress={() => {
              elminarDato();
            }}>
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  controls: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 300,
  },
});

export default App;
