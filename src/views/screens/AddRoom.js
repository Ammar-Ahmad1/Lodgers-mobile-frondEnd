import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,Image, ScrollView } from 'react-native'
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
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import Axios from 'axios';
const AddRoom = ({navigation, route}) => {
    const hostel = route.params
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [roomType, setRoomType] = useState({ value: '', error: '' })
    const [roomDescription, setRoomDescription] = useState({ value: '', error: '' })
    const [roomPrice, setRoomPrice] = useState({ value: '', error: '' })
    const [roomImage, setRoomImage] = useState(null)
    const [roomStatus, setRoomStatus] = useState(null)

    console.log(hostel)
    const onSignUpPressed = () => {
       const  formData = new FormData();
        formData.append('roomType', roomType.value)
        formData.append('roomDescription', roomDescription.value)
        formData.append('roomPrice', roomPrice.value)
        formData.append('roomImage', {
            uri: roomImage,
            type: 'image/jpeg',
            name: 'image.jpg'
        })
        formData.append('hostel', hostel._id)
        console.log(formData)
        fetch("http://192.168.1.13:5000/add-rooms", {
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
                navigation.navigate('OwnerDetails', hostel)
                console.log(result)
            }
            })
            .catch((err) => {
              console.log(err);
            });
    }
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
          setRoomImage(result.assets[0].uri);
        }
      
      };
        if(hasGalleryPermission === false){
          return <Text>No access to camera</Text>
        }
    return (
        <Background>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        {/* <ScrollView> */}
        <Header>Add Room</Header>
        
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4 }}>
        <Picker
        selectedValue={roomType.value}
        style={{ height: 50, width: 300 }}
        onValueChange={(roomType, itemIndex) => setRoomType({ value: roomType, error: '' })}
        itemStyle={{ backgroundColor: "white", color: "blue", fontFamily:"Ebrima", fontSize:17 }}

        >
        <Picker.Item label="One Seater" value="One Seater" />
        <Picker.Item label="Two Seater" value="Two Seater" />
        <Picker.Item label="Four Seater" value="Four Seater" />
        </Picker>
        </View>

        <TextInput
          label="Room Description"
          returnKeyType="next"
          value={roomDescription.value}
          onChangeText={(text) => setRoomDescription({ value: text, error: '' })}
        />
        <TextInput
          label="Room Price"
          returnKeyType="next"
          value={roomPrice.value}
          onChangeText={(text) => setRoomPrice({ value: text, error: '' })}
        />
         {roomImage && <Image source={{ uri: roomImage }} style={{ width: 200, height: 200 }} />}
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8 }}>
            <Icon name="camera" size={30} color="#900" onPress={pickImage}  />
                </View>
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Add
        </Button>
        {/* </ScrollView> */}
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
export default AddRoom