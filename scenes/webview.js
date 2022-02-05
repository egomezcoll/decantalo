import React, { useState, useEffect } from "react";
import { Linking, Dimensions } from "react-native";
import {
    Image,
    TouchableOpacity,
    View,
    FlatList,
    Platform,
    StatusBar,
    BackHandler, 
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
    const { email, password, languageCode, countryCode, loginAccess } = route.params;
    const [isFirstRenderTime , setIsFirstRenderTime] = useState(true);
    const [isNotificationsView , setIsNotificationsView] = useState(false);
    const [haveNotifications , setHaveNotifications] = useState(false);
    const [notificationsData, setNotificationsData] = useState([]);
    const [urlEventListener, setUrlEventListener] = useState(null);
    const [_languageCode, setlanguageCode] = useState(languageCode);
    const [_countryCode, setcountryCode] = useState(countryCode);
    I18n.locale = _languageCode;
    const [win, setOrientation] = useState(Dimensions.get('window').width);
    const loginAction = {
      'es': 'iniciar-sesion',
      'ca': 'inici-sessio',
      'en': 'login',
      'fr': 'connexion',
      'de': 'anmeldung',
    };
    const carritoAction = {
      'es': 'carrito-compra',
      'ca': 'cistella-compra',
      'en': 'shopping-basket',
      'fr': 'panier',
      'de': 'warenkorb',
    };
    BackHandler.addEventListener('hardwareBackPress', function () {     
      changeWebviewURL('backbutton');
      return true;
    });
    const loginActionArray = ['iniciar-sesion', 'inici-sessio', 'login', 'connexion', 'anmeldung'];
    const loginActionTranslated = loginAction[languageCode];
    const initialURL = email ? `https://www.decantalo.com/${countryCode}/${languageCode}/${loginActionTranslated}?back=my-account&email=${email}&password=${password}&submitLogin=1&date=${Date.now()}` : `https://www.decantalo.com/${countryCode}/${languageCode}/?date=${Date.now()}`;
    const [url, setUrl] = useState(initialURL);
    const config = {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      authenticationPrompt: 'auth with yourself',
      service: 'example',
    }

    const continueShipping = async()=>{
      const urlRedirect = await SecureStorage.getItem('urlRedirect', config);
      const email = await SecureStorage.getItem('email', config);
      if(urlRedirect){
        setTimeout(()=>{
            setUrlEventListener(urlRedirect);
            const carritoActionTranslated = carritoAction[_languageCode];
            email ? changeWebviewURL('deeplink', 'url='+urlRedirect+'checkout') : changeWebviewURL('deeplink', `url=${urlRedirect}${carritoActionTranslated}?action=show`);
        },2000);
        await SecureStorage.removeItem('urlRedirect', config);
      }
    };
    continueShipping();
   
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
      Dimensions.addEventListener('change', ()=>{
       setOrientation(Dimensions.get('window').width);
      })
    }, []);
    useEffect(() => {
      if(loginAccess){
        setIsFirstRenderTime(true);
        const initialURL = email ? `https://www.decantalo.com/${countryCode}/${languageCode}/${loginActionTranslated}?back=my-account&email=${email}&password=${password}&submitLogin=1&date=${Date.now()}` : `https://www.decantalo.com/${countryCode}/${languageCode}/?date=${Date.now()}`;
        changeWebviewURL('deeplink', 'url='+initialURL);
      }
    }, [loginAccess]);
    const includesSubstring = (incommingURL)=>{
      return loginActionArray.some(function (key) {
        return incommingURL.indexOf(key) !== -1;
      });
    }
    const resetToRegister = async(lang, fromlogin = false)=>{
      const hasEmail = await SecureStorage.getItem('email', config);
      if(!hasEmail){
        if(!fromlogin){
          changeWebviewURL('deeplink', `url=https://www.decantalo.com/${_countryCode}/${_languageCode}/`)
          await SecureStorage.setItem('urlRedirect',`https://www.decantalo.com/${_countryCode}/${_languageCode}/` , config);
        }else{
          changeWebviewURL('deeplink', `url=https://www.decantalo.com/${_countryCode}/${_languageCode}/`)
        }
        navigation.navigate('Register', {'languageCode':lang})
      }  
    }
    const doLogout = async(lang)=>{
      await SecureStorage.removeItem('email', config);
      await SecureStorage.removeItem('password', config);

      await SecureStorage.removeItem('urlRedirect', config);
      navigation.navigate('Register', {'languageCode':lang})
    }

    const updateCountryAndLanguage = async(incommingURL)=>{
        const data = incommingURL.split('decantalo.com')[1].split('/');
        if(data[1].length === 2){
          await SecureStorage.setItem('countryCode', data[1], config);
          setcountryCode(data[1]);
        }
        if(data[2].length === 2){
          await SecureStorage.setItem('languageCode', data[2], config);
          setlanguageCode(data[2]);
        }
        if(incommingURL && incommingURL.includes('mylogout')){
          doLogout(data[2]);
        };
        if(incommingURL && includesSubstring(incommingURL)){
          resetToRegister(data[2], true);
        };

        if(incommingURL && incommingURL.includes('checkout')){
          resetToRegister(data[2]);
        };
    }
    
    const changeWebviewURL = (section, url) => {
      switch(section){
        case 'home':
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${_countryCode}/${_languageCode}/?date=${Date.now()}`);
          break;
        case 'notifications': 
          setIsNotificationsView(true);
          break;  
        case 'personalArea': 
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${_countryCode}/${_languageCode}/area-personal`);
          break;
        case 'contact': 
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${_countryCode}/${_languageCode}/contacta-con-decantalo`);
          break;  
        case 'chat':
          setIsNotificationsView(false);
          this.webref.injectJavaScript(`
            document.getElementById('livechat-wrapper').click();
            true;
          `);
          break; 
        case 'backbutton':
          setIsNotificationsView(false);
          if(this.webref){
            this.webref.injectJavaScript(`
              window.history.back();
              true;
            `);
          }
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
          setUrl(`https://www.decantalo.com/${_countryCode}/${_languageCode}/`);
      }
    };
   
    return (
      <View style={{flex: 1, backgroundColor:"#f8f8f8"}}>
          <View style={{flex: isNotificationsView ? 0 : 5}}>
            <StatusBar hidden={true} />
            <WebView style={ isFirstRenderTime ? {width:'none'} : {display:'flex'},{marginTop: Platform.OS === 'ios' ? 30 : 0}}
              onLoadStart={() => {
                if(isFirstRenderTime && !urlEventListener) {
                  setTimeout(()=>{ changeWebviewURL('home'); },1500);
                }
                setIsFirstRenderTime(false);
              }}
              onLoadEnd={() => {
                this.webref.injectJavaScript(`
                document.getElementById('dropdownMenuButtonSelectorMB').addEventListener('click', () => {
                  window.ReactNativeWebView.postMessage('selectCountryNative');
                });
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
                if(navState.url && navState.url.includes('decantalo.com')){
                  updateCountryAndLanguage(navState.url);
                }
              }}
              onMessage={(event) => {
                const res = event.nativeEvent.data;
                if(res == 'selectCountryNative'){
                  navigation.navigate('Country', {
                    email: email,
                    password: password,
                    languageCode: _languageCode
                  })
                }
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
            <View style={{position: "absolute", bottom:0 , left:0, width: win, height: 80, backgroundColor: "#393939", flexDirection: "row"}}>
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