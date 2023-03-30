import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from './src/screen/MainScreen';
import SinginScreen from './src/screen/SinginScreen';
import SingupScreen from './src/screen/SingupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState("");

  const getAsyncStorageItem = () => {
    try{
      AsyncStorage.getItem("token").then((item) => {
        setToken(item);
      })
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{
    getAsyncStorageItem();
  }, []);

  return (
    <NavigationContainer>
      {
        token 
        ? (
          <Tab.Navigator>
            <Tab.Screen name="Main" component={MainScreen} />
          </Tab.Navigator>
        )
        : (
          <Stack.Navigator>
            <Stack.Screen name="singin" component={SinginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="singup" component={SingupScreen} options={{ headerShown: false }} />
          </Stack.Navigator> 
        )
      }
    </NavigationContainer>
  );
}