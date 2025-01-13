import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Button, ImageBackground, Alert } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';
import { db } from '../config/Config'; // Asegúrate de tener la configuración de Firebase aquí

interface Transaction {
  id: string;
  cantidad: number;
  precio: number;
  descripcion: string;
}

export default function ProductosScreen() {
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState<Transaction | null>(null);

  // Función para obtener las transacciones desde Firebase
  const obtenerTransacciones = async () => {
    const transaccionesRef = ref(db, 'transacciones'); // Ruta en la base de datos de Firebase donde están las transacciones

    try {
      const snapshot = await get(transaccionesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const transaccionesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key], // Los datos de la transacción en Firebase
        }));
        setTransacciones(transaccionesList);
      } else {
        console.log('No hay datos disponibles');
      }
    } catch (error) {
      console.error('Error al obtener las transacciones:', error);
    }
  };

  // Cargar las transacciones cuando el componente se monta
  useEffect(() => {
    obtenerTransacciones();
  }, []);

  // Función para mostrar el modal con los detalles de la transacción seleccionada
  const verDetalles = (transaccion: Transaction) => {
    setTransaccionSeleccionada(transaccion);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
    setTransaccionSeleccionada(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Transacciones</Text>

      {/* Lista de transacciones */}
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => verDetalles(item)}
          >
            <Text style={styles.itemText}>{item.descripcion}</Text>
            <Text style={styles.itemText}>Precio: ${item.precio}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal con los detalles de la transacción */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={cerrarModal}
      >
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg' }}
          style={styles.modalBackground}
          resizeMode="cover"
        >
          <View style={styles.modalContainer}>
            {transaccionSeleccionada && (
              <>
                <Text style={styles.modalTitle}>Detalles de la Operación</Text>
                <Text style={styles.modalText}>ID: {transaccionSeleccionada.id}</Text>
                <Text style={styles.modalText}>Descripción: {transaccionSeleccionada.descripcion}</Text>
                <Text style={styles.modalText}>Cantidad: {transaccionSeleccionada.cantidad}</Text>
                <Text style={styles.modalText}>Precio: ${transaccionSeleccionada.precio}</Text>

                <Button title="Cerrar" onPress={cerrarModal} />
              </>
            )}
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
