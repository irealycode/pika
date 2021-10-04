import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import '@firebase/firestore';



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

export default function suck_upload({route, navigation}) {
    const {data} = route.params;
    UserData = data;
    console.log('user data1:',UserData);
    const [IsUploading, SetUploading] = useState(false);

    const [image, setImage] = useState(null);
    const [Images,setImages] = useState([]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 5],
      quality: 0.3,
    });
    if(result.uri){
        setImages([...Images,result.uri]);
        console.log(Images);
    }
    
    }

    const deleteImg = (index) => {
        let ImgsCopy = [...Images];
        ImgsCopy.splice(index, 1);
        setImages(ImgsCopy);
    }
    
    console.log('maybe',Images);
    const [loaded] = useFonts({
        cour: require('./fonts/cour.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

    const Upload_Img = async(ImgFile) =>{
      if (Images.length > 0) {
        SetUploading(true);
        for (let nudes = 0; nudes < Images.length; nudes++) {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                  resolve(xhr.response);
                };
                xhr.onerror = function () {
                  reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", Images[nudes], true);
                xhr.send(null);
              });
              let r = (Math.random() + 1).toString(36).substring(2, 100);
              UserData.push(r);
              const ref = firebase.storage().ref().child(`${r}`)
              const snapshot = await ref.put(blob).then(() =>{
                if (nudes == Images.length -1) {
                    blob.close();
                    console.log('done.');
                    const res = db.collection('users').doc(UserData[3]).set({userdata: UserData,friends: ['pika'],followers:[]});
                    SetUploading(false);
                    navigation.navigate('login');
                }else{
                    console.log('not yet.......');
                }
              })
        }
      }else{
          alert('choose at least one picture')
      }
              
        
        

        // const file = fetch(ImgFile);
        // const storageRef = firebase.storage().ref();
        // let r = (Math.random() + 1).toString(36).substring(2, 100);
        // console.log(r);
        // const ref = storageRef.child(`${r}`);
        // const snapshot = await ref.put(file);
        // const remoteURL = await snapshot.ref.getDownloadURL();
        // console.log('Uploaded a file!', remoteURL);

    }

  
  return (
<KeyboardAvoidingWrapper>
    <View style={{backgroundColor:'#ffffff',height:'100%'}}>
        <View style={{width:'100%', backgroundColor:'#00e8ff',borderBottomLeftRadius:40,borderBottomRightRadius:40,paddingBottom:25, marginBottom:30}}>
            
            <TouchableOpacity style={{alignSelf:'center', marginTop:100,backgroundColor:'#ffffff',paddingHorizontal:30,paddingTop:7,borderRadius:150}} onPress={pickImage}>
            <Text style={{color:'#00e8ff', fontSize:40, fontFamily:'cour'}} >+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:0,marginTop:0}}>
                {!IsUploading ? <Text style={{color:'#ffffff',fontFamily:'cour',fontSize:24,alignSelf:'center'}} onPress={() => Upload_Img(Images[0])}>next</Text>:<ActivityIndicator size='large' color='#ffffff' />}
            </TouchableOpacity>
            <Text style={{color:'#ffffff',fontFamily:'cour',alignSelf:'center',fontSize:12}}>the first image is your profile picture</Text>
            {
                Images.map((image,index)=>{
                    
                    return (
                        <View key={index} style={{height:500,width:300,alignSelf:'center',marginBottom:10}}>
                            <Image style={{height:500,width:300,borderRadius:30,borderWidth:2,borderColor:'#ffffff'}} source={{uri:Images[index]}} />
                            <TouchableOpacity style={{position:'absolute', bottom:27,right:20,backgroundColor:'#ffffff', height:50,width:50,borderRadius:150}} onPress={() => deleteImg(index)}>
                                <Text style={{position:'absolute',bottom:-27,alignSelf:'center',color:'red',fontSize:50,fontFamily:'cour'}}>x</Text>
                            </TouchableOpacity>
                            
                        </View>
                    )
                })
                    
                
            }
            
        </View>
    </View>
    </KeyboardAvoidingWrapper>
  );
}

