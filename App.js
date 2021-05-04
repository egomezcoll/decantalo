import 'react-native-gesture-handler';
import React from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageScreen from './scenes/language';
import RegisterScreen from './scenes/register';
import LoginScreen from './scenes/login';
import WebviewScreen from './scenes/webview';
import SignupScreen from './scenes/signup';
import CountryScreen from './scenes/country';
import RedirectScreen from './scenes/redirect';
import SplashScreen from 'react-native-splash-screen'
import Selligent from '@selligent-marketing-cloud/selligent-react-native' // Add Selligent import
import SelligentConstants from '@selligent-marketing-cloud/selligent-react-native/constants';


const win = Dimensions.get('window');
const Stack = createStackNavigator();

export default function App() {

  /*Selligent.getVersionLib((versionLib) => {
      alert(versionLib);
  });

  Selligent.enableNotifications(
    (response) => { // success callback
      // alert('ENABLED');
      // alert(response);
    },
    (error) => { // error callback
        alert('NOT ENABLED');
        alert(error);
    },
    true
  );
  Selligent.sendEvent(
    (response) => { // success callback
        alert('SEND EVENT OK ');
        alert(response);
    },
    (error) => { // error callback
        alert('OOOOHH SEND EVENT NOK');
        alert(error);
    },
    {
        'type': SelligentConstants.EventType.USER_LOGIN, // specific event
        'data': { // optional
            id: '1337',
            description: "this is some extra information concerning this event"
        },
        'email': "edugomco884@gmail.com", // required
    }
  );*/
  SplashScreen.hide();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Redirect" component={RedirectScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} /> 
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} /> 
          <Stack.Screen name="Country" component={CountryScreen} /> 
          <Stack.Screen name="Webview" component={WebviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

 
export const styles = StyleSheet.create({
  containerLangImg: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    position: 'relative',
  },

  containerLoginBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    position: "relative",
  },
  containerLoginBtnScrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    position: "relative",
    marginTop: 20,
  },
  containerChooseLang: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    position: "relative",
  },
  containerChooseLangTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    position: 'relative',
  },

  chooseLangText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  chooseLangTextDE: {
    fontSize: 22,
    fontWeight: "bold"
  },
 
  image: {
    width: '100%',
    // Without height undefined it won't work
    height: '100%',
    // figure out your image aspect ratio
    
  },
 
  loginBtn: {
    width: "60%",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b80000",
  },
  loginBtnXL: {
    width: "80%",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#b80000",
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  inputView: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    height: 45
  },
 
  TextInput: {
    width: '85%',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6d6860',
    textAlign: 'left',
  },
  TextInputError: {
    width: '85%',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b80000',
    textAlign: 'left',
  },
  
  visible: {
    display: "flex",
    width: win.width,
    alignItems: "center",
    marginTop: 10,
  },
  hidden: {
    display: "none",
  },
  checkboxContainer: {
    width: '100%',
    flex: 1,
    flexDirection: "row",
    marginTop:20,
    alignItems:"center",
    justifyContent: "center",

  },
  checkbox: {
    alignSelf: "center",
  },
  
});