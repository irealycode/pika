import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput,SafeAreaView,ScrollView,RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import suck_seach from './searchF';
import suck_post from './addPost';
import firebase from 'firebase';
import '@firebase/firestore';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import { usernaame } from './login';
import { Dimensions } from 'react-native';
import main_home from './posts_home';


const Tab = createBottomTabNavigator();
export default function suck_Home({navigation}) {
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarHideOnKeyboard:true,headerShown: false,tabBarShowLabel:false,tabBarStyle:{
        height:55,elevation:0,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderTopLeftRadius:15,borderTopRightRadius:15,borderTopColor:'#00e8ff',borderRightColor:'#00e8ff',borderLeftColor:'#00e8ff',position:'absolute'
      }}}>
        <Tab.Screen name="Home" component={main_home} options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image source={require('./imgs/home.png')} resizeMode='contain' style={{alignSelf:'center',width:30,height:30,tintColor: focused ? '#00e8ff' : '#b2b2b2'}} />
              <Text style={{color: focused ? '#00e8ff' : '#b2b2b2',fontFamily:'cour',fontSize:12,alignSelf:'center'}}>home</Text>
            </View>

          )
          

        }} />

        <Tab.Screen name="post" component={suck_post} options={{
          tabBarIcon: ({focused}) => (
            <View style={{backgroundColor:focused ? '#00e8ff': '#ffffff',height:30,width:60,borderRadius:10,borderWidth:2,borderColor:focused ? '#ffffff': '#b2b2b2'}}>
              <Text style={{color:focused ? '#ffffff': '#b2b2b2',fontFamily:'cour',fontSize:23,textAlign:'center',position:'absolute',alignSelf:'center',top:-7,}}>+</Text>
            </View>

          )
          

        }} />
        <Tab.Screen name="search" component={suck_seach} options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image source={require('./imgs/search.png')} resizeMode='contain' style={{marginTop:3,alignSelf:'center',width:24,height:24,tintColor: focused ? '#00e8ff' : '#b2b2b2'}} />
              <Text style={{color: focused ? '#00e8ff' : '#b2b2b2',fontFamily:'cour',fontSize:12,alignSelf:'center'}}>search</Text>
            </View>

          )

        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}