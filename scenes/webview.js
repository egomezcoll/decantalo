import React, { useState, useEffect } from "react";
import {
    Image,
    TouchableOpacity,
    View,
    FlatList,
    Platform, Text
  } from "react-native";
import { WebView } from 'react-native-webview';
import { styles } from "../App";
import SplashScreen from 'react-native-splash-screen'

  function WebviewScreen({ route }) {
    const { email, password, languageCode, countryCode } = route.params;
    const [isFirstRenderTime , setIsFirstRenderTime] = useState(true);
    const [isNotificationsView , setIsNotificationsView] = useState(false);
    const [haveNotifications , setHaveNotifications] = useState(false);

    useEffect(() => {
      SplashScreen.hide();
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
  
    const changeWebviewURL = (section) => {
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
        
        default:
          setIsNotificationsView(false);
          setUrl(`https://www.decantalo.com/${countryCode}/${languageCode}/`);
      }
    };
    return (
      <View style={{flex: 1, backgroundColor:"#393939"}}>
          <View style={{flex: isNotificationsView ? 0 : 5}}>
            <WebView style={ isFirstRenderTime ? {width:'none'} : {display:'flex'},{marginTop: Platform.OS === 'ios' ? 40 : 0}}
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
            <View style={{flex: isNotificationsView ? 5 : 0}}>
              <View style={styles.mainView}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <View style={styles.imageBackground}>
                      <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
                    </View>
                </View>
                <View style={styles.containerList}>
                  { haveNotifications ? <FlatList
                    data={[
                      {key: 'Devin'},
                      {key: 'Dan'},
                      {key: 'Dominic'},
                      {key: 'Jackson'},
                      {key: 'James'},
                      {key: 'Joel'},
                      {key: 'John'},
                      {key: 'Jillian'},
                      {key: 'Jimmy'},
                      {key: 'Julie'},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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

                  /> : <Text>Notifications not enabled</Text>}
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
  