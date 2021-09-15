import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';

//colors

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor:'#ffffff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper
