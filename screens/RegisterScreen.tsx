import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, { useState } from 'react';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { getDatabase, ref, set } from 'firebase/database';
  import { auth } from '../config/Config';
  
  export default function RegistroScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [usuario, setUsuario] = useState('');
    const [celular, setCelular] = useState('');
  
    function registro() {
      if (!correo || !contrasenia || !usuario || !celular) {
        Alert.alert('Campos obligatorios', 'Por favor completa todos los campos.');
        return;
      }
  
      createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuario creado:', user.uid);
  
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
  
          set(userRef, {
            correo: correo,
            usuario: usuario,
            celular: celular,
          })
            .then(() => {
              console.log('Datos adicionales guardados en Realtime Database');
              navigation.navigate('Welcome');
            })
            .catch((error) => {
              console.error('Error al guardar datos en Realtime Database:', error);
            });
        })
        .catch((error) => {
          Alert.alert('Error al registrar', error.message);
          console.error('Error al crear usuario:', error.code, error.message);
        });
        Alert.alert('Exitoso', 'Usuario Creado');
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.subtitle}>Crea una cuenta para empezar</Text>
  
        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          style={styles.input}
          onChangeText={(texto) => setCorreo(texto)}
        />
  
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          style={styles.input}
          onChangeText={(texto) => setContrasenia(texto)}
          secureTextEntry
        />
  
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          style={styles.input}
          onChangeText={(texto) => setUsuario(texto)}
        />
  
        <TextInput
          placeholder="Número celular"
          placeholderTextColor="#aaa"
          style={styles.input}
          onChangeText={(texto) => setCelular(texto)}
          keyboardType="phone-pad"
        />
  
        <TouchableOpacity style={styles.button} onPress={registro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
  
        <Text style={styles.footerText}>
          ¿Ya tienes una cuenta?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            Inicia sesión
          </Text>
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: '#666',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      width: '90%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    button: {
      width: '90%',
      height: 50,
      backgroundColor: '#4CAF50',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    footerText: {
      marginTop: 20,
      fontSize: 16,
      color: '#555',
    },
    loginLink: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
  });
  