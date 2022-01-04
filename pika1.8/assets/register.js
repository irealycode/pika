import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import firebase from 'firebase';
import '@firebase/firestore';
import AsyncStorage from'@react-native-async-storage/async-storage';
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
var bgc = '#ffffff';
var lol = '#00e8ff';
let UserData = [];

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }
 
const db = firebase.firestore()
function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

export default function register_suck({navigation}) {
    const  [name_db,setName] = useState('');
    const  [bio_db,setBio] = useState('');
    const  [email_db,setEmail] = useState('');
    const  [uid_db,setUid] = useState('');
    const  [pwd_db,setPwd] = useState('');
    const  [cpwd_db,setCPwd] = useState('');
    const [smt, setSmt] = React.useState(false);
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
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
            await AsyncStorage.setItem(STORAGE_KEY, '#ffffff')
        }
    }
    loadTheme()
      const register_api = async() => {
        UserData = [];
        UserData.push(name_db,bio_db,email_db,uid_db,md5(pwd_db),"profile.png");
        
        if (name_db != '' && bio_db != '' && email_db != '' && uid_db != '' && pwd_db != '' && cpwd_db != '') {
            if (!hasWhiteSpace(uid_db) && !hasWhiteSpace(email_db)) {
                if (pwd_db == cpwd_db) {
                    const usersRef = db.collection('users').doc(uid_db)
                    usersRef.get().then((docSnapshot) => {
                        if (docSnapshot.exists) {
                        alert('username already exists.');
                        } else {
                            const res = db.collection('users').doc(uid_db).set({userdata: UserData,friends: ['pika'],followers:[]});
                            navigation.navigate('upload', {data: UserData});
                        }
                    });
                }else{
                    alert('passwords does not match.');
                }
            }else{
                alert("can't have spaces in username and email.");
            }
            
        }else{
            alert('you left something empty.');
        }
      }

    return (
        <KeyboardAvoidingWrapper>
            <View style={{backgroundColor:bgc,height:'100%'}}>
                <View style={{height:230,width:'100%', backgroundColor:lol,borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                    <Text style={{fontFamily:'cour',textAlign:'center',marginTop:80,fontSize:44,color:bgc}}>pika</Text>
                    <Text style={{fontFamily:'cour',textAlign:'center',marginTop:20,fontSize:18,color:bgc}}>register</Text>
                </View>
                <TextInput style={{height:55,width:'80%',marginTop:30,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='name...' onChangeText={(text) => setName(text)} maxLength={13} placeholderTextColor='#a6a4a3'/>
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='bio...' onChangeText={(text) => setBio(text)} maxLength={27} placeholderTextColor='#a6a4a3'/>
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='email...' onChangeText={(text) => setEmail(text)} placeholderTextColor='#a6a4a3'/>
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='username...' onChangeText={(text) => setUid(text)} maxLength={11} placeholderTextColor='#a6a4a3'/>
                <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='password...' onChangeText={(text) => setPwd(text)} placeholderTextColor='#a6a4a3'/>
                <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:lol}} placeholder='confirm password...' onChangeText={(text) => setCPwd(text)} placeholderTextColor='#a6a4a3'/>
                <TouchableOpacity style={{paddingVertical:10,width:'40%',backgroundColor:lol,alignSelf:'center',marginTop:5,borderRadius:30}} onPress={register_api}>
                    <Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('login')}>
                    <Text style={{color:lol,fontFamily:'cour',fontSize:14,alignSelf:'center'}}>login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingWrapper>
    );

}
