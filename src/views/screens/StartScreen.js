import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import { LoginManager } from 'react-native-fbsdk-next'
import auth from '@react-native-firebase/auth';
import * as Facebook from 'expo-facebook';
//import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

export default function StartScreen({ navigation }) {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '999768544313588',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
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
        onPress={logIn}
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