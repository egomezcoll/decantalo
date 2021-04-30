import React, { useState } from "react";
import {
    Dimensions,
    Image,
    TouchableOpacity,
    View
  } from "react-native";
  import { WebView } from 'react-native-webview';
  const win = Dimensions.get('window');

  function WebviewScreen({ route }) {
    const { email, password, languageCode, countryCode } = route.params;

    const loginAction = {
        'es': 'iniciar-sesion',
        'ca': 'inici-sessio',
        'en': 'login',
        'fr': 'connexion',
        'de': 'anmeldung',
    };
    const loginActionTranslated = loginAction[languageCode];
    const [url, setUrl] = useState(`https://www.decantalo.com/${countryCode}/${languageCode}/${loginActionTranslated}?back=my-account&email=${email}&password=${password}&submitLogin=1`)
  
    const changeWebviewURL = (section) => {
      switch(section){
        case 'home': 
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/`);
          break;
        case 'notifications': 
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/`);
          break;  
        case 'personalArea': 
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/area-personal`);
          break;
        case 'contact': 
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/contacta-con-decantalo`);
          break;  
        case 'chat': 
            this.webref.injectJavaScript(`
            document.getElementById('livechat-wrapper').click();
            true;
          `);
          break; 
        
        default:
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/`);
      }
    };
    return (
      <View style={{flex: 1}}>
          <View style={{flex: 5}}>
            <WebView
                source={{ uri: url}}
                ref={(r) => (this.webref = r)}
              />
            </View>
            <View style={{position: "absolute", bottom:0 , left:0, width: win.width, height: 80, backgroundColor: "#393939", flexDirection: "row"}}>
                <TouchableOpacity style={{flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15}} onPress={() => changeWebviewURL('home')}><View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}><Image resizeMode="contain" style={{width: 45, height: 45}} source={require("./../assets/home.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15}} onPress={() => changeWebviewURL('notifications')}><View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}><Image resizeMode="contain" style={{width: 45, height: 45}} source={require("./../assets/notifications.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15}} onPress={() => changeWebviewURL('personalArea')}><View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}><Image resizeMode="contain" style={{width: 45, height: 45}} source={require("./../assets/areapersonal.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15}} onPress={() => changeWebviewURL('contact')}><View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}><Image resizeMode="contain" style={{width: 45, height: 45}} source={require("./../assets/contactar.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15}} onPress={() => changeWebviewURL('chat')}><View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}><Image resizeMode="contain" style={{width: 45, height: 45}} source={require("./../assets/chat.png")}></Image></View></TouchableOpacity>
            </View>
        </View>
    );
  }

  export default WebviewScreen;
  