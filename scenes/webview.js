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

  function WebviewScreen({ route }) {
    const { email, password, languageCode, countryCode } = route.params;
    I18n.locale = languageCode;
    const [isFirstRenderTime , setIsFirstRenderTime] = useState(true);
    const [isNotificationsView , setIsNotificationsView] = useState(false);
    const [haveNotifications , setHaveNotifications] = useState(false);
    const [notificationsData, setNotificationsData] = useState([]);
    const [urlEventListener, setUrlEventListener] = useState(null);
    
   

    useEffect(() => {
      SplashScreen.hide();
      
      // Get the deep link used to open the app
      Linking.getInitialURL().then((url) => {
        alert('Initial url is: ' + url);
        if(url){
          alert('App Cerrada, navego a url');
          setUrlEventListener(url);
          changeWebviewURL('deeplink', url);
        }

      })
      
      Linking.addEventListener('url', (event)=>{
        alert('Event listener url: ' + event.url);
        if(event.url){
          alert('App abierta, navego a url');
          setUrlEventListener(event.url);
          changeWebviewURL('deeplink', event.url);
        } 
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
    
    const loginAction = {
        'es': 'iniciar-sesion',
        'ca': 'inici-sessio',
        'en': 'login',
        'fr': 'connexion',
        'de': 'anmeldung',
    };
    const loginActionTranslated = loginAction[languageCode];
    const [url, setUrl] = useState(`https://www.decantalo.com/${countryCode}/${languageCode}/${loginActionTranslated}?back=my-account&email=${email}&password=${password}&submitLogin=1`)
  
    const changeWebviewURL = (section, url = null) => {
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
          if(url){
            try{
              //let finalDeeplink = initialUrl ? initialUrl.split('url=')[1] : urlEventListener.split('url=')[1];
              let finalDeeplink = url.split('url=')[1];
              finalDeeplink.includes('decantalo.com') ? setUrl(finalDeeplink) : changeWebviewURL('home');
            }catch(error){
              changeWebviewURL('home');
            }
          }else{
            changeWebviewURL('home');
          }
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
                onLoadEnd={() => {
                  if(isFirstRenderTime && !urlEventListener){
                    changeWebviewURL('home');
                  }
                  setIsFirstRenderTime(false);
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
  