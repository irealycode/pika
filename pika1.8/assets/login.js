import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Button } from 'react-native';
import { useFonts } from 'expo-font';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import firebase from 'firebase';
import '@firebase/firestore';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import AsyncStorage from'@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import md5 from 'md5';

const firebaseConfig = {
    apiKey: "AIzaSyCDI2ja9Xq8AJzkEWDlbYvVaEuI5walkPM",
    authDomain: "pika-4f9d6.firebaseapp.com",
    projectId: "pika-4f9d6",
    storageBucket: "pika-4f9d6.appspot.com",
    messagingSenderId: "1031058737191",
    appId: "1:1031058737191:web:4be644a19a5e1ef7bee602",
    measurementId: "G-WE4G2DDECB"  
};

var bgc = '#1a1a1a';
var lol = '#00e8ff';
const loadTheme = async() => {
    const STORAGE_KEY = '@save_theme'
    const KEY101 = '@urmomsahoe'
    const okk = await AsyncStorage.getItem(STORAGE_KEY)
    const okk1 = await AsyncStorage.getItem(KEY101)
    if (okk && okk1) {
        bgc = okk
        lol = okk1
    }else{
        await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
        await AsyncStorage.setItem(KEY101, '#00e8ff')
    }
}
loadTheme();
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }
 
const db = firebase.firestore()




var usernaame = '';
var userLogo = '';

export default function login_suck({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const [smt, setSmt] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        setVisible(!visible);
    }, [visible]);
    const [uid,setUid] = useState('');
    const [pwd,setPwd] = useState('');

    const loadTheme = async() => {
        const STORAGE_KEY = '@save_theme'
        const KEY101 = '@urmomsahoe'
        const okk = await AsyncStorage.getItem(STORAGE_KEY)
        const okk1 = await AsyncStorage.getItem(KEY101)
        if (okk && okk1) {
            bgc = okk
            lol = okk1
        }else{
            await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
            await AsyncStorage.setItem(KEY101, '#00e8ff')
        }
    }
    loadTheme();
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
    

      const Login_check = async() => {
          if (uid != '' && pwd != '') {
            const usersRef = db.collection('users').doc(uid)
            usernaame = uid;
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    let UserData = doc.data().userdata;
                    if (UserData[4] == md5(pwd)) {
                        userLogo = UserData[5];
                        navigation.navigate('drawer');
                    }else{
                        toggleAlert();
                    }
                });
                } else {
                    toggleAlert();
                }
            });
          }
        
      }
    

    return (
        <KeyboardAvoidingWrapper>
        <View style={{backgroundColor:bgc,height:'100%'}}>
            <View style={{height:260,width:'100%', backgroundColor:lol,borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                <Text style={{fontFamily:'cour',textAlign:'center',marginTop:100,fontSize:44,color:bgc}}>pika</Text>
                <Text style={{fontFamily:'cour',textAlign:'center',marginTop:20,fontSize:20,color:bgc}}>login</Text>
            </View>
            <TextInput style={{height:55,width:'80%',marginTop:80,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='username...' onChangeText={(text) => setUid(text)} placeholderTextColor='#a6a4a3' autoCapitalize='none' />
            <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:10,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='password...' onChangeText={(text) => setPwd(text)} placeholderTextColor='#a6a4a3' />
            <TouchableOpacity style={{paddingVertical:10,width:'40%',backgroundColor:lol,alignSelf:'center',marginTop:10,borderRadius:30}} onPress={() => Login_check()} >
                <Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('register')}>
                <Text style={{color:lol,fontFamily:'cour',fontSize:14,alignSelf:'center'}}>register</Text>
            </TouchableOpacity>
            <FancyAlert style={{backgroundColor:lol}} visible={visible} icon={<View style={{backgroundColor:bgc,flex: 1,borderRadius: 50,width: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center',}}><Image source={require('./imgs/no.png')} style={{height:23,width:23,tintColor:lol}} /></View>}>
            <View ><Text style={{color:bgc,fontSize:16,fontFamily:'cour',textAlign:'center',paddingBottom:30}}>wrong username or password</Text></View><TouchableOpacity onPress={toggleAlert} style={{alignSelf:'center',backgroundColor:bgc,width:'90%',paddingVertical:7,borderRadius:30,marginBottom:15}}><Text style={{fontFamily:'cour',fontSize:16,color:lol,alignSelf:'center'}}>ok</Text></TouchableOpacity>
            </FancyAlert>
        </View>
        </KeyboardAvoidingWrapper>
    );

}
export {usernaame} ;
export {userLogo} ;