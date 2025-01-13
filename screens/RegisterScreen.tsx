import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {
    const [correo, setcorreo] = useState("");
    const [contrasenia, setcontrasenia] = useState("");
    const [usuario, setusuario] = useState("");
    const [celular, setcelular] = useState("");

    function registro() {
        if (!correo || !contrasenia || !usuario || !celular) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario creado:", user.uid);

                const db = getDatabase();
                const userRef = ref(db, `users/${user.uid}`);

                set(userRef, {
                    correo: correo,
                    usuario: usuario,
                    celular: celular,
                })
                    .then(() => {
                        console.log("Datos adicionales guardados en Realtime Database");
                        navigation.navigate("Welcome");
                    })
                    .catch((error) => {
                        console.error("Error al guardar datos en Realtime Database:", error);
                    });
            })
            .catch((error) => {
                console.error("Error al crear usuario:", error.code, error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>REGISTRO</Text>

            <TextInput
                placeholder="Ingresar correo"
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
            />

            <TextInput
                placeholder="Ingresar contraseña"
                style={styles.input}
                onChangeText={(texto) => setcontrasenia(texto)}
                secureTextEntry
            />

            <TextInput
                placeholder="Ingresar usuario"
                style={styles.input}
                onChangeText={(texto) => setusuario(texto)}
            />

            <TextInput
                placeholder="Ingresar numero celular"
                style={styles.input}
                onChangeText={(texto) => setcelular(texto)}
                keyboardType="phone-pad"
            />

            <Button title="Registro" color={"green"} onPress={registro} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 35,
        height: 55,
        backgroundColor: "#6666",
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
        width: "85%",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
