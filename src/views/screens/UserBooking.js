import { ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Alert,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react'
import { useTheme } from 'react-native-paper'
import Background from '../../components/Background'

const UserBooking = ({navigation,route}) => {
    const {item,hotel} = route.params
    const [date, setDate] = React.useState(new Date());
    const [date1, setDate1] = React.useState(new Date());
    const [show , setShow] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [contact, setContact] = React.useState('')

    console.log(item)
    console.log(hotel)
    const bookRoom = () => {
        AsyncStorage.getItem('user').then(user=>{
            user = JSON.parse(user)    
        if( contact){
            fetch('http://10.0.2.2:5000/add-booking',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    hostelId:item._id,
                    userId:user._id,
                    checkIn:date,
                    contactNo:contact,
                    customerName:user.name,
                    price:hotel.roomPrice,
                    message:message,
                    ownerId:item.owner,
                    hostelName:item.name,
                    roomImage:hotel.roomImage,
                    roomType:hotel.roomType,
                    roomId:hotel._id,
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    Alert.alert('Error',data.error)
                }
                else{
                    Alert.alert('Success','Booking Successful')
                    navigation.navigate('UserDashboard')
                }
            }
            )
        }
        else{
            Alert.alert('Error','Please fill all the fields')
        }
    })
}

  return (
    <Background>
        <Logo />
        <Header>Booking Details</Header>
        <Header style={{fontSize:20}}>{item.name}</Header>
        <View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems :'center'}}>Check In : </Text>
            
            <TouchableOpacity onPress={()=>setShow(true)} style={{width:200,borderWidth:1,borderColor:'black',padding:10,borderRadius:10,backgroundColor:'white'}}>
                <Text style={{color:'black'}}>
                {date?date.toDateString():'Select Date'}
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems :'center'}}>Contact No : </Text>
            <TextInput style={{width:200,borderWidth:1,borderColor:'black',padding:10,borderRadius:10,backgroundColor:'white'}} placeholder="Enter Contact No."
            onChangeText={(text)=>setContact(text)}
            />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems :'center'}}>price: </Text>
            <Text style={{width:200,borderWidth:1,borderColor:'black',padding:10,borderRadius:10,backgroundColor:'white'}}>{hotel.roomPrice}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems :'center'}}>Any Message: </Text>
            <TextInput style={{width:200,borderWidth:1,borderColor:'black',padding:10,borderRadius:10,backgroundColor:'white'}} placeholder="Enter Message"
            onChangeText={(text)=>setMessage(text)}
            />
        </View>



        <TouchableOpacity onPress={()=>bookRoom()} style={{backgroundColor:'black',padding:10,borderRadius:10,alignSelf:'center',marginTop:20}}>
            <Text style={{color:'white'}}>Book Now</Text>
        </TouchableOpacity>
    </View>
    
    {show&&(<DateTimePicker style={{width:100}} 
        value={date}
        mode={'date'}
        is24Hour={true}
        display="default"
        minimumDate={new Date()}
        onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate1(currentDate)
            setDate(currentDate);
            setShow(false)
        }}
    />)}
  </Background>
  )
}

export default UserBooking