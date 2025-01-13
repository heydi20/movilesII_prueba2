import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen( {navigation} : any) {
    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigation.navigate("Welcome")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                let titulo=""
                let mensaje=""
               
                if( errorCode == 'auth/invalid-credential'){
                    titulo="Credenciales inválidas"
                    mensaje="Las credenciales son incorrectas, Verificar"
                }else if( errorCode == 'auth/invalid-email'){
                    titulo="Error en correo"
                    mensaje="Verificar la dirección de correo electrónico"
                }else{
                    titulo="Error"
                    mensaje="Verificar correo y contraseña"
                }

                Alert.alert(titulo, mensaje)
                
                
            });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 40 }}>Login</Text>

            <TextInput
                placeholder='Ingresar correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
            />

            <TextInput
                placeholder='Ingresar contraseña'
                style={styles.input}
                onChangeText={(texto) => setcontrasenia(texto)}
                secureTextEntry
            />

            <Button title='Login' onPress={()=> login()} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 35,
        height: 55,
        backgroundColor: "#6666",
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
        width: "85%"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt:{
        color:'blue',
        fontSize:25
    }

})