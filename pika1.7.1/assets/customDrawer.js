import { useFonts } from 'expo-font';
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { Updates } from 'expo';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Restart} from 'fiction-expo-restart';
import { usernaame } from './login';
import AsyncStorage from'@react-native-async-storage/async-storage';

// const CustomSidebarMenu = (props) => {

//   const [loaded] = useFonts({
//     cour: require('./fonts/cour.ttf'),
//   });
  
//   if (!loaded) {
//     return null;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/*Top Large Image */}
//       <Text >pika</Text>
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>
//       <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
//         www.aboutreact.com
//       </Text>
//     </SafeAreaView>
//   );
// };
var bgc = '#ffffff';
const CustomSidebarMenu = (props) => {
  
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
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
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:bgc}}>

      <View style={{backgroundColor:'#00e8ff',paddingBottom:30,borderBottomRightRadius:30,borderBottomLeftRadius:30}}>
        <Text style={{color:bgc,fontFamily:'cour',fontSize:45,alignSelf:'center',marginTop:70}} >pika</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <Text style={{marginBottom:10,color:'#00e8ff',fontSize:16,alignSelf:'center',fontFamily:'cour'}} >@{usernaame}</Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={{ padding:10,backgroundColor:'#00e8ff',marginBottom:20,borderRadius:30,alignSelf:'center',paddingHorizontal:30 }} onPress={() => Restart()}>
         <Text style={{color:bgc,fontFamily:'cour',fontSize:16}}>logout</Text>
       </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
