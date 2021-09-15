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
  
  React.useEffect(() => {
    (async () => {
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
    })()
  }, [])
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

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
      <SafeAreaView style={{backgroundColor:'#ffffff',height:'100%'}}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00e8ff']} progressBackgroundColor={'#ffffff'} />}>
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
                                        <Text style={{fontFamily:'cour',fontSize:16,color:'#ffffff',position:'absolute',top:10,left:60}} >@{index[0]}</Text>
                                        <Image style={{width:40,height:40,borderRadius:100,marginLeft:15,marginTop:5,marginBottom:5,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[3]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                  </TouchableOpacity>
                                  
                                  <TouchableWithoutFeedback onPress={() => DoubleTap(idx)} onLongPress={() => {setLongPressed(true);console.log('long press in');navigation.navigate('postImg',{postArray:index})}} onPressOut={() => {if (LongPress) {console.log('long press out');setLongPressed(false);navigation.navigate('home')}}}>
                                      <View>
                                        <Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:'#ffffff'}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+index[2]+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'}} />
                                      </View>
                                  </TouchableWithoutFeedback>
                                  <View style={{flexDirection:'row',flex:1}}>
                                  <Text style={{fontFamily:'cour',fontSize:16,color:'#ffffff',marginLeft:17,marginRight:40}} >{index[1]}</Text>
                                  <TouchableOpacity style={{position:'absolute',right:10,bottom:-3,flex:1,flexDirection:'row'}}>
                                        <Image style={{opacity:count[idx],height:32,width:32,tintColor:'#ffffff',position:'absolute',right:13,top:5}} source={require('./imgs/like.png')} />
                                        <Image style={{opacity:1,height:32,width:32,tintColor:'#ffffff',position:'absolute',right:13,top:5}} source={require('./imgs/likeB.png')} />
                                        <Text style={{marginTop:7,color:'#ffffff',fontFamily:'cour',fontSize:16}} >{likes[idx].length}</Text>
                                  </TouchableOpacity>                                  
                                  </View>
                                  <TouchableOpacity onPress={() => navigation.navigate('comm', {postA:index})}>
                                        <Text style={{paddingHorizontal:20,fontFamily:'cour',color:'#ffffff',paddingVertical:0}}>go to comments...</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{height:20,width:10,alignSelf:'center',backgroundColor:'#00e8ff'}}></View>
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
export default function main_home() {
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="home" screenOptions={{headerShown: false}} >
        <Stack.Screen name="home" component={home_s} />
        <Stack.Screen name="viewP" component={viewProfile} />
        <Stack.Screen name="comm" component={suckComm} />
        <Stack.Screen name="postImg" component={viewPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}