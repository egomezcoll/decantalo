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
import ForgotPasswordScreen from './scenes/forgot';
import Selligent from '@selligent-marketing-cloud/selligent-react-native' // Add Selligent import

const win = Dimensions.get('window');
const Stack = createStackNavigator();

export default function App() {
  Selligent.enableNotifications(
    (response) => { // success callback
      alert(response);
    },
    (error) => { // error callback
    },
    true
);
  Selligent.displayLastReceivedRemotePushNotification(
    (response) => { // success callback
        alert(response);
    }
);
Selligent.getLastRemotePushNotification(
  (response) => { // success callback
      alert('last remote push notification -> '+response)
  }
);
Selligent.subscribeToEvents(
  (response) => { // success callback
      alert('Event recieved success '+response)
  },
  (error) => { // error callback
      alert('Event error '+error)
  },
  (eventCallback) => {
      alert('EVENT CALLBACK', eventCallback)
  }
);


    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Redirect" component={RedirectScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} /> 
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} /> 
          <Stack.Screen name="Signup" component={SignupScreen} /> 
          <Stack.Screen name="Country" component={CountryScreen} /> 
          <Stack.Screen name="Webview" component={WebviewScreen} options={{gestureEnabled: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

 
export const styles = StyleSheet.create({
  mainView: {flex: 1, flexDirection: 'column', backgroundColor: '#f8f8f8'},
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
  chooseLangTextShrink: {
    flexWrap: "wrap",
    fontSize: 24,
    fontWeight: "bold",
  },
  chooseLangTextDE: {
    fontSize: 22,
    fontWeight: "bold"
  },
  imageBackground: {width:'100%', backgroundColor: '#ebebeb', alignItems:'center', position: 'relative', top: 0, bottom: 0, left: 0, right: 0},
  image: {width: '90%', height: win.height/3.75},
 
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
  loginBtnXXL: {
    width: "90%",
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
  loginTextXS: {
    color: 'white',
    fontSize: 13,
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
  containerList: {
    flex: 3,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
  linkView: {alignContent:'center', alignItems:'center', marginTop:20},
  linkViewForgot: {alignContent:'center', alignItems:'center', marginTop:5},
  linkLine: {height:1, backgroundColor:'#ebebeb', width:'90%'},
  linkColor: {color:'#a1a1a1'},
  linkDecoration: {color:'#a1a1a1', textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#a1a1a1"},
  menu: {position: "absolute", bottom:0 , left:0, width: win.width, height: 80, backgroundColor: "#393939", flexDirection: "row"},
  menuOption: {flex:1, alignItems: 'center', alignSelf: 'center', marginTop: 15},
  menuOptionView: {flex:1, alignItems: 'center', alignSelf: 'center'},
  menuOptionImage: {width: 45, height: 45}
});