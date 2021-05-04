import React from "react";
import {
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity
  } from "react-native";
import { styles } from "./../App";
import I18n from 'react-native-i18n';
import en from './i18n/en';
import fr from './i18n/fr';
import de from './i18n/de';
import ca from './i18n/ca';
import es from './i18n/es';
const win = Dimensions.get('window');
I18n.translations = {
  en,
  fr,
  de,
  ca,
  es
};

function RegisterScreen({ navigation, route }) {
    const { languageCode } = route.params;
    I18n.locale = languageCode;
    return (
      <View style={styles.mainView}>
          <View style={{flex: 4, alignItems: "center"}}>
              <View style={styles.imageBackground}>
                <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={styles.image} source={require("./../assets/registro.png")} />
          </View>
          <View style={{flex: 2}}>
            <View style={styles.containerChooseLangTitle}>
              <Text style={languageCode === 'de' ? styles.chooseLangTextDE : styles.chooseLangText}>{I18n.t('REGISTRATE')}</Text>
            </View>
            <View style={styles.containerChooseLang}>
              <TouchableOpacity style={styles.loginBtnXL} onPress={() => navigation.navigate('Login', route.params)}>
                <Text style={styles.loginText}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtnXL} onPress={() => navigation.navigate('Signup', route.params)}>
                <Text style={styles.loginText}>
                  {I18n.t('REGISTRO_NEW_USER')}
                </Text>
              </TouchableOpacity>
            </View> 
          </View>
          <View style={{flex: 1}}></View>  
      </View>  
    );
  }

  export default RegisterScreen;