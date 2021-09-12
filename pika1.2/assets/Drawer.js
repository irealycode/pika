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
        <Drawer.Navigator initialRouteName='home' screenOptions={{headerShown: false,drawerActiveTintColor:'#00e8ff',drawerInactiveTintColor:'#00e8ff', drawerLabelStyle:{fontFamily:'cour',fontSize:16}}}  drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen name='home' component={suck_Home} />
            <Drawer.Screen name='profile' component={suck_Profile} />
            <Drawer.Screen name='chat' component={suck_chat} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}


