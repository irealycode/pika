import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Animated,StyleSheet, Text, View,Image, TouchableOpacity, TextInput,SafeAreaView,ScrollView,RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';
import '@firebase/firestore';
import { Dimensions } from 'react-native';
import viewProfile from './ViewProfile2';
import suckComm from './POSTcomments';
import viewPost from './viewPost';
import { usernaame,userLogo } from './login';
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
var MaxDelayTap = 500;
let AllPosts = [];
let OnePost = [];
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
AllPosts = [];
let likePost = [];
let ct = [];
let Wwidth = Dimensions.get('window').width;
function home_s({navigation}){
  const [refreshing, setRefreshing] = React.useState(false);
  const [LongPress, setLongPressed] = React.useState(false);
  const [liked,setliked] = React.useState([]);
  const [AllPosts1,setPL] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [likes, setLikes] = React.useState([]);
  const [smt, setSmt] = React.useState(false);

  React.useEffect(() => {
    (async () => {
  //       AllPosts = [];
  //       OnePost = [];
  //       likePost = [];
  //       let likedP = [];
  //       let likedP2 = [];
  //       ct = [];
  //       const postsRef = db.collection('posts').orderBy('createdAt');
  //       const snapshot = await postsRef.get();
  //       snapshot.forEach(async (doc) => {
  //       OnePost = [];
  //       OnePost.push(doc.data().owner)
  //       OnePost.push(doc.data().postCap)
  //       OnePost.push(doc.data().postImg)
  //       OnePost.push(doc.data().ownerPic)
  //       if (doc.data().likes) {
  //           OnePost.push(doc.data().likes)
  //           likedP.push(doc.data().likes)
  //           let ok = doc.data().likes;
  //           if (ok.indexOf(usernaame+',/,'+userLogo) > -1) {
  //               ct.push(1);
  //           }else{
  //               ct.push(0);
  //           }
  //       }else{
  //           likedP.push([])
  //       }
        
  //       likePost.push(OnePost);
  //       AllPosts.push(OnePost);
  //       });
  //       setCount(ct);
  //       setLikes(likedP);
  //       console.log('1112:',likes);
  //       setPL(AllPosts);
  onAStart();
    })()
  }, [])
  const onAStart = async() => {
    AllPosts = [];
    OnePost = [];
    likePost = [];
    let likedP = [];
    let likedP2 = [];
    ct = [];
    const postsRef = db.collection('posts').orderBy('createdAt');
    const snapshot = await postsRef.get();
    snapshot.forEach(async (doc) => {
    OnePost = [];
    OnePost.push(doc.data().owner)
    OnePost.push(doc.data().postCap)
    OnePost.push(doc.data().postImg)
    OnePost.push(doc.data().ownerPic)
    if (doc.data().likes) {
        OnePost.push(doc.data().likes)
        likedP.push(doc.data().likes)
        let ok = doc.data().likes;
        if (ok.indexOf(usernaame+',/,'+userLogo) > -1) {
            ct.push(1);
        }else{
            ct.push(0);
        }
    }else{
        likedP.push([])
    }
    
    likePost.push(OnePost);
    AllPosts.push(OnePost);
    });
    setCount(ct);
    setLikes(likedP);
    console.log('1112:',likes);
    setPL(AllPosts);
  }
  // onAStart();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onAStart();
    wait(1500).then(() => setRefreshing(false),);
    
}, []);
let i = 0;
const DoubleTap = async(idx) => {
    i += 1;
    if (i >= 2) {
        OnLIkee(idx)
    }
    wait(270).then(() => i=0)
}
const LikeTap = async(idxx) => {
    OnLIkee(idxx)
}
const loadTheme = async() => {
  const STORAGE_KEY = '@save_theme'
  const okk = await AsyncStorage.getItem(STORAGE_KEY)
  if (okk) {
      bgc = okk
      console.log(okk)
      setSmt(true);
  }else{
      await AsyncStorage.setItem(STORAGE_KEY, '#ffffff')
  }
}
loadTheme()
const OnLIkee = async(idx) =>{
    ct = count;
    setCount([]);
    for (let uur = 0; uur < ct.length; uur++) {
        if (uur == idx) {
            setCount(count => [...count, 1])
        }else{
            if (ct[uur] != 1) {
                setCount(count => [...count, 0])
            }else{
                setCount(count => [...count, 1])
            }
            
        }
    }
    if (likes[idx].indexOf(usernaame+',/,'+userLogo) > -1) {
        console.log('nope')
    }else{
        let likedPo = likes;
        likes.map((ok,index)=>{
            if (index == idx) {
                likedPo[idx].push(usernaame+',/,'+userLogo)   
            }
        })
        setLikes(likedPo);
        console.log('yeeeeeeeeeeeeeeeeeeeeeeeeeee:',likes)
    }
    const postsRef1 = db.collection('posts').doc(AllPosts1[idx][2]).update({likes: firebase.firestore.FieldValue.arrayUnion(usernaame+',/,'+userLogo)});
}
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  

    return(
      <SafeAreaView style={{backgroundColor:bgc,height:'100%'}}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={bgc} />}>
          <View>
              <View style={{marginTop:20,marginBottom:10}} >
                  <Text style={{alignSelf:'center',color:'#00e8ff',fontSize:34,fontFamily:'cour'}}>pika</Text>
              </View>
              <View style={{marginBottom:54}}>
                  {
                    AllPosts1.map((index,idx)=>{
                      
                      return(
                        <View key={index}>
                              <View style={{backgroundColor:'#00e8ff',paddingTop:5,borderRadius:15,}}>
                                  <TouchableOpacity onPress={() => navigation.navigate('viewP',{userN:index[0]})}>
                                        <Text style={{fontFamily:'cour',fontSize:16,color:bgc,position:'absolute',top:10,left:60}} >@{index[0]}</Text>
                                        <Image style={{width:40,height:40,borderRadius:100,marginLeft:15,marginTop:5,marginBottom:5,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[3]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                  </TouchableOpacity>
                                  
                                  <TouchableWithoutFeedback onPress={() => DoubleTap(idx)} onLongPress={() => {setLongPressed(true);console.log('long press in');navigation.navigate('postImg',{postArray:index})}} onPressOut={() => {if (LongPress) {console.log('long press out');setLongPressed(false);navigation.navigate('home')}}}>
                                      <View>
                                        {index[2].startsWith('none')?<View></View>:<Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[2]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />}
                                        
                                      </View>
                                  </TouchableWithoutFeedback>
                                  <View style={{flexDirection:'row',flex:1}}>
                                  <Text style={{fontFamily:'cour',fontSize:16,color:bgc,marginLeft:17,marginRight:40}} >{index[1]}</Text>
                                  <TouchableOpacity style={{position:'absolute',right:10,bottom:6,flex:1,flexDirection:'row'}} onPress={() => LikeTap(idx)}>
                                        <Image style={{opacity:count[idx],height:32,width:32,tintColor:bgc,position:'absolute',right:13,top:30}} source={require('./imgs/like.png')}/>
                                        <Image style={{opacity:1,height:32,width:32,tintColor:bgc,position:'absolute',right:13,top:30}} source={require('./imgs/likeB.png')} />
                                        <TouchableOpacity onPress={() => LikeTap(idx)} style={{width:20,height:20,marginTop:35,marginRight:20}}></TouchableOpacity>
                                  </TouchableOpacity>    
                                  <View style={{position:"absolute",right:11,bottom:-30,width:55}}>
                                        {likes[idx].length < 1000?<Text style={{textAlign:'center',color:bgc,fontFamily:'cour',fontSize:16}} >{likes[idx].length}</Text>:<Text style={{textAlign:'center',color:bgc,fontFamily:'cour',fontSize:16}} >{String(likes[idx].length).slice(0,-3)+'.'+String(likes[idx].length)[2]}k</Text>}
                                  </View>          
                                  </View>
                                  <TouchableOpacity onPress={() => navigation.navigate('comm', {postA:index})}>
                                        <Text style={{paddingHorizontal:20,fontFamily:'cour',color:bgc,paddingVertical:0}}>go to comments...</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{height:5,width:10,alignSelf:'center',backgroundColor:'#00e8ff'}}></View>
                        </View>
                      
                      );
                    }).reverse()
                  }
            </View>
          </View>
          </ScrollView>
      </SafeAreaView>
    )
  
}


const Stack = createNativeStackNavigator();
Stack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;
  return { 
    tabBarVisible,
  }
}
export default function main_home() {
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="home"  >
        <Stack.Screen name="home" component={home_s} options={{headerShown: false}}/>
        <Stack.Screen name="viewP" component={viewProfile} options={{headerShown: false}}/>
        <Stack.Screen name="comm" component={suckComm} options={({route}) => ({headerTintColor:'#00e8ff',title:'comments',headerTitleStyle:{color:'#00e8ff',fontFamily:'cour'},headerStyle:{backgroundColor:bgc}})}/>
        <Stack.Screen name="postImg" component={viewPost} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}