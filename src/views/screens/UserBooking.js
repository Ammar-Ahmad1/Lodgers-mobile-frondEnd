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
    AsyncStorage } from 'react-native'
import React from 'react'

const UserBooking = ({navigation,route}) => {
    const {item,hotel} = route.params
    console.log(item)
    console.log(hotel)
  return (
    <View>
        {/* form */}
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',alignItems :'center'}}>{item.name}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Booking Details</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Edit</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Check In</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Check Out</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Room Type</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Room No</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>No of Guests</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>No of Rooms</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Total Amount</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Rs. 5000</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Payment Method</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Cash</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Payment Status</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Pending</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Booking Status</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Pending</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Booking Date</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>12/12/2020</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginTop:20}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Booking Time</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>12:00 PM</Text>
        </View>
        
    </View>
  )
}

export default UserBooking