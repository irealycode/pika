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
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

      const register_api = async() => {
        UserData = [];
        UserData.push(name_db,bio_db,email_db,uid_db,pwd_db);
        
        if (name_db != '' && bio_db != '' && email_db != '' && uid_db != '' && pwd_db != '' && cpwd_db != '') {
            if (!hasWhiteSpace(uid_db) && !hasWhiteSpace(email_db)) {
                if (pwd_db == cpwd_db) {
                    const usersRef = db.collection('users').doc(uid_db)
                    usersRef.get().then((docSnapshot) => {
                        if (docSnapshot.exists) {
                        alert('username already exists.');
                        } else {
                            const res = db.collection('users').doc(uid_db).set({userdata: UserData,friends: ['pika']});
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
            <View style={{backgroundColor:'#ffffff',height:'100%'}}>
                <View style={{height:230,width:'100%', backgroundColor:'#00e8ff',borderBottomLeftRadius:40,borderBottomRightRadius:40}}>
                    <Text style={{fontFamily:'cour',textAlign:'center',marginTop:80,fontSize:44,color:'#ffffff'}}>pika</Text>
                    <Text style={{fontFamily:'cour',textAlign:'center',marginTop:20,fontSize:18,color:'#ffffff'}}>register</Text>
                </View>
                <TextInput style={{height:55,width:'80%',marginTop:30,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='name...' onChangeText={(text) => setName(text)} />
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='bio...' onChangeText={(text) => setBio(text)}/>
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='email...' onChangeText={(text) => setEmail(text)}/>
                <TextInput style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='username...' onChangeText={(text) => setUid(text)}/>
                <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='password...' onChangeText={(text) => setPwd(text)}/>
                <TextInput secureTextEntry={true} style={{height:55,width:'80%',marginTop:5,borderWidth:2,borderColor:'#00e8ff',alignSelf:'center',borderRadius:30,paddingHorizontal:20,fontSize:16,fontFamily:'cour',color:'#00e8ff'}} placeholder='confirm password...' onChangeText={(text) => setCPwd(text)}/>
                <TouchableOpacity style={{paddingVertical:10,width:'40%',backgroundColor:'#00e8ff',alignSelf:'center',marginTop:5,borderRadius:30}} onPress={register_api}>
                    <Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:10}} onPress={() => navigation.navigate('login')}>
                    <Text style={{color:'#00e8ff',fontFamily:'cour',fontSize:14,alignSelf:'center'}}>login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingWrapper>
    );

}
