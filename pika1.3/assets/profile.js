import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl,Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { useFonts } from 'expo-font';
import '@firebase/firestore';
import { usernaame } from './login';

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
let userImgs = [];
let UserFreinds = [];
let UserFollowers = [];
let UserPosts = [];
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }
 
const db = firebase.firestore()

const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

export default function suck_Profile() {
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        (async () => {
            const usersRef = db.collection('users').doc(usernaame);
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    UserData = doc.data().userdata;
                    UserFreinds = doc.data().friends;
                    if (doc.data().followers) {
                        UserFollowers = doc.data().followers;
                    }
                    if (doc.data().posts) {
                        UserPosts = doc.data().posts;
                    }
                    userImgs = [];
                    for (let eas = 5; eas < UserData.length; eas++) {
                        userImgs.push(UserData[eas]);
                        
                    }
                });
                } else {
                    alert('wrong username or password');
                }
            });
        })()
      }, [])
      
    
    

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
    }, []);
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
    

  if (UserData[0]) {
    return (
        <SafeAreaView style={{backgroundColor:'#ffffff'}}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'}/>}>
              <View style={{height:290}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:'#00e8ff',position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}}/>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:60,left:140}} >@{UserData[3]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData[0]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData[1]}</Text>
                  <View style={{position:'absolute',top:180,left:30}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >following</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFreinds.length}</Text>
                  </View>
                  <View style={{position:'absolute',top:180,left:140}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >followers</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFollowers.length}</Text>
                  </View>
                  <View style={{position:'absolute',top:180,left:270}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >posts</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserPosts.length}</Text>
                  </View>
                  
                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:'#00e8ff',borderRadius:6,marginTop:250}}>
                      <Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:35,right:3}}>
                        <Image source={require('./imgs/settings.png')} style={{tintColor:'#00e8ff',height:30,width:30}} />
                  </TouchableOpacity>

              </View>
              <View style={{backgroundColor:'#00e8ff',paddingTop:35,borderTopLeftRadius:30,borderTopRightRadius:30}}>
              {
                  userImgs.map((image,index)=>{
                    
                    return (
                        <View key={index} style={{height:500,width:300,alignSelf:'center',marginBottom:10}}>
                            <Image style={{height:500,width:300,borderRadius:30,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userImgs[index]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                            
                        </View>
                    )
                }).reverse()
              }
              </View>
          </ScrollView>
      </SafeAreaView>
    );
  }else{
      return(
        <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'} />}>
            <Text style={{fontFamily:'cour',color:'#00e8ff',alignSelf:'center',fontSize:24,marginTop:100}}>reload</Text>
        </ScrollView>
      </SafeAreaView>
      ) 
  }
  
}


