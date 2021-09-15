import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,RefreshControl,Image,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { usernaame } from './login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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


let UserData = [];
let ImgT = [];
let UserFreinds = [];
let UserFolowers = [];
const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

export default function viewProfile({route, navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [following, setFollowing] = React.useState(false);
    const [UserFollowers, setFollowers] = React.useState([]);
    const [UserFollwing, setFollowingG] = React.useState([]);
    const [UserPosts, setPosts] = React.useState([]);
    const [UserData1, setUserData1] = React.useState([]);
    const [userImgs, setImgs] = React.useState([]);
    UserData = [];
    const {userN} = route.params;
    

    React.useEffect(() => {
        (async () => {
            const usersRef12 = db.collection('users').doc(userN);
            const doc12 = await usersRef12.get();
            UserData = doc12.data().userdata;
            
            setUserData1(doc12.data().userdata)
            ImgT = doc12.data().userdata.splice(5, doc12.data().userdata.length);
            console.log('TEST3: ',ImgT);
            setImgs(ImgT);
            const usersRef = db.collection('users').doc(usernaame);
            const FollowersRef = db.collection('users').doc(doc12.data().userdata[3]);
            
            FollowersRef.get().then((docSnapshot) =>{
                if (!docSnapshot.exists) {
                    console.log('No such document!');
                } else {
                    FollowersRef.onSnapshot((doc) => {
                        setFollowers(doc.data().followers);
                        setFollowingG(doc.data().friends);
                        if (doc.data().posts) {
                            setPosts(doc.data().posts);
                        }
                    });
                    
                }
            });
            
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    UserFreinds = doc.data().friends;
                    if (UserFreinds.includes(doc12.data().userdata[3])) {
                        setFollowing(true);
                    }else{
                        setFollowing(false);
                    }
                });
                } 
                
            });
            
        })()
      }, [])

    const FollowUser = async() => {
        const usersRef12 = db.collection('users').doc(userN);
        const doc12 = await usersRef12.get();
        const usersRef = db.collection('users').doc(usernaame);
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    UserFreinds = doc.data().friends;
                    if(usernaame == doc12.data().userdata[3]){
                        setFollowing(true);
                    }else{
                        if (UserFreinds.includes(doc12.data().userdata[3])) {
                            setFollowing(true);
                        }else{
                            UserFreinds.push(doc12.data().userdata[3]);
                            const res = db.collection('users').doc(usernaame).update({friends: UserFreinds});
                            if (doc.data().followers) {
                                const FollowRef = db.collection('users').doc(doc12.data().userdata[3]);
                                FollowRef.get()
                                FollowRef.onSnapshot((doc1) =>{
                                    UserFolowers = doc1.data().followers;
                                    if (UserFolowers.includes(usernaame)) {
                                        console.log('ok');
                                    }else{
                                        UserFolowers.push(usernaame);
                                        const res2 = db.collection('users').doc(doc12.data().userdata[3]).update({followers:UserFolowers});
                                    }
                                    
                                });
                                
                            }
                            
                            setFollowing(true);
                        }
                    }
                });
                } else {
                    alert('wrong username or password');
                }
            });
    }
    
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
  return (
    <SafeAreaView style={{backgroundColor:'#ffffff'}}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'}/>}>
              <View style={{height:290}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:'#00e8ff',position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData1[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}}/>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:60,left:140}} >@{UserData1[3]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData1[0]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData1[1]}</Text>
                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:'#00e8ff',borderRadius:6,marginTop:250}} onPress={() => FollowUser()}>
                      {!following?<Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>follow</Text>:<Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>following</Text>}
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:25,left:7,padding:10}} onPress={() => navigation.navigate('home')}>
                        <Image source={require('./imgs/goback.png')} style={{tintColor:'#00e8ff',height:25,width:25}} />
                  </TouchableOpacity>
                  <View style={{position:'absolute',top:180,left:30}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >following</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFollwing.length}</Text>
                  </View>
                  <View style={{position:'absolute',top:180,left:140}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >followers</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFollowers.length}</Text>
                  </View>
                  <View style={{position:'absolute',top:180,left:270}}>
                        <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >posts</Text>
                        <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserPosts.length}</Text>
                  </View>

                  
              </View>
              <View style={{backgroundColor:'#00e8ff',paddingTop:35,borderTopLeftRadius:30,borderTopRightRadius:30,paddingBottom:77}}>
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
}


