import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View,Image,RefreshControl, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usernaame } from './login';
import firebase from 'firebase';
import '@firebase/firestore';
import suck_chattt from './chat';

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
function suck_chatt({navigation}) {
    
    const [UserFriendsList, setFriendsList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    
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
                                FriendsLists.push(usersRef2.data().userdata);
                                
                            }
                        }
                        niceCall()
                        
        
                    // setFriendsList([...UserFriendsList, doc1.data().userdata]);
                });
                } else {
                    alert('wrong username or password');
                }
                
            });
            
        })()
      }, [])


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1300).then(() => setRefreshing(false));
    }, []);
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
    if (FriendsLists[0]) {
        return (
            <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'}/>}>

            <View>
                <Text style={{alignSelf:'center',color:'#00e8ff',fontSize:24,fontFamily:'cour',marginTop:20}} >following</Text>
                <ScrollView showsHorizontalScrollIndicator={false} style={{marginTop:10}} horizontal>
                    {
                        FriendsLists.map((index) => {
                            
                            return (
                                <TouchableOpacity key={index} style={{marginRight:7,marginLeft:7}} onPress={() => navigation.navigate('chat', {Rdata:index,name : '@'+index[3]})}>
                                    <Image style={{width:80,height:80,borderRadius:130,borderWidth:2,borderColor:'#00e8ff'}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                    <Text style={{alignSelf:'center',fontFamily:'cour',fontSize:16,color:'#00e8ff'}}>{index[3]}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
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
        <Stack.Screen name="chat" component={suck_chattt} options={({route}) => ({title: route.params.name,headerTintColor:'#00e8ff',headerTitleStyle:{fontFamily:'cour',fontSize:18}})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

