import React, { Component, useEffect,useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,Button,Alert } from "react-native";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import {useNavigation} from '@react-navigation/native';
import {usePaymentSheet} from '@stripe/stripe-react-native';


function MaterialCardWithImageAndTitle1(props) {
  const booking = props.booking;
  const navigation = useNavigation();
  const deleteBooking = (id) => {
    console.log(id)
    Axios.delete(`http://10.0.2.2:5000/delete-booking/${id}`)
    .then(res => {
      console.log(res.data)
      //call the getBookings function in user bookings again to refresh the list
      props.getBookings()
      
    })
  }
  const updateStatus = (id) => {
    Alert.alert(
        'Confirm Booking',
        'Are you sure you want to confirm this booking?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: () => confirmBooking(id),
            },
        ],
        {cancelable: false},
    );
    }
    const confirmBooking = (id) => {
        Axios.put(`http://10.0.2.2:5000/change-booking-status/${id}`)
        .then(res => {
            console.log(res.data)
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
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.titleStyle}>
            {props.titleStyle || "Title goes here"}
          </Text>
          <Text style={styles.subtitleStyle}>{booking.message}</Text>
          <Text style={styles.subtitleStyle}>{booking.status?
          "Booking Confirmed":"Booking Pending"
          }</Text>

        </View>
        <Image
          source={{uri: booking.roomImage}}
          style={styles.cardItemImagePlace}
        ></Image>
    </View>

          {
            !booking.status?
                <View style={styles.btn}>
                <Button
                    title="Confirm Booking"
                    color="blue"
                    onPress={() => updateStatus(booking._id)}
                >
                </Button>
                </View>
                :null
          }
            {
                booking.paid?
                    <View style={styles.btn}>
                    <Button
                    title="Paid"
                    color="green"
                >
                </Button>
                    </View>
                    :
                    <View style={styles.btn}>
                    <Button
                        title="Waiting for Payment"
                        color="purple"
                >
                </Button>
                    </View>
            }

{/* 
      {!booking.status||booking.paid? 
      <View style={styles.btnn}>
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
      } */}

{/*       
        <View style={styles.btn}>
        <Text style={{color:"green"}}>Paid</Text>
        </View> */}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "grey",
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
  btnn:{
    backgroundColor: "red",
    width: 50,
  },

  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
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
  subtitleStyle: {
    fontSize: 14,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    height: 100,
    width: 100,
    margin: 16,

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
    marginTop: 25,

  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
buttonContainer: {
    flex: 1,
}
});

export default MaterialCardWithImageAndTitle1;
