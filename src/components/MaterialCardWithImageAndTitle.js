import React, { Component, useEffect,useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,Button,Alert,Modal } from "react-native";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import {usePaymentSheet} from '@stripe/stripe-react-native';
import BookingDetails from "./BookingDetails";
import Icon from 'react-native-vector-icons/Entypo';

function MaterialCardWithImageAndTitle(props) {
  const booking = props.booking;
  const navigation = useNavigation();
  const [showModal,setShowModal]=useState(false)
  const deleteBooking = (id) => {
    console.log(id)
    Axios.delete(`http://10.0.2.2:5000/delete-booking/${id}`)
    .then(res => {
      console.log(res.data)
      //call the getBookings function in user bookings again to refresh the list
      props.getBookings()
      
    })
  }
  const cancelBooking = (id) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', 
          onPress: () => deleteBooking(id),

        },
      ],
    );
  }
  return (
    <TouchableOpacity 
      onPress={()=>setShowModal(true)}
    >
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.subtitleStyle}>
            {"bookingId: " + booking._id}
          </Text>
          <Text style={styles.titleStyle}>
            {props.titleStyle || "Title goes here"}
          </Text>
          <Text style={styles.subtitleStyle}>{booking.message}</Text>
          <Text style={styles.subtitleStyle}>{booking.status?
          "Booking Confirmed":"Booking Pending"
          }</Text>
          <Text style={styles.subtitleStyle}> {"Rs."+booking.price}</Text>

        </View>
        <Image
          source={{uri: booking.roomImage}}
          style={styles.cardItemImagePlace}
        ></Image>
      </View>

          { booking.paid?
          <View style={{
            backgroundColor:"green",
            marginTop:10,
            height:35,
            alignItems:"center",
            justifyContent:"center",
            width:100,
            marginLeft:240
          }}>
          <Text style={{color:"white"}}>Paid</Text>
          </View>
          :null

          }




      {!booking.status||booking.paid? 
      <View style={styles.btn}>
      <Button
        title="Cancel"
        color="red"
        onPress={() => cancelBooking(booking._id)}

      >
      </Button>
      </View>
      :<View style={styles.btn}>
      <Button
        title="Proceed to Payment"
        color="#841584"
        onPress={() => navigation.navigate('PaymentScreen',{booking:booking})}
      >
      </Button>
      </View>
     
      }    
    <Modal animationType="slide" transparent visible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
        <Image source={{ uri: booking.roomImage }} style={styles.image} />
        <Text style={styles.description}> Booking ID: {booking._id}</Text>
        <Text style={styles.title}>{booking.hostelName}</Text>
        <Text style={styles.price}>Rs.{booking.price}/month</Text>
        <Text style={styles.description}>{booking.message}</Text>
        <Text style={styles.description}>{booking.status?"Booking Confirmed":"Booking Pending"}</Text>
        <Text style={styles.description}>
          {booking.paid?"Payment Confirmed":"Waiting For Payment"}
          </Text>
        <Text style={styles.description}>CheckIn Date: {booking.checkIn}</Text>
        <Text style={styles.description}>ContactNo: {booking.contactNo}</Text>
          <TouchableOpacity onPress={()=>{setShowModal(false)}} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  </View>
</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CCC",
    // flexWrap: "nowrap",
    backgroundColor: "lightgrey",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
  },
  titleStyle: {
    fontSize: 24,
    color: "#000",
    paddingBottom: 12
  },
  header:{
    fontSize: 24,
    color: "#000",
    paddingBottom: 12,
    textAlign:"center",
    fontWeight:"bold",
    marginTop:20

  },
  subtitleStyle: {
    fontSize: 12,
    color: "#000",
    lineHeight: 15,
    opacity: 0.5,
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 80,
    width: 80,
    marginTop: 50,
    marginRight: 30


  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  },
  actionButton1: {
    padding: 8,
    height: 36,
    marginRight: 16

  },
  actionText1: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9,
    fontWeight: "bold",

  },
  actionButton2: {
    padding: 8,
    height: 36
  },
  actionText2: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9
  },
  btn:{
    backgroundColor: "red",
    marginTop: 10,
    marginLeft: 120,
    width:100,
    alignContent: 'center',

  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#585858',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: '#00C48C',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#585858',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#00C48C',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MaterialCardWithImageAndTitle;
