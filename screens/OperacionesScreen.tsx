import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';

export default function OperacionesScreen() {
  const [idOperacion, setIdOperacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Función para manejar el guardado de los datos
  const guardarItem = () => {
    const precioNum = parseFloat(precio);
    const cantidadNum = parseInt(cantidad);

    // Validar si los campos están vacíos
    if (!idOperacion || !precio || !cantidad || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Validar que el precio sea un número positivo
    if (precioNum <= 0) {
      Alert.alert('Error', 'El precio debe ser mayor que 0');
      return;
    }

    // Si el precio es menor a 1 o mayor a 20, preguntamos si desea continuar
    if (precioNum < 1 || precioNum > 20) {
      Alert.alert(
        'Confirmación',
        'El monto es menor a $1 o mayor a $20. ¿Desea continuar con la operación?',
        [
          {
            text: 'No',
            onPress: () => console.log('Operación cancelada'),
            style: 'cancel',
          },
          {
            text: 'Sí',
            onPress: () => realizarOperacion(),
          },
        ]
      );
    } else if (precioNum < 0) {
      // Si el precio es negativo, mostrar alerta
      Alert.alert('Error', 'El precio no puede ser negativo');
    } else {
      // Si la operación es válida, la guardamos
      realizarOperacion();
    }
  };

  // Función para realizar la operación y guardar el item
  const realizarOperacion = () => {
    // Aquí podrías agregar la lógica para guardar el item en una base de datos o hacer alguna otra acción
    console.log('Guardando operación...');
    console.log({ idOperacion, precio, cantidad, descripcion });

    // Mostrar mensaje de éxito
    Alert.alert('Operación realizada con éxito', 'El item ha sido guardado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Operación</Text>

      {/* Campo para ID de operación */}
      <TextInput
        placeholder="ID de operación"
        style={styles.input}
        value={idOperacion}
        onChangeText={setIdOperacion}
      />

      {/* Campo para el precio */}
      <TextInput
        placeholder="Precio"
        style={styles.input}
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      {/* Campo para la cantidad */}
      <TextInput
        placeholder="Cantidad"
        style={styles.input}
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      {/* Campo para la descripción */}
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Botón para guardar */}
      <Button title="Guardar" onPress={guardarItem} />
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
});
