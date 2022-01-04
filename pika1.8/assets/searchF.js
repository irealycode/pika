import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, TextInput, View,SafeAreaView,ScrollView,RefreshControl,Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from 'firebase';
import '@firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import suckComm from './POSTcomments';
import viewProfile from './viewProfile';
import AsyncStorage from'@react-native-async-storage/async-storage'
// indexOf("car");

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
  
let AllUsers = [];
let Allusers2 = [];
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
refreshing1 = true;
function suck_seach({navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshing1, setRefreshing1] = React.useState(false);
    const [searchV, setSearchV] = React.useState('');
    useEffect(() => {
        (async () => {
            const citiesRef = db.collection('users');
            const VerRef = await db.collection('ver').doc('verified').get();
            const verifiedd = VerRef.data().verified
            const snapshot = await citiesRef.get();
            snapshot.forEach(doc => {
              let OneUser = [];
              OneUser = doc.data().userdata;
              if (verifiedd.includes(OneUser[3])) {
              OneUser.push('verified')
              console.log('verified for: ',OneUser[3])
              console.log(OneUser)
            }
            AllUsers.push(OneUser)
            });
            
            
            Allusers2 = AllUsers;
            setRefreshing1(true);
        })()
      }, [])
      if (AllUsers[0]) {
        
        let AllUsers1 = [];
        for (let iied = 0; iied < Allusers2.length; iied++) {
          if (Allusers2[iied][3].indexOf(searchV)) {
              
          }else{
            
            AllUsers1.push(Allusers2[iied])
          }
          
        }
        if (searchV == '') {
          AllUsers = Allusers2;
        }else{
          if (AllUsers1 != []) {
            if (AllUsers1[0]) {
              AllUsers = AllUsers1;
              console.log('============================================')
              console.log('oaaaaao:',AllUsers1);
            }else{
              console.log('============================================')
              console.log('empty')
              
            }
          }
          
        }
        
      }else{
        AllUsers = Allusers2;
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

        wait(1000).then(() => setRefreshing(false),);
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
      if (AllUsers[0]) {
                return (
        <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc}/>}>
                <View style={{backgroundColor:bgc,marginBottom:100}}>
                    <TextInput style={{height:55,width:'90%',marginTop:50,marginBottom:30,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:15,paddingHorizontal:25,fontSize:16,fontFamily:'cour',color:lol}} placeholder='search...'  onChangeText={(text) => setSearchV(text)} placeholderTextColor='#a6a4a3' autoCapitalize='none' />
                    {
                        AllUsers.map((image,index)=>{
                            
                            return (
                                <View key={index} style={{height:110,width:'85%',alignSelf:'center',marginBottom:10,backgroundColor:lol,borderRadius:30}}>
                                    <Image style={{position:'absolute',top:15,left:20,height:80,width:80,borderRadius:150,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+AllUsers[index][5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                    <View style={{position:'absolute',top:30,left:105,flexDirection:'row'}}>
                                          <Text style={{fontSize:16,fontFamily:'courierBold',color:bgc}} >@{AllUsers[index][3]}</Text>
                                          {AllUsers[index][AllUsers[index].length -1] == 'verified'?<Image source={require('./imgs/verified.png')} style={{marginLeft:5,marginBottom:0,alignSelf:'center',height:12,width:12,tintColor:bgc}} />:<View></View>}
                                    </View>
                                    
                                    <Text style={{position:'absolute',top:60,left:105,fontSize:14,fontFamily:'cour',color:bgc}} >{AllUsers[index][0]}</Text>
                                    <TouchableOpacity style={{position:'absolute',right:10,top:30}} onPress={() => navigation.navigate('viewProfile', {data: AllUsers[index],UserNum: index})} >
                                        <Text style={{fontSize:30,transform: [{ rotate: '90deg' }],color:bgc}} >...</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
        </ScrollView>
      </SafeAreaView>  
          );
        }else{
            
            return (
            <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc}/>}>
                    <View style={{backgroundColor:bgc}}>
                        <TextInput style={{height:55,width:'90%',marginTop:50,borderWidth:2,borderColor:lol,alignSelf:'center',borderRadius:15,paddingHorizontal:25,fontSize:16,fontFamily:'cour',color:lol}} placeholder='search...'  />
                    </View>
                </ScrollView>
            </SafeAreaView>
                  );
        }
}

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="search"  >
        <Stack.Screen name="search" component={suck_seach} options={{headerShown: false}}/>
        <Stack.Screen name="viewProfile" component={viewProfile} options={{headerShown: false}}/>
        <Stack.Screen name="comm" component={suckComm} options={{headerTintColor:lol,title:'comments',headerTitleStyle:{color:lol,fontFamily:'cour'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
    