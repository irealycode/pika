import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import suck_seach from './searchF';
import suck_post from './addPost';

function main_home(){
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <View style={{backgroundColor:'#00e8ff',height:'100%'}} >
      <Text style={{fontSize:220,alignSelf:'center',marginTop:140,fontFamily:'cour',color:'#ffffff'}} >p</Text>
    </View>
      );
}

const Tab = createBottomTabNavigator();
export default function suck_Home() {
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
            <View>
              <Text style={{color: focused ? '#00e8ff' : '#b2b2b2',fontFamily:'cour',fontSize:40,alignSelf:'center',backgroundColor:'#ffffff',paddingHorizontal:20,height:73,marginBottom:50,textAlign:'center',borderRadius:100,borderWidth:2,borderColor:'#00e8ff'}}>+</Text>
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