import React, { useState } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    Platform
  } from "react-native";
import { WebView } from 'react-native-webview';
import { styles } from "../App";
import SplashScreen from 'react-native-splash-screen'

  function WebviewScreen({ route }) {
    const { email, password, languageCode, countryCode } = route.params;
    const [isFirstRenderTime , setIsFirstRenderTime] = useState(true);
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
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/?date=${Date.now()}`);
          SplashScreen.hide();
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
      <View style={{flex: 1, backgroundColor:"#393939"}}>
          <View style={{flex: 5}}>
            <WebView style={ isFirstRenderTime ? {display:'none'} : {display:'flex'}, {marginTop: Platform.OS === 'ios' ? 40 : 0}}
                onLoadEnd={() => {
                  if(isFirstRenderTime){
                    setIsFirstRenderTime(false);
                    changeWebviewURL('home');
                  }
                }}
                source={{ uri: url}}
                ref={(r) => (this.webref = r)}
              />
            </View>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.menuOption} onPress={() => changeWebviewURL('home')}><View style={styles.menuOptionView}><Image resizeMode="contain" style={styles.menuOptionImage} source={require("./../assets/home.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => changeWebviewURL('notifications')}><View style={styles.menuOptionView}><Image resizeMode="contain" style={styles.menuOptionImage} source={require("./../assets/notifications.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => changeWebviewURL('personalArea')}><View style={styles.menuOptionView}><Image resizeMode="contain" style={styles.menuOptionImage} source={require("./../assets/areapersonal.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => changeWebviewURL('contact')}><View style={styles.menuOptionView}><Image resizeMode="contain" style={styles.menuOptionImage} source={require("./../assets/contactar.png")}></Image></View></TouchableOpacity>
                <TouchableOpacity style={styles.menuOption} onPress={() => changeWebviewURL('chat')}><View style={styles.menuOptionView}><Image resizeMode="contain" style={styles.menuOptionImage} source={require("./../assets/chat.png")}></Image></View></TouchableOpacity>
            </View>
        </View>
    );
  }

  export default WebviewScreen;
  