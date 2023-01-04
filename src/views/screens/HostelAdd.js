import React, { useState,useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity,Image,AsyncStorage,ScrollView,Modal } from 'react-native'
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
import TvIcon from 'react-native-vector-icons/MaterialIcons';
import WifiIcon from 'react-native-vector-icons/FontAwesome';
import ParkingIcon from 'react-native-vector-icons/FontAwesome5';
import LaundryIcon from 'react-native-vector-icons/MaterialIcons';
import KitchenIcon from 'react-native-vector-icons/MaterialIcons';
import FoodIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SecurityIcon from 'react-native-vector-icons/MaterialIcons';
//import * as EIcon from 'react-native-vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Axios from 'axios';
import * as Location from 'expo-location';
import COLORS from '../../consts/colors';

export default function RegisterScreen({navigation, route}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [name, setName] = useState({ value: '', error: '' })
    const [description, setDescription] = useState({ value: '', error: '' })
    const [location, setLocation] = useState({ value: '', error: '' })
   const [longitude, setLongitude] = useState({ value: '', error: '' })
    const [latitude, setLatitude] = useState({ value: '', error: '' })
   // const [owner, setOwner] = useState()
  const owner=route.params
  console.log(owner)
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })


   const getAddress = async() =>{ 
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords.latitude)
   setLatitude(location.coords.latitude)
    console.log(location.coords.longitude)
    setLongitude(location.coords.longitude)
    }
const [image, setImage] = useState(null);  
//hostel features modal
const [modalVisible, setModalVisible] = useState(false);

//hostel features
const [featuress, setFeatures] = useState([]);
const [wifi, setWifi] = useState(false);
const [parking, setParking] = useState(false);
const [security, setSecurity] = useState(false);
const [laundry, setLaundry] = useState(false);
const [kitchen, setKitchen] = useState(false);
const [tv, setTv] = useState(false);
const [ac, setAc] = useState(false);
const [heater, setHeater] = useState(false);
const [gym, setGym] = useState(false);



useEffect(() => {
  (async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(status === 'granted');
  })();

  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if(status === 'granted'){
      console.log('location permission granted')
    }else{
      console.log('location permission not granted')
    } 
  })();

  
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
//    console.log(featuress.wifi)
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('owner', owner);
    formData.append('tv', tv);
    formData.append('wifi', wifi);
    formData.append('parking', parking);
    formData.append('security', security);
    formData.append('laundry', laundry);
    formData.append('kitchen', kitchen);

    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
      console.log(formData)
      fetch("http://10.0.2.2:5000/add-hostel", {
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
  const closeModal = () => {
    setModalVisible(!modalVisible)
    setWifi(false)
    setParking(false)
    setSecurity(false)
    setLaundry(false)
    setKitchen(false)
    setTv(false)
  }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <View style={{position: "absolute",top:64,alignItems:"center", width: "100%"}}> */}
      <Header>Add New Hostel</Header>
      {/* <Logo /> */}
      <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage}>
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      {!image && <FoodIcon name="camera" size={48} color="#fff" />}
        </TouchableOpacity>
      
     

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
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      {/* <View style={{
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  }}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
          //on press booking
          onPress={pickImage}
          >

          Select Picture
          </Text>
          </View> */}
          <View style={ {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  }}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
          //on press booking
          onPress={getAddress}
          >
          Get Current Location
          </Text>
          </View>
          
        <TouchableOpacity  style={styles.btn}
            onPress={() => {
              // setModalVisible(modalVisible);
             setModalVisible(true);

            }}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide">
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>Hostel Features</Text>
        <View style={styles.features}>

          {!wifi?
          <View style={styles.feature}>
            <WifiIcon name="wifi" size={30} color="#000" />
            <Text style={styles.featureText} 
             onPress={() => { setWifi(!wifi ? true : false) } }
            >
              Wifi</Text>
          </View>
          :<View style={styles.featureSelected}>
          <WifiIcon name="wifi" size={30} color="#000" />
          <Text style={styles.featureText} 
           onPress={() => { setWifi(!wifi ? true : false) } }
          >
            Wifi</Text>
        </View>}

          {!parking?
          <View style={styles.feature}>
            <ParkingIcon name="parking" size={30} color="#000" />
            <Text style={styles.featureText} onPress={() => { setParking(!parking ? true : false) } }>Parking</Text>
          </View>
          :<View style={styles.featureSelected}>
          <ParkingIcon name="parking" size={30} color="#000" />
          <Text style={styles.featureText} onPress={() => { setParking(!parking ? true : false) } } >Parking</Text>
        </View>}


          {!security?
          <View style={styles.feature}>
            <SecurityIcon name="security" size={30} color="#000" />
            <Text style={styles.featureText} onPress={() => { setSecurity(!security ? true : false) } } >Security</Text>
          </View>
          :<View style={styles.featureSelected}>
          <SecurityIcon name="security" size={30} color="#000" />
          <Text style={styles.featureText} onPress={() => { setSecurity(!security ? true : false) } } >Security</Text>
        </View>}

          {!laundry?
          <View style={styles.feature}>
            <LaundryIcon name="local-laundry-service" size={30} color="#000" />
            <Text style={styles.featureText}  onPress={() => { setLaundry(!laundry ? true : false) } }>Laundry</Text>
          </View>
          :<View style={styles.featureSelected}>
          <LaundryIcon name="local-laundry-service" size={30} color="#000" />
          <Text style={styles.featureText}  onPress={() => { setLaundry(!laundry ? true : false) } }>Laundry</Text>
        </View>}
          {!kitchen?
          <View style={styles.feature}>
            <FoodIcon name="food" size={30} color="#000" />
            <Text style={styles.featureText} onPress={() => { setKitchen(!kitchen ? true : false) } }>Kitchen</Text>
          </View>
          :<View style={styles.featureSelected}>
          <FoodIcon name="food" size={30} color="#000" />
          <Text style={styles.featureText} onPress={() => { setKitchen(!kitchen ? true : false) } }>Kitchen</Text>
        </View>}
          {!tv?
          <View style={styles.feature}>
            <TvIcon name="tv" size={30} color="#000" />
            <Text style={styles.featureText} onPress={() => { setTv(!tv ? true : false) } }>TV</Text>
          </View>
          :          <View style={styles.featureSelected}>
          <TvIcon name="tv" size={30} color="#000" />
          <Text style={styles.featureText} onPress={() => { setTv(!tv ? true : false) } }>TV</Text>
        </View>}
          {/* <View style={styles.feature}>
            <EIcon name="spinner-3" size={30} color="#000" />
            <Text style={styles.featureText}>AC</Text>
          </View>
          <View style={styles.feature}>
            <EIcon name="spinner-3" size={30} color="#000" />
            <Text style={styles.featureText}>Heater</Text>
          </View>
          <View style={styles.feature}>
            <EIcon name="spinner-3" size={30} color="#000" />
            <Text style={styles.featureText}>Gym</Text>
          </View> */}
        </View>
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={()=>closeModal()}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={ 
              () => {
              setModalVisible(!modalVisible);
            }
          }
          >
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
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
  btn: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%'
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
   // backgroundColor: '#F194FF',
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  featureSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  featureText: {
    marginLeft: 10,
    fontSize: 20,
    padding: 10
  },
  featureIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F194FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureIconText: {
    color: 'white',
    fontSize: 20
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
    alignItems: 'center'
  }
})
