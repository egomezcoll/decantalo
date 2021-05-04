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
import { styles } from "./../App";
import CheckBox from '@react-native-community/checkbox';
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

function SignupScreen({ navigation, route }) {
    const { languageCode } = route.params;
    I18n.locale = languageCode;
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [lastname, setLastname] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [birthdateError, setBirthdateError] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);
    const [signupError, setSignupError] = useState("");
    const isValidEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(email);
    }
    const getAge = (dateString) => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }
    const isValidBirthdate = () => {
        let birthdateSplitted = birthdate.split('/');
        if(birthdateSplitted.length === 3 && birthdateSplitted[0].length === 2 && birthdateSplitted[1].length === 2 && birthdateSplitted[2].length === 4 && getAge(birthdateSplitted[1]+'/'+birthdateSplitted[0]+'/'+birthdateSplitted[2]) >= 18){
            return true;
        } else {
            return false;
        }
    }

    const showSignupError = (text) => {
      let errorHandled = false;
      if(text.includes('Por favor, revisa tu fecha de nacimiento')){
        errorHandled = true;
        setSignupError('Por favor, revisa tu fecha de nacimiento');
      }

      if(text.includes('La dirección de correo electrónico ya está en uso, por favor, elige otra o inicia sesión')){
        errorHandled = true
        setSignupError('La dirección de correo electrónico ya está en uso, por favor, elige otra o inicia sesión');
      }

      if(!errorHandled){
        setSignupError('Por favor, revisa los datos introducidos');
      }


      
    }
    const doSignup = () => {
        setSignupError('');

        if(!toggleCheckBox){
          setCheckboxError(true);
          setSignupError('Debes seleccionar la casilla de verificación si quieres continuar');
        }else{
          setCheckboxError(false);
        }
        if(birthdate.length === 0 || !isValidBirthdate()) {
            setBirthdateError(true);
            setSignupError('Por favor, revisa la fecha introducida. Utiliza un formato que coincida con el solicitado. Debes tener +18 años.');
        }else {
            setBirthdateError(false);
        }
        if(lastname.length === 0) {
          setLastnameError(true);
          setSignupError('Por favor, introduce los apellidos');
        }else {
            setLastnameError(false);
        }
        if(name.length === 0) {
          setNameError(true);
          setSignupError('Por favor, introduce un nombre');
        }else{
            setNameError(false);
        }
        if(password.length <= 4) {
          setPasswordError(true);
          setSignupError('Por favor, revisa la contraseña introducida. Utiliza un formato que coincida con el solicitado');
        }else {
            setPasswordError(false);
        }
        if(email.length === 0 || !isValidEmail()) {
          setEmailError(true);
          setSignupError('Por favor, revisa el email introducido');
        } else {
            setEmailError(false);
        }

        if(!emailError && !passwordError && !nameError && !lastnameError && !birthdateError && toggleCheckBox){
            let details = {
                email: email,
                password: password,
                firstname: name,
                lastname: lastname,
                birthday: birthdate,
                psgdpr: 1,
                submitCreate:1,
                back: 'my-account'
            }
            const searchParams = Object.keys(details).map((key) => {
              return encodeURIComponent(key) + '=' + encodeURIComponent(details[key]);
            }).join('&');
            
         
            fetch(`https://www.decantalo.com/es/es/iniciar-sesion?create_account=1`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: searchParams
            })
            .then((resp)=>{ return resp.text() }).then((text)=>{ 
                text.includes('js-invalid-feedback-browser') ? showSignupError(text): navigation.navigate('Country', {
                email: email,
                password: password,
                languageCode: languageCode
                }) 
            });
        }
    }
  
    return ( 
      <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: '#f8f8f8'}}>
          <View style={{flex: 4, alignItems: "center"}}>
              <View style={{width:'100%', backgroundColor: '#ebebeb', alignItems:'center', position: 'relative', top: 0, bottom: 0, left: 0, right: 0}}>
                <Image resizeMode="contain" style={{width: '90%', height: win.height/3.75}} source={require("./../assets/logo.png")} />
              </View>
              <Image resizeMode="contain" style={{width: '90%', height: win.height/3.75}} source={require("./../assets/registro.png")} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.containerChooseLangTitle}>
              <Text style={styles.chooseLangText}>{I18n.t('REGISTRATE')}</Text>
            </View>
            <View style={signupError.length > 0 ? styles.visible : styles.hidden}>
              <View style={{width:"85%", justifyContent:"center", alignItems: "center",  marginBottom:10, backgroundColor: "#f8d7da", borderColor: "#f5c6cb", borderWidth: 1, padding:10}}>
                <Text style={{color: '#721c24'}}>{signupError}</Text>
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={emailError ? styles.TextInputError : styles.TextInput}
                placeholder={I18n.t('INTRODUCE_EMAIL')}
                placeholderTextColor="#6d6860"
                color="#515150"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
      
            <View style={styles.inputView}>
              <TextInput
                style={passwordError ? styles.TextInputError : styles.TextInput}
                placeholder={I18n.t('CONTRASENA')}
                placeholderTextColor="#6d6860"
                color="#515150"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={nameError ? styles.TextInputError : styles.TextInput}
                placeholder={I18n.t('NOMBRE')}
                placeholderTextColor="#6d6860"
                color="#515150"
                onChangeText={(name) => setName(name)}
              />
            </View>
      
            <View style={styles.inputView}>
              <TextInput
                style={lastnameError ? styles.TextInputError : styles.TextInput}
                placeholder={I18n.t('APELLIDOS')}
                placeholderTextColor="#6d6860"
                color="#515150"
                onChangeText={(lastname) => setLastname(lastname)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={birthdateError ? styles.TextInputError : styles.TextInput}
                placeholder={I18n.t('FECHA_NACIMIENTO')}
                placeholderTextColor="#6d6860"
                color="#515150"
                onChangeText={(birthdate) => setBirthdate(birthdate)}
              />
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    tintColor={checkboxError ? 'red' : '#aaaaaa'}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Text style={{width:'80%',alignSelf: "center", marginLeft: 10}}>{I18n.t('CONDICIONES')}</Text>
            </View>
            <View style={styles.containerLoginBtnScrollView}>
              <TouchableOpacity style={styles.loginBtn} onPress={() => doSignup()}>
                <Text style={styles.loginText}>
                {I18n.t('ENVIAR')}
                </Text>
              </TouchableOpacity>
            </View> 
          </View>
          <View style={{alignContent:'center', alignItems:'center', marginTop:20}}>
            <View style={{height:1, backgroundColor:'#ebebeb', width:'90%'}}></View>
          </View>  
          <View style={{alignContent:'center', alignItems:'center', marginTop:20}}>
            <Text style={{color:'#a1a1a1'}}>{I18n.t('HAVE_ACCOUNT')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login', route.params)}>
              <Text style={{color:'#a1a1a1', textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#a1a1a1"}}>{I18n.t('SIGNIN_LINK')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 50}}></View>
      </ScrollView>  
    );
  }
  
  export default SignupScreen;
