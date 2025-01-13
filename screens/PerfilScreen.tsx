import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
//import { db } from './firebaseConfig'; // Importa la configuración de Firebase
import { getDatabase, onValue, ref } from 'firebase/database';
import { auth } from '../config/Config';

const PerfilScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const db = getDatabase();
      const userId = auth.currentUser?.uid; // Obtiene el UID del usuario autenticado
  
      if (userId) {
        const userRef = ref(db, `users/${userId}`); // Ruta a los datos del usuario
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUser(snapshot.val()); // Obtiene los datos del usuario
          } else {
            console.log('No se encontraron datos del usuario.');
          }
        }, (error) => {
          console.error('Error al obtener los datos:', error);
        });
      } else {
        console.log('Usuario no autenticado.');
      }
    };
  
    fetchUserData();
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Información de perfil */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Información de perfil</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.value}>{user.fullName}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Saludo de bienvenida</Text>
            <Text style={styles.value}>{user.greeting}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Autorización de uso de datos</Text>
            <Text style={[styles.value, styles.authorized]}>{user.dataAuthorization}</Text>
          </View>
        </View>

        {/* Información de contacto */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mantén actualizada tu información</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Número de celular</Text>
            <Text style={styles.value}>{user.phoneNumber}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  itemContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  authorized: {
    color: 'green',
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PerfilScreen;
