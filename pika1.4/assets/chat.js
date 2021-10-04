// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat, InputToolbar, Send, Bubble, Avatar } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, View, Button,Text } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { useFonts } from 'expo-font'
import { usernaame } from './login'
import { userLogo } from './login'


const firebaseConfig = {
    apiKey: "AIzaSyCDI2ja9Xq8AJzkEWDlbYvVaEuI5walkPM",
    authDomain: "pika-4f9d6.firebaseapp.com",
    projectId: "pika-4f9d6",
    storageBucket: "pika-4f9d6.appspot.com",
    messagingSenderId: "1031058737191",
    appId: "1:1031058737191:web:4be644a19a5e1ef7bee602",
    measurementId: "G-WE4G2DDECB"  
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}


const db = firebase.firestore()
const ll = 'ok';
let UserChatsList1 = [];
export default function suck_chattt({route, navigation}) {
    let Cfirst = 1;
    let Csecond = 1;
    let roomID = '';
    const {Rdata} = route.params;
    // console.log('oksdfnvskfbvhec:',Rdata)
    const [colT, setCol] = useState('ok');
    const [user, setUser] = useState(null)
    let name = usernaame;
    const [messages, setMessages] = useState([])
    
    
    const customtInputToolbar = props => {
        return (
          <InputToolbar {...props}containerStyle={{backgroundColor: "#000000",borderTopColor: "#fffffff",borderTopWidth: 4,padding: 8}}/>
        );
      };
    
      const renderAvatar = props => {
        return (
          <View style={{marginRight: -4,marginBottom:10,borderColor:'#00e8ff',borderWidth:2,borderRadius:100,padding:0,width:40}}>
            <Avatar
              {...props}
              
            />
          </View>
        );
      };

    for (let test1 = 0; test1 < usernaame.length; test1++) {
        Cfirst *= usernaame.charCodeAt(test1);
    }
    for (let test2 = 0; test2 < Rdata[3].length; test2++) {
        Csecond *= Rdata[3].charCodeAt(test2);
    }
    roomID = String(Cfirst * Csecond);
    console.log('id: ',roomID)
      
    const chatsRef = db.collection(roomID);
    const userRef = db.collection('users').doc(usernaame);
    const userRef2 = db.collection('users').doc(Rdata[3]);
        useEffect(() => {
            readUser()
            const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const message = doc.data()
                        return { ...message, createdAt: message.createdAt.toDate() }
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                appendMessages(messagesFirestore)
            })
            return () => unsubscribe()
        }, [])

        const appendMessages = useCallback(
            (messages) => {
                setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
            },
            [messages]
        )

        async function readUser() {
            const _id = usernaame+'328737f';
            const avatar = 'https://firebasestorage.googleapis.com/v0/b/pika-4f9d6.appspot.com/o/'+userLogo+'?alt=media&token=63a74aae-9e63-4382-a1fa-9179491c5f16'
            const user = { _id, name, avatar }
            setUser(user)
        }
        
        async function handleSend(messages) {
          const chatRef1 = userRef.update({fchat: firebase.firestore.FieldValue.arrayUnion(Rdata[3],Rdata[5])});
          const chatRef2 = userRef2.update({fchat: firebase.firestore.FieldValue.arrayUnion(usernaame,userLogo)});
            const writes = messages.map((m) => chatsRef.add(m))
            await Promise.all(writes)
        }
        const [loaded] = useFonts({
            cour: require('./fonts/cour.ttf'),
          });
          
          if (!loaded) {
            return null;
          }
        
        return <GiftedChat messagesContainerStyle={{backgroundColor:'#f7f7f7'}} showAvatarForEveryMessage={false} renderAvatar={(props) => renderAvatar(props)} renderBubble={(props) => <Bubble {...props} wrapperStyle={{right:{bottom:10,backgroundColor:'#00e8ff',borderWidth:2,borderColor:'#ffffff',},left:{bottom:10,backgroundColor:'#ffffff',borderWidth:2,borderColor:'#00e8ff'}}} textStyle={{left:{color:'#00e8ff',fontFamily:'cour'},right:{color:'#ffffff',fontFamily:'cour'}}} />} renderSend={(props) => <Send {...props} containerStyle={{borderWidth:0,}} textStyle={{color:'#00e8ff',fontFamily:'cour',top:8}}  />} renderInputToolbar={(props) => <InputToolbar {...props}containerStyle={{backgroundColor: "#ffffff",borderTopColor: "#00e8ff",borderTopWidth:2,borderColor: "#00e8ff",borderWidth: 2,padding: 5,borderRadius:10,elevation:0}} textInputStyle={{ color: "#00e8ff",fontFamily:'cour' }} placeholder='message...' />} messages={messages} user={user} onSend={handleSend} />

        
     
    // if (colT) {
                    // const chatsRef = db.collection(Rdata[3]+'to'+usernaame);
                    // useEffect(() => {
                    //     readUser()
                    //     const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
                    //         const messagesFirestore = querySnapshot
                    //             .docChanges()
                    //             .filter(({ type }) => type === 'added')
                    //             .map(({ doc }) => {
                    //                 const message = doc.data()
                    //                 return { ...message, createdAt: message.createdAt.toDate() }
                    //             })
                    //             .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                    //         appendMessages(messagesFirestore)
                    //     })
                    //     return () => unsubscribe()
                    // }, [])

                    // const appendMessages = useCallback(
                    //     (messages) => {
                    //         setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
                    //     },
                    //     [messages]
                    // )

                    // async function readUser() {
                    //     const _id = usernaame+'328737f';
                    //     const user = { _id, name }
                    //     setUser(user)
                    // }
                    
                    // async function handleSend(messages) {
                    //     const writes = messages.map((m) => chatsRef.add(m))
                    //     await Promise.all(writes)
                    // }

                    
                    // return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    // }else{
        
                        // const chatsRef = db.collection(usernaame+'to'+Rdata[3]);
                        // useEffect(() => {
                        //     readUser()
                        //     const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
                        //         const messagesFirestore = querySnapshot
                        //             .docChanges()
                        //             .filter(({ type }) => type === 'added')
                        //             .map(({ doc }) => {
                        //                 const message = doc.data()
                        //                 return { ...message, createdAt: message.createdAt.toDate() }
                        //             })
                        //             .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                        //         appendMessages(messagesFirestore)
                        //     })
                        //     return () => unsubscribe()
                        // }, [])

                        // const appendMessages = useCallback(
                        //     (messages) => {
                        //         setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
                        //     },
                        //     [messages]
                        // )

                        // async function readUser() {
                        //     const _id = usernaame+'328737f';
                        //     const user = { _id, name }
                        //     setUser(user)
                        // }
                        
                        // async function handleSend(messages) {
                        //     const writes = messages.map((m) => chatsRef.add(m))
                        //     await Promise.all(writes)
                        // }

                        
                        // return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    // }
    

    // const chatsRef = db.collection('urmomtohehe');
    //     useEffect(() => {
    //         readUser()
    //         const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
    //             const messagesFirestore = querySnapshot
    //                 .docChanges()
    //                 .filter(({ type }) => type === 'added')
    //                 .map(({ doc }) => {
    //                     const message = doc.data()
    //                     return { ...message, createdAt: message.createdAt.toDate() }
    //                 })
    //                 .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    //             appendMessages(messagesFirestore)
    //         })
    //         return () => unsubscribe()
    //     }, [])

    //     const appendMessages = useCallback(
    //         (messages) => {
    //             setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    //         },
    //         [messages]
    //     )

    //     async function readUser() {
    //         const _id = usernaame+'328737f';
    //         const user = { _id, name }
    //         setUser(user)
    //     }
        
    //     async function handleSend(messages) {
    //         const writes = messages.map((m) => chatsRef.add(m))
    //         await Promise.all(writes)
    //     }

        
    //     return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    
}


