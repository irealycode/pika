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
    UserData = [];
    userImgs = [];
    const {data , UserNum} = route.params;
    UserData = data;
    for (let eas = 5; eas < UserData.length; eas++) {
        userImgs.push(UserData[eas]);
    }

    React.useEffect(() => {
        (async () => {
            const usersRef = db.collection('users').doc(usernaame);
            const FollowersRef = db.collection('users').doc(UserData[3]);
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
      <View style={{backgroundColor:'#ffffff',height:'100%'}}>
    <SafeAreaView style={{backgroundColor:'#ffffff'}}>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'}/>}>
              <View style={{height:290}}>
                  <Image style={{height:100,width:100,borderRadius:150,borderWidth:2,borderColor:'#00e8ff',position:'absolute',top:40,left:35}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}}/>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:60,left:140}} >@{UserData[3]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:18,fontFamily:'cour',top:90,left:140}} >{UserData[0]}</Text>
                  <Text style={{position:'absolute',color:'#00e8ff',fontSize:16,fontFamily:'cour',top:140,left:50}} >{UserData[1]}</Text>
                  <TouchableOpacity style={{alignSelf:'center',height:30,width:'80%',backgroundColor:'#00e8ff',borderRadius:6,marginTop:250}} onPress={() => FollowUser()}>
                      {!following?<Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>follow</Text>:<Text style={{color:'#ffffff',fontFamily:'cour',fontSize:16,alignSelf:'center'}}>following</Text>}
                  </TouchableOpacity>
                  <TouchableOpacity style={{height:50,width:50,position:'absolute',top:25,left:7,padding:10}} onPress={() => navigation.navigate('search')}>
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
              <View style={{width:'80%',alignSelf:'center',flexDirection:'row'}}>
                  <TouchableOpacity style={{backgroundColor:isPost ? '#ffffff':'#00e8ff',paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(false)}>
                      <Text style={{textAlign:"center",color:isPost ? '#00e8ff':'#ffffff',fontFamily:'cour',fontSize:16}}>pics</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor: isPost ? '#00e8ff':'#ffffff',paddingVertical:10,borderTopLeftRadius:30,borderTopRightRadius:30,width:'50%'}} onPress={() => setisPost(true)}>
                      <Text style={{textAlign:"center",color:isPost ? '#ffffff':'#00e8ff',fontFamily:'cour',fontSize:16}}>posts</Text>
                  </TouchableOpacity>
              </View>

              {!isPost?                  <View style={{backgroundColor:'#00e8ff',paddingTop:35,borderRadius:30,paddingBottom:77}}>
              {
                  userImgs.map((image,index)=>{
                    
                    if (index == 0) {
                        return (
                            <View key={index} style={{height:200,width:200,alignSelf:'center',marginBottom:10}}>
                                <Image style={{height:200,width:200,borderRadius:200,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                
                            </View>
                        )
                    }else{
                        return (
                            <View key={index} style={{height:500,width:300,alignSelf:'center',marginBottom:10}}>
                                <Image style={{height:500,width:300,borderRadius:30,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userImgs[index]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                
                            </View>
                        )
                    }
                }).reverse()
              }
              </View>:<View style={{marginBottom:50}}>
                  {!UserPOSTSS[0] ? <View style={{width:Wwidth,paddingVertical:20,backgroundColor:'#00e8ff',borderRadius:30}} ><Text style={{textAlign:'center',fontFamily:'cour',fontSize:16,color:'#ffffff'}}>{UserData[0]} doesn't have any posts</Text></View>:<View></View>}
                                    {
                                        UserPOSTSS.map((index,idx)=>{
                                            // console.log('asdjkhcbasdhbcadbh:',index)
                                            return(
                                              <View key={index}>
                                                    <View style={{backgroundColor:'#00e8ff',paddingTop:5,borderRadius:15,paddingBottom:7}}>
                                                        <View>
                                                              <Text style={{fontFamily:'cour',fontSize:16,color:'#ffffff',position:'absolute',top:10,left:60}} >@{usernaame}</Text>
                                                              <Image style={{width:40,height:40,borderRadius:100,marginLeft:15,marginTop:5,marginBottom:5,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+UserData[5]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                                        </View>
                                                        
                                                        <TouchableWithoutFeedback >
                                                            <View>
                                                              <Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[1]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                        <View style={{flexDirection:'row',flex:1}}>
                                                        <Text style={{fontFamily:'cour',fontSize:16,color:'#ffffff',marginLeft:17,marginRight:40}} >{index[0]}</Text>
                                                        <TouchableOpacity style={{position:'absolute',right:10,bottom:-3,flex:1,flexDirection:'row'}}>
                                                              <Image style={{opacity:1,height:32,width:32,tintColor:'#ffffff',position:'absolute',right:13,top:5}} source={require('./imgs/like.png')} />
                                                              {!index[2]?<Text style={{marginTop:7,color:'#ffffff',fontFamily:'cour',fontSize:16}} >0</Text>:<Text style={{marginTop:7,color:'#ffffff',fontFamily:'cour',fontSize:16}} >{index[2].length}</Text>}
                                                        </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity onPress={() => navigation.navigate('comm', {postA:Commpost[idx]})}>
                                                                <Text style={{paddingHorizontal:20,fontFamily:'cour',color:'#ffffff',paddingVertical:0}}>go to comments...</Text>
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
}


