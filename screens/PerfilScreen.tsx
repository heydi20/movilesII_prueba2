import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { getDatabase, onValue, ref } from 'firebase/database';
import { auth } from '../config/Config';

const PerfilScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.log('Usuario no autenticado.');
        return;
      }

      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);

      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
          console.log('Datos del usuario:', snapshot.val());
        } else {
          console.log('No se encontraron datos del usuario.');
        }
      }, (error) => {
        console.error('Error al obtener los datos:', error);
      });
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
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Información de perfil</Text>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Nombre completo</Text>
            <Text style={styles.value}>{user.usuario}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Número de celular</Text>
            <Text style={styles.value}>{user.celular}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Correo electrónico</Text>
            <Text style={styles.value}>{user.correo}</Text>
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
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PerfilScreen;
