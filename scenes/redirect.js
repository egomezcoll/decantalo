import React from "react";
import SecureStorage, { ACCESSIBLE } from 'react-native-secure-storage'

function RedirectScreen({ navigation }) {
  
  const checkHasLogin = async () => {
     
     const config = {
       accessible: ACCESSIBLE.WHEN_UNLOCKED,
       authenticationPrompt: 'auth with yourself',
       service: 'example',
     }
     //await SecureStorage.removeItem('email', config);
     //await SecureStorage.removeItem('languageCode', config);

     let email = await SecureStorage.getItem('email', config);
     let languageCode = await SecureStorage.getItem('languageCode', config);
     if(email){
       let password = await SecureStorage.getItem('password', config);
       let countryCode = await SecureStorage.getItem('countryCode', config);
       navigation.navigate('Webview', {
          email: email,
          password: password,
          languageCode: languageCode,
          countryCode: countryCode,
       });
     }else {
      navigation.navigate('Language');
     }
   };
   checkHasLogin();
   return null;
  }

  export default RedirectScreen;