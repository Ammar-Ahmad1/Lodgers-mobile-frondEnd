import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import { LoginManager } from 'react-native-fbsdk-next'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome to Lodgers</Header>
      <Paragraph>
        The easiest way to find your accomodation.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>

      <Button
        mode="outlined"
        icon="facebook"
        //backgroundColor="Blue"
        onPress={() => {
          LoginManager.logInWithPermissions(["public_profile", "email"]).then(
          function (result) {
          if (result.isCancelled) {
          alert("Login Cancelled " + JSON.stringify(result))
          } else {
          alert("Login success with  permisssions: " + result.grantedPermissions.toString());
          alert("Login Success " + result.toString());
          }
          },
          function (error) {
          alert("Login failed with error: " + error);
          }
          )
          }}
      >
        Login with Facebook
      </Button>
      <Button
      mode="outlined"
      icon="google"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      >Login with Google</Button>
    </Background>
  )
}