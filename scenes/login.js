import React, { useState } from "react";
import {
    Dimensions,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity
  } from "react-native";
import I18n from 'react-native-i18n';
import en from './i18n/en';
import fr from './i18n/fr';
import de from './i18n/de';
import ca from './i18n/ca';
import es from './i18n/es';
import { styles } from "./../App";
const win = Dimensions.get('window');
I18n.translations = {
  en,
  fr,
  de,
  ca,
  es
};

function LoginScreen({ navigation, route }) {
    const { languageCode } = route.params;
    I18n.locale = languageCode;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const isValidEmail = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      return reg.test(email);
    }
    const showLoginError = (loginErrorText) => {
      setLoginError(loginErrorText);
    }
    const checkLogin = () => {
      setLoginError("");
      let loginErrorText = 'Ha habido un error con tu usuario o contraseña. Por favor, vuelve a introducirlos.';
      let pathLang = 'es/es/';
      let path = pathLang + 'iniciar-sesion';
      switch(languageCode){
        case 'en': 
          pathLang = 'uk/en/';
          path = `${pathLang}login`;
          loginErrorText = "There is an error with your username or password. Please re-enter them.";
          break;  
        case 'fr': 
          pathLang = 'fr/fr/';
          path = `${pathLang}connexion`;
          loginErrorText = "Une erreur s'est produite avec votre nom d'utilisateur ou votre mot de passe. Veuillez les saisir à nouveau.";
          break;
        case 'de': 
          pathLang = 'de/de/';
          path = `${pathLang}anmeldung`;
          loginErrorText = "Es ist ein Fehler mit Ihrem Benutzernamen oder Passwort aufgetreten. Bitte geben Sie Ihre Daten erneut ein.";
          break;  
        case 'ca': 
          pathLang = 'es/ca/';
          path = `${pathLang}inici-sessio`;
          loginErrorText = "Hi ha hagut un error amb el teu usuari o contrasenya. Si us plau, torna a introduir-los.";
          break; 
        case 'nl': 
          pathLang = 'nl/nl/';
          path = `${pathLang}inici-sessio`;
          loginErrorText = "Er is een fout opgetreden met je gebruikersnaam of wachtwoord. Voer ze opnieuw in.";
          break;   
      }

      if(email.length === 0 || !isValidEmail()) {
        setLoginError('Por favor, revisa el email introducido');
        return;
      } 

      if(password.length <= 4) {
        setLoginError('Por favor, revisa la contraseña introducida. Utiliza un formato que coincida con el solicitado');
        return;
      }

      fetch(`https://www.decantalo.com/${path}?back=my-account&email=${email}&password=${password}&submitLogin=1`)
      .then((resp)=>{ return resp.text() }).then((text)=>{ 
        text.includes('js-invalid-feedback-browser') ? showLoginError(loginErrorText): navigation.navigate('Country', {
          email: email,
          password: password,
          languageCode: languageCode
        }) 
      })
        .catch((error) => {
          console.error(error);
      });
    };
  
    return (
      <ScrollView style={styles.mainView}>
          <View style={{alignItems: "center"}}>
              <View style={styles.imageBackground}>
                <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={styles.image} source={require("./../assets/registro.png")} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.containerChooseLangTitle}>
              <Text style={styles.chooseLangText}>{I18n.t('REGISTRATE')}</Text>
            </View>
            <View style={loginError.length > 0 ? styles.visible : styles.hidden}>
              <View style={{width:"85%", justifyContent:"center", alignItems: "center",  marginBottom:10, backgroundColor: "#f8d7da", borderColor: "#f5c6cb", borderWidth: 1, padding:10}}>
                <Text style={{color: '#721c24'}}>{loginError}</Text>
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={I18n.t('INTRODUCE_EMAIL')}
                placeholderTextColor="#6d6860"
                color="#515150"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
      
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder={I18n.t('CONTRASENA')}
                placeholderTextColor="#6d6860"
                color="#515150"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={styles.linkViewForgot}>
              <TouchableOpacity onPress={() => navigation.navigate('Forgot', route.params)}>
                <Text style={styles.linkDecoration}>{I18n.t('FORGOT_LINK')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerLoginBtnScrollView}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => checkLogin()}>
                  <Text style={styles.loginText}>
                  {I18n.t('ENVIAR')}
                  </Text>
                </TouchableOpacity>
            </View> 
          </View>
          <View style={styles.linkView}>
            <View style={styles.linkline}></View>
          </View>  
          <View style={styles.linkView}>
            <Text style={styles.linkColor}>{I18n.t('NOT_HAVE_ACCOUNT')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup', route.params)}>
              <Text style={styles.linkDecoration}>{I18n.t('SIGNUP_LINK')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 50}}></View>
      </ScrollView>  
    );
  }

  export default LoginScreen;