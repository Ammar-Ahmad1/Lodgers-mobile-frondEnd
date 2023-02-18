import React, { useState } from 'react'
import Background from '../../components/Background'
import BackButton from '../../components/BackButton'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { emailValidator } from '../../helpers/emailValidator'
import Axios from 'axios'
import { Alert } from 'react-native'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(true)
  const sendResetPasswordEmail = async() => {
    const emailError = emailValidator(email)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    try {
    fetch('http://10.0.2.2:5000/email-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message === 'Email sent successfully!') {
        console.log('Success:', data)
        Alert.alert('Success', 'Password reset link sent to your email.')
        setShowOTP(!showOTP)
      }
      else {
        Alert.alert('Error', data.message) 
      }
      })
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong. Please try again later.')
    }

  }
  const handleReset = async() => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.')
      return
    }
    try {
      fetch('http://10.0.2.2:5000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword, otp }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.message === 'Password changed successfully!') {
          console.log('Success:', data)
          Alert.alert('Success', 'Password changed successfully.')
          navigation.navigate('LoginScreen')
        }
        else {
          Alert.alert('Error', data.message)
        }
        })
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong. Please try again later.')
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      {showOTP ?
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      :
      <TextInput
        label="OTP"
        returnKeyType="next"
        value={otp}
        onChangeText={(text) => setOtp(text)}
      />
      }
      {showOTP ?
      <Button mode="contained" onPress={sendResetPasswordEmail}>
        Send OTP
      </Button>
      :
      <TextInput
        label="New Password"
        returnKeyType="next"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
      />
      }
      {showOTP ?
      null
      :
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      }
      {showOTP ?
      null
      :
      <Button mode="contained" onPress={handleReset}>
        Reset Password
      </Button>
      }
      {showOTP ?
      null
      :
      <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
        Back to Login
      </Button>
      }

    </Background>
  )
}