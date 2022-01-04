import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,RefreshControl,Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { usernaame } from './login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';
import '@firebase/firestore';
import { Dimensions } from 'react-native';
import AsyncStorage from'@react-native-async-storage/async-storage';

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

var bgc = '#ffffff';
var lol = '#00e8ff';
let UserData = [];
let userImgs = [];
let UserFreinds = [];
let UserFolowers = [];
let Commpost = [];
const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  let Wwidth = Dimensions.get('window').width
export default function viewProfile({route, navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [following, setFollowing] = React.useState(false);
    const [UserFollowers, setFollowers] = React.useState([]);
    const [UserFollwing, setFollowingG] = React.useState([]);
    const [UserPosts, setPosts] = React.useState([]);
    const [isPost, setisPost] = React.useState(false);
    const [UserPOSTSS, setPOSTSS] = React.useState([]);
    const [isreF, setreF] = React.useState(false);
    const [isVerified, setisVerfied] = React.useState(false);
    
    const {userN} = route.params;
    

    React.useEffect(() => {
        (async () => {
            const usersRef12 = db.collection('users').doc(userN);
            const doc12 = await usersRef12.get();
            UserData = doc12.data().userdata;
            // console.log('oaaaaoou1:',UserData);
            userImgs = []
            for (let eas = 6; eas < UserData.length; eas++) {
                userImgs.push(UserData[eas]);
            }
            const usersRef = db.collection('users').doc(usernaame);
            const FollowersRef = db.collection('users').doc(userN);
            FollowersRef.get().then((docSnapshot) =>{
                if (!docSnapshot.exists) {
                    console.log('No such document!');
                } else {
                    FollowersRef.onSnapshot((doc) => {
                        setFollowers(doc.data().followers);
                        setFollowingG(doc.data().friends);
                        if (doc.data().posts) {
                            setPosts(doc.data().posts);
                            let UsrPosts = doc.data().posts;
                            const getPosts = async() =>{
                                let Postss = [];
                                Commpost = [];
                                    for (let usser = 0; usser < UsrPosts.length; usser++) {
                                        const postsRef = db.collection('posts').doc(UsrPosts[usser]);
                                        let doc101 = await postsRef.get()
                                        Postss.push([doc101.data().postCap])
                                        Postss[usser].push(doc101.data().postImg)
                                        Postss[usser].push(doc101.data().likes)
                                        Commpost.push([UserData[3]])
                                        Commpost[usser].push(doc101.data().postCap)
                                        Commpost[usser].push(doc101.data().postImg)
                                        Commpost[usser].push(UserData[5])
    
                                    }
                                console.log('okkkk:',Postss)
                                setPOSTSS(Postss)
                            }
                            getPosts();
                        }
                        if (doc.data().verified) {
                            setisVerfied(true);
                        }
                    });
                    
                }
            });
            
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    UserFreinds = doc.data().friends;
                    if (UserFreinds.includes(UserData[3])) {
                        setFollowing(true);
                    }else{
                        setFollowing(false);
                    }
                });
                } else {
                    console.log('...');
                }
                
            });
            
        })()
      }, [])

    
    const FollowUser = async() => {
        const usersRef = db.collection('users').doc(usernaame);
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    UserFreinds = doc.data().friends;
                    if(usernaame == UserData[3]){
                        setFollowing(true);
                    }else{
                        if (UserFreinds.includes(UserData[3])) {
                            setFollowing(true);
                        }else{
                            UserFreinds.push(UserData[3]);
                            const res = db.collection('users').doc(usernaame).update({friends: UserFreinds});
                            if (doc.data().followers) {
                                const FollowRef = db.collection('users').doc(UserData[3]);
                                FollowRef.get()
                                FollowRef.onSnapshot((doc1) =>{
                                    UserFolowers = doc1.data().followers;
                                    if (UserFolowers.includes(usernaame)) {
                                        console.log('ok');
                                    }else{
                                        UserFolowers.push(usernaame);
                                        const res2 = db.collection('users').doc(UserData[3]).update({followers:UserFolowers});
                                    }
                                    
                                });
                                
                            }
                            
                            setFollowing(true);
                        }
                    }
                });
                } else {
                    console.log('...');
                }
            });
    }
    const [smt, setSmt] = React.useState(false);
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
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => setRefreshing(false));
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
  return (
      <View style={{backgroundColor:bgc,height:'100%'}} >
    <SafeAreaView style={{backgroundColor:bgc}}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc}/>}>
              <View style={{marginBottom:15}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:lol,position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}}/>
                  <View style={{position:'absolute',top:60,left:140,flexDirection:'row'}}>
                            <Text style={{color:lol,fontSize:18,fontFamily:'courierBold'}} >@{userN}</Text>
                            {isVerified?<Image source={require('./imgs/verified.png')} style={{height:15,width:15,alignSelf:'center',marginLeft:7,marginBottom:0,tintColor:lol}} />:<View></View>}
                  </View>
                  <Text style={{position:'absolute',color:lol,fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData[0]}</Text>
                  <Text style={{color:lol,fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData[1]}</Text>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:25,left:7,padding:10}} onPress={() => navigation.navigate('home')}>
                        <Image source={require('./imgs/goback.png')} style={{tintColor:lol,height:25,width:25}} />
                  </TouchableOpacity>
                  <View style={{alignSelf:'center',flexDirection:'row',marginTop:150}}> 
                            <View style={{marginRight:15}}>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:lol}} >following</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:lol,alignSelf:'center'}} >{UserFollwing.length}</Text>
                            </View>
                            <View style={{marginRight:15,alignSelf:'center'}}>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:lol}} >followers</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:lol,alignSelf:'center'}} >{UserFollowers.length}</Text>
                            </View>
                            <View>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:lol}} >posts</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:lol,alignSelf:'center'}} >{UserPosts.length}</Text>
                            </View>
                  </View>

                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:lol,borderRadius:6,marginTop:15}} onPress={() => FollowUser()}>
                      {!following?<Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>follow</Text>:<Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>following</Text>}
                  </TouchableOpacity>
              </View>
              <View style={{width:'80%',alignSelf:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{backgroundColor:isPost ? bgc:lol,paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(false)}>
                      <Text style={{textAlign:"center",color:isPost ? lol:bgc,fontFamily:'cour',fontSize:16}}>pics</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: isPost ? lol:bgc,paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(true)}>
                      <Text style={{textAlign:"center",color:isPost ? bgc:lol,fontFamily:'cour',fontSize:16}}>posts</Text>
                  </TouchableOpacity>
              </View>

              {!isPost?                  <View style={{backgroundColor:lol,borderRadius:15,marginBottom:60}}>
              {!userImgs[0] ? <View style={{width:Wwidth,backgroundColor:lol,borderRadius:30,paddingVertical:20}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>{UserData[0]} doesn't have any pics</Text></View>:<View style={{backgroundColor:lol,borderRadius:30,marginTop:30}}></View>}
              {
                  userImgs.map((image,index)=>{
                    
                    // if (index == 0) {
                    //     return (
                    //         <View key={index} style={{height:200,width:200,alignSelf:'center',marginBottom:10}}>
                    //             <Image style={{height:200,width:200,borderRadius:200,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                
                    //         </View>
                    //     )
                    // }else{
                        return (
                            <View key={index} style={{height:500,width:300,alignSelf:'center',marginBottom:10}}>
                                <Image style={{height:500,width:300,borderRadius:30,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userImgs[index]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                
                            </View>
                        )
                    // }
                }).reverse()
              }
              </View>:<View style={{marginBottom:50}}>
                  {!UserPOSTSS[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:lol,borderRadius:15}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>{UserData[0]} doesn't have any posts</Text></View>:<View></View>}
                                    {
                                        UserPOSTSS.map((index,idx)=>{
                                            // console.log('asdjkhcbasdhbcadbh:',index)
                                            return(
                                              <View key={index}>
                                                    <View style={{backgroundColor:lol,paddingTop:5,borderRadius:15,paddingBottom:7}}>
                                                        <View style={{left:15,flexDirection:'row'}}>
                                                            <Image style={{alignSelf:'center',marginBottom:7,marginTop:5,width:40,height:40,borderRadius:100,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                                            <Text style={{marginLeft:7,fontFamily:'courierBold',fontSize:16,color:bgc,alignSelf:'center'}} >@{userN}</Text>
                                                            {isVerified?<Image source={require('./imgs/verified.png')} style={{marginLeft:5,marginBottom:0,alignSelf:'center',height:12,width:12,tintColor:bgc}} />:<View></View>}
                                                        </View>
                                                        
                                                        <TouchableWithoutFeedback >
                                                            <View>
                                                            {index[1].startsWith('none')?<View></View>:<Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[1]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />}
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                        <View style={{flexDirection:'row',flex:1}}>
                                                        
                                                        <Text style={{fontFamily:'cour',fontSize:16,color:bgc,marginLeft:17,marginRight:40,width:Wwidth-80,paddingTop:10}} >{index[0]}</Text>
                                                        <View style={{position:"absolute",right:11,bottom:-30}}>
                                                        <Image style={{opacity:1,height:32,width:32,tintColor:bgc,alignSelf:'center'}} source={require('./imgs/like.png')}/>
                                                        {(() => {
                                                        if (!index[2]){
                                                            return (
                                                                <Text style={{textAlign:'center',marginTop:0,width:55,color:bgc,fontFamily:'cour',fontSize:16}} >0</Text>
                                                            )
                                                        }else{
                                                            if (index[2].length >= 1000) {
                                                                return(
                                                                    <Text style={{textAlign:'center',marginTop:0,width:55,color:bgc,fontFamily:'cour',fontSize:16}} >{String(index[2].length).slice(0,-3)+'.'+String(index[2].length)[2]}k</Text>
                                                                )
                                                            }else{
                                                                return(
                                                                <Text style={{textAlign:'center',marginTop:0,width:55,color:bgc,fontFamily:'cour',fontSize:16}} >{index[2].length}</Text>
                                                            )
                                                            }
                                                            
                                                        }
                                                        
                                                        return null;
                                                        })()}
                                                        
                                                        {/* {!index[2]?<Text style={{textAlign:'center',marginTop:7,color:bgc,fontFamily:'cour',fontSize:16}} >0</Text>:<Text style={{textAlign:'center',marginTop:7,color:bgc,fontFamily:'cour',fontSize:16}} >{index[2].length}</Text>} */}
                                                        </View> 
                                                    </View>
                                                    <TouchableOpacity onPress={() => navigation.navigate('comm', {postA:Commpost[idx]})}>
                                                                <Text style={{paddingHorizontal:20,fontFamily:'cour',color:bgc,paddingVertical:0}}>go to comments...</Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                    <View style={{height:7,width:10,alignSelf:'center',backgroundColor:lol}}></View>
                                              </View>
                                            
                                            );
                                          }).reverse()
                                    }
                                    </View>}
          </ScrollView>
      </SafeAreaView>
      </View>
  );
}

