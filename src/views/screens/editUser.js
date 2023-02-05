import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, AsyncStorage,Image} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function EditUser({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
const [user, setUser] = useState([])
AsyncStorage.getItem('user').then((user) => {
    if (user) {
        setUser(JSON.parse(user))
    }
})

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
   //Update api
   fetch("http://10.0.2.2:5000/update-user", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name,
        email,
        password,
        
    }),
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        AsyncStorage.setItem('user', JSON.stringify(data))
        if(data.role === "owner")
        navigation.navigate('OwnerHome')
        else if(data.role === "user")
        navigation.navigate('UserDashboard')
    })
    .catch((err) => {
        console.log(err)
    }
    )



  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <TouchableOpacity style={styles.avatarPlaceholder} >
      {user.image ? (
        <Image source={{ uri: user.image }} style={styles.avatar} />
      ) : (
        <MaterialCommunityIcons
          name="account"
          size={40}
          color="#fff"
        />
      )}

      </TouchableOpacity>
      <Header>Update Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={user.name}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={user.email}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
            <TextInput
        label="Password"
        returnKeyType="done"
        value={user.password}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        update
      </Button>
      <Button 
        mode="contained"
        onPress={() => AsyncStorage.clear().then(() => navigation.navigate('Home'))}
        style={{ marginTop: 24 }}
        >
            Logout
        </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 70
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: '#E1E2E6',
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})