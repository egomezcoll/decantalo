import React, { useState } from "react";
import {
    Dimensions,
    Text,
    View,
    Image,
    TouchableOpacity
  } from "react-native";
import { styles } from "./../App";

import Picker from '@gregfrench/react-native-wheel-picker'
const win = Dimensions.get('window');
const PickerItem = Picker.Item;
function LanguageScreen({ navigation }) {
    const [selectedItem, setSelectedItem ] = useState(2);
    const itemList = [ {name: 'Deustche', code: 'de'}, {name: 'English', code: 'en'}, {name: 'Español', code: 'es'}, {name: 'Français', code: 'fr'}, {name: 'Català', code: 'ca'}];
  
    return (
        <View style={styles.mainView}>
          <View style={{flex: 4, alignItems: "center"}}>
              <View style={styles.imageBackground}>
                <Image resizeMode="contain" style={styles.image} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={styles.image} source={require("./../assets/idioma.png")} />
          </View>
          <View style={{flex: 2}}>
            <View style={styles.containerChooseLangTitle}>
              <Text style={styles.chooseLangText}>Choose your language:</Text>
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
              <TouchableOpacity style={styles.loginBtn}  onPress={() => navigation.navigate('Register', {
          languageName: itemList[selectedItem].name,
          languageCode: itemList[selectedItem].code,
        })}>
                <Text style={styles.loginText}>CONTINUAR</Text>
              </TouchableOpacity>
            </View> 
          </View>
        </View> 
    );
  }

  export default LanguageScreen;