import React, { useState,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,Image,AsyncStorage,ScrollView } from 'react-native'
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
import EIcon from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import Axios from 'axios';

export default function RegisterScreen({navigation, route}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [name, setName] = useState({ value: '', error: '' })
    const [description, setDescription] = useState({ value: '', error: '' })
    const [location, setLocation] = useState({ value: '', error: '' })
   // const [owner, setOwner] = useState()
  const owner=route.params
  console.log(owner)
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
//    const getAddress = () =>{ 
//     if (hasLocationPermission) {
//         Geolocation.getCurrentPosition(
//         (position) => {
//         console.log(position);
//         },
//         (error) => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge:          10000 }
//         );
//         }

//     }
const [image, setImage] = useState(null);
// const OwnerID = () => {
//   AsyncStorage.getItem('user').then((user) => {
//     setOwner(user._id)
//     console.log(user._id)
//   })
// }

useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(status === 'granted');
  })()
},  []);

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result.assets[0]);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }

};
  if(hasGalleryPermission === false){
    return <Text>No access to camera</Text>
  }
  const onSignUpPressed = () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('location', "islamabad");
    formData.append('owner', owner);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
      console.log(formData)
      fetch("http://192.168.1.13:5000/add-hostel", {
        body: formData,
        method: "post",
        headers: {
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.errors) {
            setError(result.errors);
          } else {
            navigation.navigate('OwnerHome')
            console.log(result)
        }
        })
        .catch((err) => {
          console.log(err);
        });
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Add New Hostel</Header>
      <ScrollView  
      style={{ flex: 1, width: '100%' }}
      contentContainerStyle={{ alignItems: 'center' }}
      keyboardShouldPersistTaps="handled"

      >
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="description"
        returnKeyType="next"
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: '' })}
      />

                {/* <EIcon name="location"       style={{
        flexDirection: "row",
        justifyContent: "flex-end"
      }} size={38} color="black"
          onPress={pickImage}
        /> */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button mode="contained" onPress={pickImage} style={{ marginTop: 24 }}>
        
      Select Picture
    </Button>
   
      {/* <Button
        mode="contained"
        //onPress={getAddress}
        style={{ marginTop: 24 }}
        >
            getCurrentPosition
        </Button> */}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Add
      </Button>
      </ScrollView>
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
})
