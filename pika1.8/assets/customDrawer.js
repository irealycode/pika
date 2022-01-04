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
var bgc = '#1a1a1a';
var lol = '#00e8ff';
const loadTheme = async() => {
  const STORAGE_KEY = '@save_theme'
  const KEY101 = '@urmomsahoe'
  const okk = await AsyncStorage.getItem(STORAGE_KEY)
  const okk1 = await AsyncStorage.getItem(KEY101)
  if (okk && okk1) {
      bgc = okk
      lol = okk1
  }else{
      await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
      await AsyncStorage.setItem(KEY101, '#00e8ff')
  }
}
loadTheme();
const CustomSidebarMenu = (props) => {
  
  const [loaded] = useFonts({
    cour: require('./fonts/cour.ttf'),
  });
  const [loaded1] = useFonts({
    courierBold: require('./fonts/CourierBOLD.ttf'),
  });
  const [smt, setSmt] = React.useState(false);
  const loadTheme = async() => {
    const STORAGE_KEY = '@save_theme'
    const KEY101 = '@urmomsahoe'
    const okk = await AsyncStorage.getItem(STORAGE_KEY)
    const okk1 = await AsyncStorage.getItem(KEY101)
    if (okk && okk1) {
        bgc = okk
        lol = okk1
    }else{
        await AsyncStorage.setItem(STORAGE_KEY, '#1a1a1a')
        await AsyncStorage.setItem(KEY101, '#00e8ff')
    }
}
loadTheme();
  if (!loaded) {
    return null;
  }
  if (!loaded1) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:bgc}}>

      <View style={{backgroundColor:lol,paddingBottom:30,borderBottomRightRadius:30,borderBottomLeftRadius:30}}>
        <Text style={{color:bgc,fontFamily:'cour',fontSize:45,alignSelf:'center',marginTop:70}} >pika</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <Text style={{marginBottom:10,color:lol,fontSize:16,alignSelf:'center',fontFamily:'courierBold'}} >@{usernaame}</Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={{ padding:10,backgroundColor:lol,marginBottom:20,borderRadius:30,alignSelf:'center',paddingHorizontal:30 }} onPress={() => Restart()}>
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
