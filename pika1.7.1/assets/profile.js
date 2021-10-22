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

var bgc = '#ffffff';
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
        const okk = await AsyncStorage.getItem(STORAGE_KEY)
        if (okk) {
            bgc = okk
            console.log(okk)
            setSmttt(true);
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
      
      if (!loaded) {
        return null;
      }
    
  if (UserData[0]) {
    return (
        <View style={{backgroundColor:bgc,height:'100%'}}>
        <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:bgc}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={bgc}/>}>
              <View style={{marginBottom:15}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:'#00e8ff',position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}}/>
                  <View style={{position:'absolute',top:60,left:140,flexDirection:'row'}}>
                    <Text style={{color:'#00e8ff',fontSize:18,fontFamily:'cour'}} >@{UserData[3]}</Text>
                    {isVerified?<Image source={require('./imgs/verified.png')} style={{height:15,width:15,alignSelf:'center',marginLeft:7,marginBottom:3,tintColor:'#00e8ff'}} />:<View></View>}
                  </View>
                  
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData[0]}</Text>
                  <Text style={{color:'#00e8ff',fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData[1]}</Text>
                  <View style={{alignSelf:'center',flexDirection:'row',marginTop:150}}> 
                            <View style={{marginRight:15}}>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >following</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFreinds.length}</Text>
                            </View>
                            <View style={{marginRight:15,alignSelf:'center'}}>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >followers</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserFollowers.length}</Text>
                            </View>
                            <View>
                                    <Text style={{fontSize:14,fontFamily:'cour',color:'#00e8ff'}} >posts</Text>
                                    <Text style={{fontSize:18,fontFamily:'cour',color:'#00e8ff',alignSelf:'center'}} >{UserPosts.length}</Text>
                            </View>
                  </View>
                  
                  
                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:'#00e8ff',borderRadius:6,marginTop:10}} onPress={() => navigation.navigate('editP',{userD:UserData})}>
                      <Text style={{color:bgc,fontFamily:'cour',fontSize:16,alignSelf:'center'}}>edit profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:35,right:3}} onPress={() => navigation.navigate('settings')}>
                        <Image source={require('./imgs/settings.png')} style={{tintColor:'#00e8ff',height:30,width:30}} />
                  </TouchableOpacity>

              </View>
              <View style={{width:'80%',alignSelf:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{backgroundColor:isPost ? bgc:'#00e8ff',paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(false)}>
                      <Text style={{textAlign:"center",color:isPost ? '#00e8ff':bgc,fontFamily:'cour',fontSize:16}}>pics</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: isPost ? '#00e8ff':bgc,paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(true)}>
                      <Text style={{textAlign:"center",color:isPost ? bgc:'#00e8ff',fontFamily:'cour',fontSize:16}}>posts</Text>
                  </TouchableOpacity>
              </View>
              {/* <TouchableOpacity style={{width:50,height:50,backgroundColor:'#000000'}} onPress={() => lol()}>

              </TouchableOpacity> */}
              {!isPost?                  <View style={{backgroundColor:'#00e8ff',paddingTop:0,borderRadius:15,paddingBottom:20,marginBottom:10}}>
              {!userImgs[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:'#00e8ff',borderRadius:30}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>you don't have any pics</Text></View>:<View style={{backgroundColor:'#00e8ff',paddingTop:35,borderRadius:30}}></View>}
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
                                {!UserPOSTSS[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:'#00e8ff',borderRadius:30}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:bgc}}>you don't have any posts</Text></View>:<View></View>}
                                    {
                                        
                                        UserPOSTSS.map((index,idx)=>{
                                            return(
                                              <View key={index}>
                                                    <View style={{backgroundColor:'#00e8ff',paddingTop:5,borderRadius:15,paddingBottom:7}}>
                                                        <View>
                                                              <Text style={{fontFamily:'cour',fontSize:16,color:bgc,position:'absolute',top:10,left:60}} >@{usernaame}</Text>
                                                              <Image style={{width:40,height:40,borderRadius:100,marginLeft:15,marginTop:5,marginBottom:5,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
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
                                                    <View style={{height:20,width:10,alignSelf:'center',backgroundColor:'#00e8ff'}}></View>
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={bgc} />}>
            <Text style={{fontFamily:'cour',color:'#00e8ff',alignSelf:'center',fontSize:24,marginTop:100}}>reload</Text>
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
          <Stack.Screen name="editP" component={editPP} options={({route}) => ({headerTintColor:'#00e8ff',title:'edit profile',headerTitleStyle:{color:'#00e8ff',fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
          <Stack.Screen name="comm" component={suckComm} options={({route}) => ({headerTintColor:'#00e8ff',title:'comments',headerTitleStyle:{color:'#00e8ff',fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
          <Stack.Screen name="settings" component={settings} options={({route}) => ({headerTintColor:'#00e8ff',title:'settings',headerTitleStyle:{color:'#00e8ff',fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


