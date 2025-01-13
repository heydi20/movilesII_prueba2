import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OperacionesScreen from "../screens/OperacionesScreen";
//import ProductosScreen from "../screens/ProductosScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={() => ({ headerShown: false })} 
            />
            <Stack.Screen name="Registro" component={RegistroScreen} />
            <Tab.Screen name="Mytab" component={MyTab} />
            
        </Stack.Navigator>
    );
}

function MyTab() {
    return (
        <Tab.Navigator>
            
            <Tab.Screen name="Operaciones" component={OperacionesScreen} />
            
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

