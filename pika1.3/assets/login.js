import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import firebase from 'firebase';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCDI2ja9Xq8AJzkEWDlbYvVaEuI5walkPM",
    authDomain: "pika-4f9d6.firebaseapp.com",
    projectId: "pika-4f9d6",
    storageBucket: "pika-4f9d6.appspot.com",
    messagingSenderId: "1031058737191",
    appId: "1:1031058737191:web:4be644a19a5e1ef7bee602",
    measurementId: "G-WE4G2DDECB"  
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }
 
const db = firebase.firestore()




var usernaame = '';
var userLogo = '';

export default function login_suck({navigation}) {
    const [uid,setUid] = useState('');
    const [pwd,setPwd] = useState('');

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
                    if (UserData[4] == pwd) {
                        userLogo = UserData[5];
                        navigation.navigate('drawer');
                    }else{
                        alert('wrong username or password');
                    }
                });
                } else {
                    alert('wrong username or password');
                }
            });
          }
        
      }
    

    return (
        <KeyboardAvoidingWrapper>
        <View style={{backgroundColor:'#ffffff',height:'100%'}}>
            <View style={{height:260,width:'100%', backgroundColor:'#00e8ff',borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                <Text style={{fontFamily:'cour',textAlign:'center',marginTop:100,fontSize:44,color:'#ffffff'}}>pika</Text>
                <Text style={{fontFamily:'cour',textAlign:'center',marginTop:20,fontSize:20,color:'#ffffff'}}>login</Text>
            </View>
            <TextInput style={{height:55,width:'80%',marginTop:80,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='username...' onChangeText={(text) => setUid(text)} />
            <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:10,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='password...' onChangeText={(text) => setPwd(text)}/>
            <TouchableOpacity style={{paddingVertical:10,width:'40%',backgroundColor:'#00e8ff',alignSelf:'center',marginTop:10,borderRadius:30}} onPress={() => Login_check()} >
                <Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('register')}>
                <Text style={{color:'#00e8ff',fontFamily:'cour',fontSize:14,alignSelf:'center'}}>register</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingWrapper>
    );

}
export {usernaame} ;
export {userLogo} ;