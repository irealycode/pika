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
import AsyncStorage from'@react-native-async-storage/async-storage';
import { home_s } from './posts_home';

var bgc = '#1a1a1a';
var lol = '#00e8ff';
const Tab = createBottomTabNavigator();

export default function suck_Home({navigation}) {

  const [smt, setSmt] = React.useState(false);
  const loadTheme = async() => {
    const STORAGE_KEY = '@save_theme'
    const KEY101 = '@urmomsahoe'
    const okk = await AsyncStorage.getItem(STORAGE_KEY)
    const okk1 = await AsyncStorage.getItem(KEY101)
    if (okk) {
        bgc = okk
        lol = okk1
        console.log(okk)
        setSmt(true);
    }else{
        await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
    }
}
loadTheme()
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  
  

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarHideOnKeyboard:true,headerShown: false,tabBarShowLabel:false,tabBarStyle:{
        height:60,elevation:0,borderTopWidth:2,borderLeftWidth:2,borderRightWidth:2,borderTopLeftRadius:15,borderTopRightRadius:15,borderTopColor:lol,borderRightColor:lol,borderLeftColor:lol,position:'absolute',backgroundColor:bgc
      }}}>
        <Tab.Screen name="Home" component={main_home} options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image source={require('./imgs/home.png')} resizeMode='contain' style={{alignSelf:'center',width:30,height:30,tintColor: focused ? lol : '#b2b2b2'}} />
              <Text style={{color: focused ? lol : '#b2b2b2',fontFamily:'cour',fontSize:12,alignSelf:'center'}}>home</Text>
            </View>

          )
          

        }} />

        <Tab.Screen name="post" component={suck_post} options={{
          tabBarIcon: ({focused}) => (
            <View style={{backgroundColor:focused ? lol: bgc,height:30,width:60,borderRadius:10,borderWidth:2,borderColor:focused ? bgc: '#b2b2b2',flexDirection:'column',justifyContent:'center'}}>
              <Text style={{color:focused ? bgc: '#b2b2b2',fontFamily:'cour',fontSize:23,textAlign:'center',marginTop:3}}>+</Text>
            </View>

          )
          

        }} />
        <Tab.Screen name="search" component={suck_seach} options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image source={require('./imgs/search.png')} resizeMode='contain' style={{marginTop:3,alignSelf:'center',width:24,height:24,tintColor: focused ? lol : '#b2b2b2'}} />
              <Text style={{color: focused ? lol : '#b2b2b2',fontFamily:'cour',fontSize:12,alignSelf:'center'}}>search</Text>
            </View>

          )

        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}