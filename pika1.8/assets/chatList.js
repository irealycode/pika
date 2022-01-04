import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image,RefreshControl, TouchableOpacity,ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usernaame } from './login';
import firebase from 'firebase';
import '@firebase/firestore';
import suck_chattt from './chat';
import suck_chatttt from './chat1';
import AsyncStorage from'@react-native-async-storage/async-storage';

var bgc = '#ffffff';
var lol = '#00e8ff';
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

const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  let FriendsLists = [];
  let UsrFriends = [];
  let UsrChats = [];
  let UserChatsList = [];
  let UserChatsList1 = [];
function suck_chatt({navigation}) {
    
    const [UserFriendsList, setFriendsList] = React.useState([]);
    
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshing11, setRefreshing11] = React.useState(false);

    let firstUser = [
        "pika",
        "your friend",
        "pika@gmail.com",
        "pika",
        "yedekfih2",
        "kdezh8zz5cj",
    ];
    React.useEffect(() => {
        (async () => {
            // const usersRef = db.collection('users').doc(usernaame);
            // usersRef.get()
            // .then((docSnapshot) => {
            //     if (docSnapshot.exists) {
            //     usersRef.onSnapshot((doc) => {
            //         setFriendsList(doc.data().friends);
            //         UsrFriends = doc.data().friends;
            //             const niceCall = async() => {
            //                 FriendsLists = [];
            //                 for (let usr = 0; usr < UsrFriends.length; usr++) {
            //                     const usersRef2 = await db.collection('users').doc(UsrFriends[usr]).get();
            //                     FriendsLists.push(usersRef2.data().userdata);
            //                 }
            //                 setFriendsList(FriendsLists);
            //             }
            //             niceCall()
            //         if (doc.data().fchat) {
            //           UserChatsList = []
            //             UserChatsList1 = doc.data().fchat;
            //             for (let uuid = 0; uuid < doc.data().fchat.length; uuid++) {
            //                 if (uuid % 2 === 0) {
            //                   const chatCall = async() => {
            //                   var Cfirst = 1;
            //                   var Csecond = 1;
            //                   for (let test1 = 0; test1 < usernaame.length; test1++) {
            //                     Cfirst *= usernaame.charCodeAt(test1);
            //                   }
            //                   for (let test2 = 0; test2 < doc.data().fchat[uuid].length; test2++) {
            //                       Csecond *= doc.data().fchat[uuid].charCodeAt(test2);
            //                   }
            //                   let roomID = String(Cfirst * Csecond);
            //                   console.log('id: ',roomID)
            //                   var ok = '';
            //                   const chatsRef = await db.collection(roomID).orderBy('createdAt').get();
            //                   chatsRef.docs.map(doc1 => {console.log(doc.data().fchat[uuid],':',doc1.data().text); ok = doc1.data().text});
            //                   UserChatsList.push([doc.data().fchat[uuid],doc.data().fchat[uuid+1],ok]) 
                              
            //                 }
            //                 chatCall()
            //                 }

            //             }
            //             setRefreshing11(true)
            //         }
        
            //         // setFriendsList([...UserFriendsList, doc1.data().userdata]);
            //     });
            //     } else {
            //         alert('wrong username or password');
            //     }
                
            // });
            
        firstEx();
        })()
      }, [])
      const firstEx = async() => {
        const VerRef = await db.collection('ver').doc('verified').get();
        const verifiedd = VerRef.data().verified
        const usersRef = db.collection('users').doc(usernaame);
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    setFriendsList(doc.data().friends);
                    UsrFriends = doc.data().friends;
                        const niceCall = async() => {
                            FriendsLists = [];
                            for (let usr = 0; usr < UsrFriends.length; usr++) {
                                const usersRef2 = await db.collection('users').doc(UsrFriends[usr]).get();
                                const userRe = usersRef2.data().userdata
                                
                                FriendsLists.push(userRe);
                            }
                            setFriendsList(FriendsLists);
                        }
                        niceCall()
                    if (doc.data().fchat) {
                      UserChatsList = []
                        UserChatsList1 = doc.data().fchat;
                        for (let uuid = 0; uuid < doc.data().fchat.length; uuid++) {
                            if (uuid % 2 === 0) {
                              const chatCall = async() => {
                              var Cfirst = 1;
                              var Csecond = 1;
                              for (let test1 = 0; test1 < usernaame.length; test1++) {
                                Cfirst *= usernaame.charCodeAt(test1);
                              }
                              for (let test2 = 0; test2 < doc.data().fchat[uuid].length; test2++) {
                                  Csecond *= doc.data().fchat[uuid].charCodeAt(test2);
                              }
                              let roomID = String(Cfirst * Csecond);
                              var ok = '';
                              const chatsRef = await db.collection(roomID).orderBy('createdAt').get();
                              chatsRef.docs.map(doc1 => {console.log(''); ok = doc1.data().text});
                              let okkk = ''
                              if (verifiedd.includes(doc.data().fchat[uuid])) {
                                okkk = 'verified'
                            }
                              UserChatsList.push([doc.data().fchat[uuid],doc.data().fchat[uuid+1],ok,okkk]) 
                              
                            }
                            chatCall()
                            }

                        }
                        setRefreshing11(true)
                    }
        
                    // setFriendsList([...UserFriendsList, doc1.data().userdata]);
                });
                } else {
                    alert('wrong username or password');
                }
                
            });
            
        
      }
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
            await AsyncStorage.setItem(STORAGE_KEY, '#ffffff')
        }
    }
    loadTheme()
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        firstEx()
        wait(1300).then(() => setRefreshing(false));
    }, []);
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      const [loaded1] = useFonts({
        courierBold: require('./fonts/CourierBOLD.ttf'),
      });
      if (!loaded) {
        return null;
      }
      if (!loaded1) {
        return null;
      }
    if (FriendsLists[0] || UserChatsList[0]) {
        return (
            <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc}/>}>

            <View>
                <Text style={{alignSelf:'center',color:lol,fontSize:24,fontFamily:'cour',marginTop:20}} >following</Text>
                <ScrollView showsHorizontalScrollIndicator={false} style={{marginTop:10}} horizontal>
                    {
                        FriendsLists.map((index) => {
                            
                            return (
                                <TouchableOpacity key={index} style={{marginRight:7,marginLeft:7}} onPress={() => navigation.navigate('chat', {Rdata:index,name : '@'+index[3]})}>
                                    <Image style={{width:80,height:80,borderRadius:130,borderWidth:2,borderColor:lol,alignSelf:'center'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                    <Text style={{alignSelf:'center',fontFamily:'cour',fontSize:16,color:lol}}>{index[3]}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
            <Text style={{alignSelf:'center',color:lol,fontSize:24,fontFamily:'cour',marginTop:15}} >chats</Text>
            <View style={{paddingBottom:20}}>
            {
                        UserChatsList.map((index,idx) => {
                          console.log('lmao: ',index)
                            return (
                                <TouchableOpacity key={idx} style={{borderRadius:15,backgroundColor:lol,alignSelf:'center',width:'80%',height:100,marginTop:10,flexDirection:'row'}} onPress={() => navigation.navigate('chat1', {Rdata:index,name : '@'+index[0]})}>
                                    <Image style={{marginTop:10,width:80,height:80,borderRadius:130,borderWidth:2,borderColor:bgc,marginLeft:15}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[1]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                    <View style={{flexDirection:'row',marginLeft:15,marginTop:3}}>
                                        <Text style={{fontFamily:'courierBold',fontSize:16,color:bgc,alignSelf:'center'}}>@{index[0]}</Text>
                                        {index[index.length -1] == 'verified'?<Image source={require('./imgs/verified.png')} style={{marginLeft:5,marginBottom:0,alignSelf:'center',height:12,width:12,tintColor:bgc}} />:<View></View>}
                                    </View>
                                    <Text style={{fontFamily:'cour',fontSize:14,color:bgc,position:'absolute',bottom:10,left:120,width:'50%',height:20,flexDirection:'row'}}>{index[2]}</Text>
                                </TouchableOpacity>
                            );
                        }).reverse()
                    }
            </View>
            </ScrollView>
      </SafeAreaView>
        );
      }else{
        return(
            <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc} />}>
                      <ActivityIndicator size='large' color={lol} style={{alignSelf:'center',marginTop:'50%'}} />
            </ScrollView>
          </SafeAreaView>
        )
      }
}

const Stack = createNativeStackNavigator();
export default function suck_chat() {
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="list" >
        <Stack.Screen name="list" component={suck_chatt} options={{headerShown: false}} />
        <Stack.Screen name="chat" component={suck_chattt} options={({route}) => ({title: route.params.name,headerTintColor:lol,headerTitleStyle:{fontFamily:'cour',fontSize:18},headerStyle:{backgroundColor:bgc} })} />
        <Stack.Screen name="chat1" component={suck_chatttt} options={({route}) => ({title: route.params.name,headerTintColor:lol,headerTitleStyle:{fontFamily:'cour',fontSize:18},headerStyle:{backgroundColor:bgc}})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

