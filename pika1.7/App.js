import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login_suck from './assets/login';
import register_suck from './assets/register';
import suck_upload from './assets/uploadPhotos';
import suck_Drawer from './assets/Drawer';
import suck_chat from './assets/chat';
import main_home from './assets/posts_home';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}} >
        <Stack.Screen name="login" component={login_suck} />
        <Stack.Screen name="register" component={register_suck} />
        <Stack.Screen name="upload" component={suck_upload} />
        <Stack.Screen name="drawer" component={suck_Drawer} />
        <Stack.Screen name="chat" component={suck_chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


