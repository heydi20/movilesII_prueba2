import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}: any) {
    return (
        <View style={styles.container}>
            {/* Imagen */}
            <Image />

            {/* Título */}
            <Text style={styles.title}>Bienvenido a nuestra aplicación!</Text>

            {/* Botones */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')} // Navega a la pantalla de Login
                >
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Registro')} // Navega a la pantalla de Registro
                >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 200, // Ajusta según el tamaño de tu imagen
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
});