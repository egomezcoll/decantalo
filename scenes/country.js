import React, { useState } from "react";
import {
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity
  } from "react-native";
import { styles } from "./../App";
import Picker from '@gregfrench/react-native-wheel-picker';
import SecureStorage, { ACCESSIBLE } from 'react-native-secure-storage';

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
const win = Dimensions.get('window');
const PickerItem = Picker.Item;

function countryScreen({ navigation, route }) {
    const { email, password, languageCode } = route.params;
    I18n.locale = languageCode;
    const [selectedItem, setSelectedItem ] = useState(2);
    const itemList = [ {name: 'Germany', code: 'de'}, {name: 'Australia', code: 'au'}, {name: 'Austria', code: 'at'}, {name: 'Belgium', code: 'be'}, {name: 'Bulgaria', code: 'bg'},{name: 'Cyprus', code: 'cy'}, {name: 'South Korea', code: 'kr'}, {name: 'Croatia', code: 'hr'},{name: 'Denmark', code: 'dk'}, {name: 'Slovakia', code: 'sk'}, {name: 'Slovenia', code: 'si'},{name: 'Spain', code: 'es'},{name: 'United States', code: 'us'}, {name: 'Estonia', code: 'ee'}, {name: 'Finland', code: 'fi'},{name: 'France', code: 'fr'}, {name: 'Greece', code: 'gr'},{name: 'HongKong', code: 'hk'},{name: 'Hungary', code: 'hu'},{name: 'Iceland', code: 'is'}, {name: 'Italy', code: 'it'},{name: 'Japan', code: 'jp'},{name: 'Latvia', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lithuania', code: 'lt'},{name: 'Luxemburg', code: 'lu'},{name: 'Malta', code: 'mt'},{name: 'Norway', code: 'no'},{name: 'Netherlands', code: 'nl'},{name: 'Poland', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'United Kingdom', code: 'gb'},{name: 'Czech Republic', code: 'cz'},{name: 'Romania', code: 'ro'},{name: 'Singapore', code: 'sg'},{name: 'Sweden', code: 'se'},{name: 'Switzerland', code: 'ch'}, {name: 'Taiwan', code: 'tw'}];
    
    const saveAndNavigate = async () => {
      const config = {
        accessible: ACCESSIBLE.WHEN_UNLOCKED,
        authenticationPrompt: 'auth with yourself',
        service: 'example',
      }
      await SecureStorage.setItem('email', email, config);
      await SecureStorage.setItem('password', password, config);
      await SecureStorage.setItem('languageCode', languageCode, config);
      await SecureStorage.setItem('countryCode', itemList[selectedItem].code, config);


      navigation.navigate('Webview', {
        countryCode: itemList[selectedItem].code,
        email: email,
        password: password,
        languageCode: languageCode,
      })
    }
     
    return (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f8f8f8'}}>
          <View style={{flex: 4, alignItems: "center"}}>
              <View style={{width:'100%', backgroundColor: '#ebebeb', alignItems:'center', position: 'relative', top: 0, bottom: 0, left: 0, right: 0}}>
                <Image resizeMode="contain" style={{width: '90%', height: win.height/3.75}} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={{width: '90%', height: win.height/3.75}} source={require("./../assets/pais.png")} />
          </View>
          <View style={{flex: 2}}>
            <View style={styles.containerChooseLangTitle}>
              <Text style={styles.chooseLangText}>{I18n.t('PAIS_ENVIO')}</Text>
            </View>
            <View>
              <Text>
                <Picker style={{width: win.width, height: win.height/4.5}}
                  lineColor="#000000"
                  selectedValue={selectedItem}
                  itemStyle={{color:"#76000E", fontSize:26}}
                  onValueChange={(index) => setSelectedItem(index) }>
                  {itemList.map((value, i) => (
                    <PickerItem label={value.name} value={i} key={i}/>
                  ))}
                </Picker>
              </Text>
            </View>
          </View> 
          <View style={{flex: 1}}>
            <View style={styles.containerLoginBtn}>
              <TouchableOpacity style={styles.loginBtn}  onPress={() => saveAndNavigate()}>
                <Text style={styles.loginText}>{I18n.t('CONTINUAR')}</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </View> 
    );
  }

  export default countryScreen;