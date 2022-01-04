import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import suck_Home from './home';
import { useFonts } from 'expo-font';
import suck_Profile from './profile';
import CustomSidebarMenu from './customDrawer';
import suck_chat from './chatList';
import AsyncStorage from'@react-native-async-storage/async-storage';

var lol = '#00e8ff';
const loadTheme = async() => {
  const KEY101 = '@urmomsahoe'
  const okk1 = await AsyncStorage.getItem(KEY101)
  if (okk1) {
      lol = okk1
  }else{
    await AsyncStorage.setItem(KEY101, '#00e8ff')
  }
}
loadTheme()

const Drawer = createDrawerNavigator();
export default function suck_Drawer() {
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
      

  return (
    <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName='home' screenOptions={{headerShown: false,drawerInactiveTintColor:lol,drawerActiveTintColor:lol,drawerLabelStyle:{fontFamily:'cour',fontSize:16}}}  drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen name='home' component={suck_Home} />
            <Drawer.Screen name='profile' component={suck_Profile} />
            <Drawer.Screen name='chat' component={suck_chat} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}


