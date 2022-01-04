import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl,Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';
import { useFonts } from 'expo-font';
import '@firebase/firestore';
import { userLogo, usernaame } from './login';
import editPP from './editProfile';
import { Dimensions } from 'react-native';
import suckComm from './POSTcomments';
import settings from './settings';
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
var lol = '#00e8ff';
var bgc = '#ffffff';
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
loadTheme()
let UserData = [];
let userImgs = [];
let UserFreinds = [];
let UserFollowers = [];
let UserPosts = [];
let Commpost = [];
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


let Wwidth = Dimensions.get('window').width;
function suck_Profilee({navigation}) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [isPost, setisPost] = React.useState(false);
    const [UserPostsss, setUserPosts] = React.useState();
    const [UserSmt, setSmt] = React.useState([]);
    const [UserPOSTSS, setPOSTSS] = React.useState([]);
    const [smt, setSmttt] = React.useState(false);
    const [isVerified, setisVerfied] = React.useState(false);
    useEffect(() => {
        (async () => {
            loaadUser();
            
        })()
      }, [])
      const loaadUser = async() => {
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
                    setUserPosts(doc.data().posts)
                    const getPosts = async() =>{
                        let Postss = [];
                        Commpost = [];
                            for (let usser = 0; usser < UserPosts.length; usser++) {
                                const postsRef = db.collection('posts').doc(UserPosts[usser]);
                                let doc101 = await postsRef.get()
                                Postss.push([doc101.data().postCap])
                                Postss[usser].push(doc101.data().postImg)
                                Postss[usser].push(doc101.data().likes)
                                Commpost.push([usernaame])
                                Commpost[usser].push(doc101.data().postCap)
                                Commpost[usser].push(doc101.data().postImg)
                                Commpost[usser].push(userLogo)

                            }
                        console.log('okkkk:',Postss)
                        setPOSTSS(Postss)
                    }
                    getPosts();
                }
                if (doc.data().verified) {
                    setisVerfied(true);
                }
                userImgs = [];
                for (let eas = 6; eas < UserData.length; eas++) {
                    userImgs.push(UserData[eas]);
                    setSmt(['a','v'])
                }
            });
            } else {
                console.log('');
            }
            
            
        });
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

    // const lol = async() => {
    //     i = 0
    //     while (i < 1000) {
    //         let r = (Math.random() + 1).toString(36).substring(2, 100);
    //         let r1 = (Math.random() + 1).toString(36).substring(2, 100);
    //         await db.collection('posts').doc('none2dwwqi860m').update({likes: firebase.firestore.FieldValue.arrayUnion(r+',/,'+r1)});
    //         i+= 1;
    //     }
    //     // for (let uuuid = 0; uuuid < 500; uuuid++){
    //     //     const lol1 = async() => {
    //     //     let r = (Math.random() + 1).toString(36).substring(2, 100);
    //     //     let r1 = (Math.random() + 1).toString(36).substring(2, 100);
    //     //     const postsRef1 = db.collection('posts').doc('none2dwwqi860m').update({likes: firebase.firestore.FieldValue.arrayUnion(r+',/,'+r1)});
    //     //     }
    //     //     lol1();
    //     // }
        
        
    // }
    // lol();
      
      

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loaadUser();
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
    
  if (UserData[0]) {
    return (
        <View style={{backgroundColor:bgc,height:'100%'}}>
        <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:bgc}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc}/>}>
              <View style={{marginBottom:15}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:lol,position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}}/>
                  <View style={{position:'absolute',top:60,left:140,flexDirection:'row'}}>
                    <Text style={{color:lol,fontSize:18,fontFamily:'courierBold'}} >@{UserData[3]}</Text>
                    {isVerified?<Image source={require('./imgs/verified.png')} style={{height:15,width:15,alignSelf:'center',marginLeft:7,marginBottom:0,tintColor:lol}} />:<View></View>}
                  </View>
                  
                  <Text style={{position:'absolute',color:lol,fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData[0]}</Text>
                  <Text style={{color:lol,fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData[1]}</Text>
                  <View style={{alignSelf:'center',flexDirection:'row',marginTop:150}}> 
                            <View style={{marginRight:15}}>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:lol}} >following</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:lol,alignSelf:'center'}} >{UserFreinds.length}</Text>
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
                  
                  {/* <Image source={require('./imgs/1485.gif')} style={{height:100,width:100}} /> */}
                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:lol,borderRadius:6,marginTop:10}} onPress={() => navigation.navigate('editP',{userD:UserData})}>
                      <Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:35,right:3}} onPress={() => navigation.navigate('settings')}>
                        <Image source={require('./imgs/settings.png')} style={{tintColor:lol,height:30,width:30}} />
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
              {/* <TouchableOpacity style={{width:50,height:50,backgroundColor:'#000000'}} onPress={() => lol()}>

              </TouchableOpacity> */}
              {!isPost?                  <View style={{backgroundColor:lol,paddingTop:0,borderRadius:15,paddingBottom:20,marginBottom:10}}>
              {!userImgs[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:lol,borderRadius:30}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>you don't have any pics</Text></View>:<View style={{backgroundColor:lol,paddingTop:35,borderRadius:30}}></View>}
                                {
                                    
                                    userImgs.map((image,index)=>{
                                        
                                        // if (index == 0) {
                                        //     return (
                                        //         <View key={index} style={{height:200,width:200,alignSelf:'center',marginBottom:10}}>
                                        //             <Image style={{height:200,width:200,borderRadius:200,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userImgs[index]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+new Date()}} />
                                                    
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
                                </View>:<View>
                                {!UserPOSTSS[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:lol,borderRadius:30}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>you don't have any posts</Text></View>:<View></View>}
                                    {
                                        
                                        UserPOSTSS.map((index,idx)=>{
                                            return(
                                              <View key={index}>
                                                    <View style={{backgroundColor:lol,paddingTop:5,borderRadius:15,paddingBottom:7}}>
                                                        <View style={{left:15,flexDirection:'row'}}>
                                                            <Image style={{alignSelf:'center',marginBottom:7,marginTop:5,width:40,height:40,borderRadius:100,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                                            <Text style={{marginLeft:7,fontFamily:'courierBold',fontSize:16,color:bgc,alignSelf:'center'}} >@{usernaame}</Text>
                                                            {isVerified?<Image source={require('./imgs/verified.png')} style={{marginLeft:5,marginBottom:0,alignSelf:'center',height:12,width:12,tintColor:bgc}} />:<View></View>}
                                                        </View>
                                                        
                                                        <TouchableWithoutFeedback >
                                                            <View>
                                                            {index[1].startsWith('none')?<View></View>:<Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[1]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />}
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                        <View style={{flexDirection:'row',flex:1}}>
                                                        <Text style={{fontFamily:'cour',fontSize:16,color:bgc,marginLeft:17,marginRight:40,width:Wwidth-80,paddingTop:15}} >{index[0]}</Text>
                                                        <TouchableOpacity style={{position:'absolute',right:10,bottom:60,flex:1,flexDirection:'row'}} onPress={() => LikeTap(idx)}>
                                                                <Image style={{opacity:1,height:32,width:32,tintColor:bgc,position:'absolute',right:13,top:30}} source={require('./imgs/like.png')}/>
                                                                
                                                        </TouchableOpacity>
                                                        <View style={{position:"absolute",right:11,bottom:-30,width:55}}>
                                                        {(() => {
                                                        if (!index[2]){
                                                            return (
                                                                <Text style={{textAlign:'center',marginTop:7,color:bgc,fontFamily:'cour',fontSize:16}} >0</Text>
                                                            )
                                                        }else{
                                                            if (index[2].length >= 1000) {
                                                                return(
                                                                    <Text style={{textAlign:'center',marginTop:7,color:bgc,fontFamily:'cour',fontSize:16}} >{String(index[2].length).slice(0,-3)+'.'+String(index[2].length)[2]}k</Text>
                                                                )
                                                            }else{
                                                                return(
                                                                <Text style={{textAlign:'center',marginTop:7,color:bgc,fontFamily:'cour',fontSize:16}} >{index[2].length}</Text>
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
  }else{
      return(
        <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[lol]} progressBackgroundColor={bgc} />}>
            <Text style={{fontFamily:'cour',color:lol,alignSelf:'center',fontSize:24,marginTop:100}}>reload</Text>
        </ScrollView>
      </SafeAreaView>
      ) 
  }
  
}

const Stack = createNativeStackNavigator();
export default function suck_Profile() {
  
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" component={suck_Profilee} options={{headerShown: false}}/>
          <Stack.Screen name="editP" component={editPP} options={({route}) => ({headerTintColor:lol,title:'edit profile',headerTitleStyle:{color:lol,fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
          <Stack.Screen name="comm" component={suckComm} options={({route}) => ({headerTintColor:lol,title:'comments',headerTitleStyle:{color:lol,fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
          <Stack.Screen name="settings" component={settings} options={({route}) => ({headerTintColor:lol,title:'settings',headerTitleStyle:{color:lol,fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


