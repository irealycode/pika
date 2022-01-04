import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import { usernaame,userLogo } from './login';
import AsyncStorage from'@react-native-async-storage/async-storage'

var bgc = '#ffffff';
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


let mcolor = '#00e8ff';

const loadTheme = async() => {
    const STORAGE_KEY = '@save_theme'
    const KEY101 = '@urmomsahoe'
    const okk = await AsyncStorage.getItem(STORAGE_KEY)
    const okk1 = await AsyncStorage.getItem(KEY101)
    if (okk && okk1) {
        bgc = okk
        mcolor = okk1
    }else{
        await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
        await AsyncStorage.setItem(KEY101, '#00e8ff')
    }
}
loadTheme();
let Wwidth = Dimensions.get('window').width;
export default function suck_post() {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp;
    const [IsUploading, SetIsUploading] = React.useState(false);
    const [ChoseaPh, SetChoseaPh] = React.useState(false);
    const [ImgSize,setImgSize] = React.useState([]);
    const [PostImg, setPostImg] = React.useState('ok');
    const [PostCaption, setPostCap] = React.useState('');
    const [isVerified, setisVerfied] = React.useState(false);
    React.useEffect(() => {
        (async () => {
            const usersRef = db.collection('users').doc(usernaame);
            usersRef.get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                    if (doc.data().verified) {
                        setisVerfied(true);
                    }
                });
                }
            })
        })()
      }, [])
    const uploadPostImg = async () =>{
        if (PostImg == 'ok') {
                
                if (PostCaption == '' || PostCaption.charAt(0) == ' ' || PostCaption.length < 10) {}
                else{
                    SetIsUploading(true);
                    let r = (Math.random() + 1).toString(36).substring(2, 100);
                    const res = db.collection('posts').doc('none'+r).set({likes:[],owner:usernaame,postImg:'none'+r,postCap:PostCaption,ownerPic:userLogo,createdAt: timestamp()});
                    let usrPost = [];
                    usrPost.push('none'+r);
                    const res1 = db.collection('users').doc(usernaame).update({posts: firebase.firestore.FieldValue.arrayUnion('none'+r)})
                    console.log('should be uploaded')
                    SetIsUploading(false);
                }
        }else{
            SetIsUploading(true);
            const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                        reject(new TypeError("Network request failed"));
                    };
                    xhr.responseType = "blob";
                    xhr.open("GET", PostImg, true);
                    xhr.send(null);
            });
                let r = (Math.random() + 1).toString(36).substring(2, 100);
                const ref = firebase.storage().ref().child(`${r}`)
                const snapshot = await ref.put(blob).then(() =>{
                    blob.close();
                    console.log('done.');
                    const res = db.collection('posts').doc(r).set({likes:[],owner:usernaame,postImg:r,postCap:PostCaption,ownerPic:userLogo,createdAt: timestamp()});
                    let usrPost = [];
                    usrPost.push(r);
                    const res1 = db.collection('users').doc(usernaame).update({posts: firebase.firestore.FieldValue.arrayUnion(r)})
                    SetIsUploading(false);
                    setPostImg('ok')
                    setPostCap('');
                    SetChoseaPh(false)
                });
        }
    
    }
    
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
      });
      if(result.uri){
          setPostImg(result.uri)
          const {width, height} = Image.resolveAssetSource({uri:result.uri});
          setImgSize([ width, height ]);
          console.log(ImgSize)
          SetChoseaPh(true)
      }
      
      }

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

    
  return (
      <KeyboardAvoidingWrapper>
      <View style={{backgroundColor:bgc,paddingBottom:100}} >
          <Text style={{alignSelf:'center',fontSize:22,fontFamily:'cour',color:mcolor,marginTop:30}} >add a post</Text>
          <TouchableOpacity style={{alignSelf:'center', marginTop:25,backgroundColor:bgc,height:100,width:100,borderRadius:150,borderWidth:2,borderRadius:120,borderColor:mcolor,flex:1,flexDirection:'column',justifyContent:'center'}} onPress={pickImage}>
            <Text style={{color:mcolor, fontSize:40, fontFamily:'cour',textAlign:'center',marginTop:3}} >+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center',marginTop:40,width:130,textAlign:'center',backgroundColor:mcolor,borderRadius:20}} onPress={uploadPostImg}>
                {!IsUploading?<Text style={{fontSize:20,fontFamily:'cour',color:bgc,alignSelf:'center'}} >post</Text>:<ActivityIndicator size='large' color={bgc} />}
            </TouchableOpacity>
            <View style={{marginTop:30,backgroundColor:mcolor,paddingTop:5,borderRadius:15,}}>
                                                    <View style={{left:15,flexDirection:'row'}}>
                                                            <Image style={{alignSelf:'center',marginBottom:7,marginTop:5,width:40,height:40,borderRadius:100,borderWidth:2,borderColor:bgc}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userLogo+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16?time='+String(new Date).slice(0,21)}} />
                                                            <Text style={{marginLeft:7,fontFamily:'courierBold',fontSize:16,color:bgc,alignSelf:'center'}} >@{usernaame}</Text>
                                                            {isVerified?<Image source={require('./imgs/verified.png')} style={{marginLeft:5,marginBottom:0,alignSelf:'center',height:12,width:12,tintColor:bgc}} />:<View></View>}
                                                        </View>
                {!ChoseaPh?<View></View>:<Image style={{alignSelf:'center',height:Wwidth,width:Wwidth,borderRadius:15,borderWidth:2,borderColor:bgc}} source={{uri:PostImg}} />}
                
                <TextInput style={{marginTop:5 ,width:'95%',color:bgc,fontFamily:'cour',fontSize:16,paddingLeft:20}} placeholder='add caption...' placeholderTextColor={bgc} onChangeText={(text) => setPostCap(text)} value={PostCaption} maxLength={400} multiline={true}/>
            </View>
            
      </View>
      </KeyboardAvoidingWrapper>
  );

}

