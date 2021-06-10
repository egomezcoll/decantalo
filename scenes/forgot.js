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

function ForgotPasswordScreen({ navigation, route }) {
    const { languageCode } = route.params;
    I18n.locale = languageCode;
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const isValidEmail = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      return reg.test(email);
    }
    const checkLogin = () => {
        setFeedback("");
      let recuperationFeedback = 'Si esta dirección de correo electrónico se ha registrado en nuestra tienda, recibirá un enlace para restablecer su contraseña en';
      let pathLang = 'es/es/';
      let path = pathLang + 'recuperar-contrasena';
      switch(languageCode){
        case 'en': 
          pathLang = 'es/en/';
          path = `${pathLang}password-recovery`;
          recuperationFeedback = "If this email address has been registered in our shop, you will receive a link to reset your password at";
          break;  
        case 'fr': 
          pathLang = 'es/fr/';
          path = `${pathLang}recuperation-mot-de-passe`;
          recuperationFeedback = "Si cette adresse e-mail est enregistrée dans notre boutique, vous recevrez un lien pour réinitialiser votre mot de passe sur";
          break;
        case 'de': 
          pathLang = 'es/de/';
          path = `${pathLang}passwort-zuruecksetzen`;
          recuperationFeedback = "Wenn Sie sich mit dieser E-Mail-Adresse im Shop angemeldet haben, erhalten Sie einen Link zum Zurücksetzen Ihres Passworts an";
          break;  
        case 'ca': 
          pathLang = 'es/ca/';
          path = `${pathLang}recuperacio-contrasenya`;
          recuperationFeedback = "Si aquest correu està registrat a la botiga, rebreu un enllaç per a recuperar la vostra contrasenya a";
          break; 
        case 'nl': 
          pathLang = 'es/nl/';
          path = `${pathLang}inici-sessio`;
          recuperationFeedback = "Er is een fout opgetreden met je gebruikersnaam of wachtwoord. Voer ze opnieuw in.";
          break;   
      }

      if(email.length === 0 || !isValidEmail()) {
        return;
      } 
      let details = {
        email: email,
        }
    const searchParams = Object.keys(details).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(details[key]);
    }).join('&');
      fetch(`https://www.decantalo.com/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: searchParams
      })
      .then((resp)=>{ return resp.text() }).then(()=>{ 
        setFeedback(recuperationFeedback);
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
              <Text style={styles.chooseLangText}>{I18n.t('FORGOT')}</Text>
            </View>
            <View style={feedback.length > 0 ? styles.hidden : styles.visible}>
                <View style={{justifyContent: "center", alignItems: "center", marginTop:10, marginBottom:10}}>
                <View style={{width:"80%"}}>
                    <Text style={{marginBottom:10}}>{I18n.t('FORGOT_QUESTION')}</Text>
                    <Text>{I18n.t('FORGOT_INSTRUCTION')}</Text>
                </View>
                </View>
            </View>
            <View style={feedback.length > 0 ? styles.visible : styles.hidden}>
              <View style={{width:"85%", justifyContent:"center", alignItems: "center",  marginBottom:10,  borderColor: "#28a745", borderWidth: 1, padding:10}}>
                <Text>{`${feedback} ${email}`}</Text>
              </View>
            </View>
                <View style={[styles.inputView, feedback.length > 0 ? styles.hidden : styles.visible]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={I18n.t('INTRODUCE_EMAIL')}
                    placeholderTextColor="#6d6860"
                    color="#515150"
                    onChangeText={(email) => setEmail(email)}
                />
                </View>
                <View style={[styles.containerLoginBtnScrollView, feedback.length > 0 ? styles.hidden : styles.visible]}>
                    <TouchableOpacity style={styles.loginBtnXXL} onPress={() => checkLogin()}>
                    <Text style={styles.loginTextXS}>
                    {I18n.t('FORGOT_ENVIAR')}
                    </Text>
                    </TouchableOpacity>
                </View> 
                <View style={[styles.containerLoginBtnScrollView, feedback.length > 0 ? styles.visible : styles.hidden]}>
                    <TouchableOpacity style={styles.loginBtnXL} onPress={() => navigation.navigate('Login', route.params)}>
                        <Text style={styles.loginText}>
                        LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
          </View>
          <View style={{marginBottom: 50}}></View>
      </ScrollView>  
    );
  }

  export default ForgotPasswordScreen;