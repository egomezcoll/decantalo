import React, { useState, useEffect } from "react";
import { Linking} from "react-native";
import {
    Image,
    TouchableOpacity,
    View,
    FlatList,
    Platform,
    StatusBar, 
    Text
  } from "react-native";
import SecureStorage, { ACCESSIBLE } from 'react-native-secure-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { WebView } from 'react-native-webview';
import { styles } from "../App";
import SplashScreen from 'react-native-splash-screen'
import Selligent from '@selligent-marketing-cloud/selligent-react-native' // Add Selligent import
import I18n from 'react-native-i18n';
import en from './i18n/en';
import fr from './i18n/fr';
import de from './i18n/de';
import ca from './i18n/ca';
import es from './i18n/es';
I18n.translations = {
  en,
  fr,
  de,
  ca,
  es
};

  function WebviewScreen({ navigation, route }) {
    const { email, password, languageCode, countryCode } = route.params;
    I18n.locale = languageCode;
    const [isFirstRenderTime , setIsFirstRenderTime] = useState(true);
    const [isNotificationsView , setIsNotificationsView] = useState(false);
    const [haveNotifications , setHaveNotifications] = useState(false);
    const [notificationsData, setNotificationsData] = useState([]);
    const [urlEventListener, setUrlEventListener] = useState(null);
    
   

    useEffect(() => {
      SplashScreen.hide();
      
      Linking.getInitialURL().then((url) => {
        if(url){
          setUrlEventListener(url);
          setTimeout(()=>{
            changeWebviewURL('deeplink', url);
          },2000);
        }
      }) 
      
      Linking.addEventListener('url', (event)=>{
        setTimeout(()=>{
          if(event.url){
            setUrlEventListener(event.url);
            changeWebviewURL('deeplink', event.url);
          } 
        },2000);
      });
    

      Selligent.getInAppMessages(
        (response) => { // success callback
          if(response.length === 0){
            setHaveNotifications(false);
          }else {
            setHaveNotifications(true);
            setNotificationsData(response);
          }
        }
    );
    }, []);
    
    const resetToLogin = async()=>{
      const config = {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
        authenticationPrompt: 'auth with yourself',
        service: 'example',
      }
      await SecureStorage.removeItem('email', config);
      navigation.navigate('Login', {'languageCode':languageCode})
    }
    const loginAction = {
        'es': 'iniciar-sesion',
        'ca': 'inici-sessio',
        'en': 'login',
        'fr': 'connexion',
        'de': 'anmeldung',
    };
    const loginActionTranslated = loginAction[languageCode];
    const [url, setUrl] = useState(`https://www.decantalo.com/${countryCode}/${languageCode}/${loginActionTranslated}?back=my-account&email=${email}&password=${password}&submitLogin=1`)
  
    const changeWebviewURL = (section, url) => {
      switch(section){
        case 'home':
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/?date=${Date.now()}`);
          break;
        case 'notifications': 
          setIsNotificationsView(true);
          break;  
        case 'personalArea': 
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/area-personal`);
          break;
        case 'contact': 
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/contacta-con-decantalo`);
          break;  
        case 'chat':
          setIsNotificationsView(false);
          this.webref.injectJavaScript(`
            document.getElementById('livechat-wrapper').click();
            true;
          `);
          break; 
        case 'deeplink':
          setIsNotificationsView(false);          
          let finalDeeplink = url.split('url=')[1];
          this.webref.injectJavaScript(`
            window.location.href = '${finalDeeplink}';
            true;
          `);
          break; 
        default:
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/`);
      }
    };
    return (
      <View style={{flex: 1, backgroundColor:"#f8f8f8"}}>
          <View style={{flex: isNotificationsView ? 0 : 5}}>
            <StatusBar hidden={true} />
            <WebView style={ isFirstRenderTime ? {width:'none'} : {display:'flex'},{marginTop: Platform.OS === 'ios' ? 30 : 0}}
              onLoadStart={() => {
                if(isFirstRenderTime && !urlEventListener) {
                  setTimeout(()=>{ changeWebviewURL('home'); },1000);
                }
                setIsFirstRenderTime(false);
              }}
              onLoadEnd={() => {
                this.webref.injectJavaScript(`
                  document
                  .querySelector('body')
                  .addEventListener('click', interceptAnchorClickEvent);
                  function interceptAnchorClickEvent(evt) {
                    var target = evt.target;
                    if (
                      target.tagName === 'A' && target.getAttribute('href')
                    ) {
                      
                      if(target.getAttribute('href').includes('mylogout')){
                        window.location.href = target.getAttribute('href');
                      }
                    }
                  };
                  true;
                `);
              }}
              onNavigationStateChange={(navState) => {
                if(navState.url && navState.url.includes('mylogout')){
                  resetToLogin();
                };
              }}
              source={{ uri: url}}
              ref={(r) => (this.webref = r)}
              />
            </View>
            <Spinner
          visible={isFirstRenderTime}
          textStyle={{color: '#FFF'}}
        />
            <View style={{flex: isNotificationsView ? 5 : 0}}>
              <View style={styles.mainView}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <View style={styles.imageBackground}>
                      <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
                    </View>
                </View>
                <View style={styles.containerList}>
                  { haveNotifications ? <FlatList
                    data={notificationsData}
                    renderItem={({item}) =>  <Text style={{alignItems:"center", marginBottom:20,paddingLeft:15, paddingRight:15}}><Text style={{marginRight:10}}>{"\uD83D\uDD14"}</Text><Text style={{fontWeight: 'bold'}}>{new Date(item.creationDate).toLocaleDateString("es-ES")} - {item.title}</Text>{"\n"}<Text style={{flex: 1, alignItems:'center', flexDirection: 'column'}}>{item.body}</Text></Text>}
                    ItemSeparatorComponent={renderSeparator = () => {  
                      return (  
                          <View  
                              style={{  
                                  height: 1,  
                                  width: "100%",  
                                  backgroundColor: "#000",  
                              }}  
                          />  
                      );  
                  }}  

                /> : <View style={{flex: 1, alignItems:'center', flexDirection: 'column', backgroundColor: '#f8f8f8'}}><View style={{alignItems:"center", marginTop:20,width:"80%"}}><Text>{I18n.t('NO_NOTIFICATIONS')}</Text></View></View>}
                </View>
              </View>
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