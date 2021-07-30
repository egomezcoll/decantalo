import React from "react";
import { Linking} from "react-native";
import SecureStorage, { ACCESSIBLE } from 'react-native-secure-storage'

function RedirectScreen({ navigation }) {
  
  const checkHasLogin = async () => {

      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      alert('deeplink url ' + initialUrl);

    

     const config = {
       accessible: ACCESSIBLE.WHEN_UNLOCKED,
       authenticationPrompt: 'auth with yourself',
       service: 'example',
     }
     //await SecureStorage.removeItem('email', config);

     let email = await SecureStorage.getItem('email', config);
     if(email){
       let password = await SecureStorage.getItem('password', config);
       let languageCode = await SecureStorage.getItem('languageCode', config);
       let countryCode = await SecureStorage.getItem('countryCode', config);
       navigation.navigate('Webview', {
          email: email,
          password: password,
          languageCode: languageCode,
          countryCode: countryCode,
          initialUrl: initialUrl,
       });
     }else {
        navigation.navigate('Language');
     }
   };
   checkHasLogin();
   return null;
  }

  export default RedirectScreen;