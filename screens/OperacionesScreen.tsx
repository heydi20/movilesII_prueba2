import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export default function OperacionesScreen() {
  const [idOperacion, setIdOperacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [transacciones, setTransacciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState(null);

  // Función para manejar el guardado de los datos
  const guardarItem = () => {
    const precioNum = parseFloat(precio);
    const cantidadNum = parseInt(cantidad);

    if (!idOperacion || !precio || !cantidad || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (precioNum <= 0) {
      Alert.alert('Error', 'El precio debe ser mayor que 0');
      return;
    }

    if (precioNum < 1 || precioNum > 20) {
      Alert.alert(
        'Confirmación',
        'El monto es menor a $1 o mayor a $20. ¿Desea continuar con la operación?',
        [
          { text: 'No', onPress: () => console.log('Operación cancelada'), style: 'cancel' },
          { text: 'Sí', onPress: () => realizarOperacion(precioNum, cantidadNum) },
        ]
      );
    } else {
      realizarOperacion(precioNum, cantidadNum);
    }
  };

  // Función para realizar la operación y guardar el ítem
  const realizarOperacion = (precioNum, cantidadNum) => {
    const nuevaTransaccion = {
      id: idOperacion,
      precio: precioNum,
      cantidad: cantidadNum,
      descripcion,
    };

    setTransacciones([...transacciones, nuevaTransaccion]);

    Alert.alert('Éxito', 'La operación se ha guardado');
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setIdOperacion('');
    setPrecio('');
    setCantidad('');
    setDescripcion('');
  };

  const abrirModal = (transaccion) => {
    setTransaccionSeleccionada(transaccion);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setTransaccionSeleccionada(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => abrirModal(item)}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio.toFixed(2)}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Operación</Text>

      <TextInput
        placeholder="ID de operación"
        style={styles.input}
        value={idOperacion}
        onChangeText={setIdOperacion}
      />
      <TextInput
        placeholder="Precio"
        style={styles.input}
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        placeholder="Cantidad"
        style={styles.input}
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button title="Guardar" onPress={guardarItem} />

      <Text style={styles.subtitle}>Lista de Transacciones</Text>
      <FlatList
        data={transacciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Modal */}
      {transaccionSeleccionada && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={cerrarModal}
        >
          <View style={styles.modalContainer}>
            <ImageBackground
              source={{ uri: 'https://via.placeholder.com/400x300' }}
              style={styles.imageBackground}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>ID: {transaccionSeleccionada.id}</Text>
                <Text style={styles.modalText}>
                  CANTIDAD: {transaccionSeleccionada.cantidad}
                </Text>
                <Text style={styles.modalText}>
                  PRECIO: ${transaccionSeleccionada.precio.toFixed(2)}
                </Text>
                <Text style={styles.modalText}>
                  DESCRIPCIÓN: {transaccionSeleccionada.descripcion}
                </Text>
                <Button title="Cerrar" onPress={cerrarModal} />
              </View>
            </ImageBackground>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageBackground: {
    width: '90%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
});
