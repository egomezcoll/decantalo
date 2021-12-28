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
import Selligent from '@selligent-marketing-cloud/selligent-react-native' // Add Selligent import
import SelligentConstants from '@selligent-marketing-cloud/selligent-react-native/constants';

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
    const [selectedItem, setSelectedItem ] = useState(11);
    const config = {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      authenticationPrompt: 'auth with yourself',
      service: 'example',
    };
    let itemList = [ {name: 'Alemania', code: 'de'}, {name: 'Australia', code: 'au'}, {name: 'Austria', code: 'at'}, {name: 'Bélgica', code: 'be'}, {name: 'Bulgaria', code: 'bg'},{name: 'Chipre', code: 'cy'}, {name: 'Corea del Sud', code: 'kr'}, {name: 'Croacia', code: 'hr'},{name: 'Dinamarca', code: 'dk'}, {name: 'Eslovaquia', code: 'sk'}, {name: 'Eslovenia', code: 'si'},{name: 'España', code: 'es'},{name: 'Estados Unidos', code: 'us'}, {name: 'Estonia', code: 'ee'}, {name: 'Finlandia', code: 'fi'},{name: 'Francia', code: 'fr'}, {name: 'Grecia', code: 'gr'},{name: 'Hong Kong', code: 'hk'},{name: 'Hungria', code: 'hu'},{name: 'Islandia', code: 'is'}, {name: 'Italia', code: 'it'},{name: 'Japón', code: 'jp'},{name: 'Letonia', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lituania', code: 'lt'},{name: 'Luxemburgo', code: 'lu'},{name: 'Malta', code: 'mt'},{name: 'Noruega', code: 'no'},{name: 'Países Bajos', code: 'nl'},{name: 'Polonia', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'Reino Unido', code: 'gb'},{name: 'República Checa', code: 'cz'},{name: 'Rumanía', code: 'ro'},{name: 'Singapur', code: 'sg'},{name: 'Suecia', code: 'se'},{name: 'Suiza', code: 'ch'}, {name: 'Taiwan', code: 'tw'}];
    switch(languageCode){
      case 'en':
        itemList = [ {name: 'Germany', code: 'de'}, {name: 'Australia', code: 'au'}, {name: 'Austria', code: 'at'}, {name: 'Belgium', code: 'be'}, {name: 'Bulgaria', code: 'bg'},{name: 'Cyprus', code: 'cy'}, {name: 'South Korea', code: 'kr'}, {name: 'Croatia', code: 'hr'},{name: 'Denmark', code: 'dk'}, {name: 'Slovakia', code: 'sk'}, {name: 'Slovenia', code: 'si'},{name: 'Spain', code: 'es'},{name: 'United States', code: 'us'}, {name: 'Estonia', code: 'ee'}, {name: 'Finland', code: 'fi'},{name: 'France', code: 'fr'}, {name: 'Greece', code: 'gr'},{name: 'Hong Kong', code: 'hk'},{name: 'Hungary', code: 'hu'},{name: 'Iceland', code: 'is'}, {name: 'Italy', code: 'it'},{name: 'Japan', code: 'jp'},{name: 'Latvia', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lithuania', code: 'lt'},{name: 'Luxemburg', code: 'lu'},{name: 'Malta', code: 'mt'},{name: 'Norway', code: 'no'},{name: 'Netherlands', code: 'nl'},{name: 'Poland', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'United Kingdom', code: 'gb'},{name: 'Czech Republic', code: 'cz'},{name: 'Romania', code: 'ro'},{name: 'Singapore', code: 'sg'},{name: 'Sweden', code: 'se'},{name: 'Switzerland', code: 'ch'}, {name: 'Taiwan', code: 'tw'}];
        break;
      case 'fr':
        itemList = [ {name: 'Allemagne', code: 'de'}, {name: 'Australie', code: 'au'}, {name: "L'Autriche", code: 'at'}, {name: 'Belgique', code: 'be'}, {name: 'Bulgarie', code: 'bg'},{name: 'Chypre', code: 'cy'},{name: 'Corée du Sud', code: 'kr'}, {name: 'Croatie', code: 'hr'},{name: 'Danemark', code: 'dk'}, {name: 'Slovaquie', code: 'sk'}, {name: 'Slovénie', code: 'si'},{name: 'Espagne', code: 'es'},{name: 'États Unis', code: 'us'}, {name: 'Estonie', code: 'ee'}, {name: 'Finlande', code: 'fi'},{name: 'France', code: 'fr'}, {name: 'Grèce', code: 'gr'},{name: 'Hong Kong', code: 'hk'},{name: 'Hongrie', code: 'hu'},{name: 'Islande', code: 'is'}, {name: 'Italie', code: 'it'},{name: 'Japon', code: 'jp'},{name: 'Lettonie', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lithuania', code: 'lt'},{name: 'Luxembourg', code: 'lu'},{name: 'Malte', code: 'mt'},{name: 'Norvège', code: 'no'},{name: 'Pays-Bas', code: 'nl'},{name: 'Pologne', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'Royaume-Uni', code: 'gb'},{name: 'République Tchèque', code: 'cz'},{name: 'Roumanie', code: 'ro'},{name: 'Singapour', code: 'sg'},{name: 'Suède', code: 'se'},{name: 'Suisse', code: 'ch'}, {name: 'Taïwan', code: 'tw'}];
        break;
      case 'de':
        itemList = [ {name: 'Deutschland', code: 'de'}, {name: 'Australien', code: 'au'}, {name: 'Österreich', code: 'at'}, {name: 'Belgien', code: 'be'}, {name: 'Bulgarien', code: 'bg'},{name: 'Zypern', code: 'cy'}, {name: 'Südkorea', code: 'kr'}, {name: 'Kroatien', code: 'hr'},{name: 'Dänemark', code: 'dk'}, {name: 'Slowakei', code: 'sk'}, {name: 'Slowenien', code: 'si'},{name: 'Spanien', code: 'es'},{name: 'US', code: 'us'}, {name: 'Estland', code: 'ee'}, {name: 'Finnland', code: 'fi'},{name: 'Frankreich', code: 'fr'}, {name: 'Griechenland', code: 'gr'},{name: 'Hong Kong', code: 'hk'},{name: 'Ungarn', code: 'hu'},{name: 'Iceland', code: 'is'}, {name: 'Italien', code: 'it'},{name: 'Japan', code: 'jp'},{name: 'Lettland', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lituanie', code: 'lt'},{name: 'Luxemburg', code: 'lu'},{name: 'Malz', code: 'mt'},{name: 'Norwegen', code: 'no'},{name: 'Niederlande', code: 'nl'},{name: 'Polen', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'Vereinigtes Königreich', code: 'gb'},{name: 'Tschechien', code: 'cz'},{name: 'Rumänien', code: 'ro'},{name: 'Singapur', code: 'sg'},{name: 'Schweden', code: 'se'},{name: 'Schweiz', code: 'ch'}, {name: 'Taiwan', code: 'tw'}];
        break;
      case 'ca':
        itemList = [ {name: 'Alemanya', code: 'de'}, {name: 'Austràlia', code: 'au'}, {name: 'Àustria', code: 'at'}, {name: 'Bèlgica', code: 'be'}, {name: 'Bulgària', code: 'bg'},{name: 'Xipre', code: 'cy'},{name: 'Corea del Sud', code: 'kr'}, {name: 'Croàcia', code: 'hr'},{name: 'Dinamarca', code: 'dk'},{name: 'Eslovàquia', code: 'sk'}, {name: 'Eslovènia', code: 'si'},{name: 'Espanya', code: 'es'},{name: 'Estats Units', code: 'us'}, {name: 'Estònia', code: 'ee'}, {name: 'Finlàndia', code: 'fi'},{name: 'França', code: 'fr'}, {name: 'Gràcia', code: 'gr'},{name: 'Hong Kong', code: 'hk'},{name: 'Hongria', code: 'hu'},{name: 'Islàndia', code: 'is'}, {name: 'Itàlia', code: 'it'},{name: 'Japó', code: 'jp'},{name: 'Letònia', code: 'lv'},{name: 'Liechtenstein', code: 'li'},{name: 'Lituània', code: 'lt'},{name: 'Luxemburg', code: 'lu'},{name: 'Malta', code: 'mt'},{name: 'Noruega', code: 'no'},{name: 'Països Baixos', code: 'nl'},{name: 'Polònia', code: 'pl'},{name: 'Portugal', code: 'pt'},{name: 'Regne Unit', code: 'gb'},{name: 'República Txeca', code: 'cz'},{name: 'Romania', code: 'ro'},{name: 'Singapur', code: 'sg'},{name: 'Suècia', code: 'se'},{name: 'Suïssa', code: 'ch'}, {name: 'Taiwan', code: 'tw'}];
        break;
    }

    

    const saveAndNavigate = async () => {
      const hasCountry = await SecureStorage.getItem('countryCode', config);
        if(email){
          if(!hasCountry || hasCountry != itemList[selectedItem].code){
            await Selligent.sendEvent(
              (response) => { // success callback
              },
              (error) => { // error callback
              },
              {
                  'type': SelligentConstants.EventType.USER_REGISTER, // specific event
                  'data': { // optional
                      description: "User Register Event",
                      language: languageCode.toUpperCase(),
                      country: itemList[selectedItem].code,
                  },
                  'email': email, // required
              }
            );
            await SecureStorage.setItem('email', email, config);
            await SecureStorage.setItem('password', password, config);
          }  
        }else{
          await Selligent.sendEvent(
            (response) => { // success callback
            },
            (error) => { // error callback
            },
            {
                'type': SelligentConstants.EventType.USER_REGISTER, // specific event
                'data': { // optional
                    description: "Dispositivos anonimos",
                    language: languageCode.toUpperCase(),
                    country: itemList[selectedItem].code,
                },
                'email': 'correo@falso.com', // required
            }
          );
        }
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
        <View style={styles.mainView}>
          <View style={{flex: 4, alignItems: "center"}}>
              <View style={styles.imageBackground}>
                <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={styles.image} source={require("./../assets/pais.png")} />
          </View>
          <View style={{flex: 2}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.chooseLangTextShrink}>{I18n.t('PAIS_ENVIO')}</Text>
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