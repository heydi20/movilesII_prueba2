import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
  } from 'react-native';
  import React, { useState } from 'react';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../config/Config';
  
  export default function LoginScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
  
    function login() {
      if (!correo || !contrasenia) {
        Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
        return;
      }
  
      signInWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Inicio de sesión exitoso:', user.uid);
          navigation.navigate('Mytab');
        })
        .catch((error) => {
          const errorCode = error.code;
          let titulo = 'Error de autenticación';
          let mensaje = '';
  
          switch (errorCode) {
            case 'auth/invalid-email':
              titulo = 'Correo inválido';
              mensaje = 'Por favor ingresa un correo electrónico válido.';
              break;
            case 'auth/user-not-found':
              titulo = 'Usuario no encontrado';
              mensaje = 'No existe una cuenta registrada con este correo.';
              break;
            case 'auth/wrong-password':
              titulo = 'Contraseña incorrecta';
              mensaje = 'La contraseña ingresada es incorrecta.';
              break;
            case 'auth/too-many-requests':
              titulo = 'Demasiados intentos';
              mensaje =
                'El acceso a esta cuenta se ha desactivado temporalmente debido a demasiados intentos fallidos.';
              break;
            default:
              mensaje =
                'Ocurrió un error. Por favor, verifica tu correo y contraseña.';
          }
  
          Alert.alert(titulo, mensaje);
          console.error('Error al iniciar sesión:', errorCode, error.message);
        });
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
  
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
  
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
  
        <Text style={styles.footerText}>
          ¿No tienes una cuenta?{' '}
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('Registro')}
          >
            Regístrate
          </Text>
        </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
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
      marginBottom: 20,
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
      marginTop: 10,
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
    registerText: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
  });
  