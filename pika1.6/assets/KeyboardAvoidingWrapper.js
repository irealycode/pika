import React from 'react';
import AsyncStorage from'@react-native-async-storage/async-storage';
// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

//colors
var bgc = '#ffffff';
const KeyboardAvoidingWrapper = ({ children }) => {
  const [smt, setSmt] = React.useState(false);
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
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor:bgc}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper
