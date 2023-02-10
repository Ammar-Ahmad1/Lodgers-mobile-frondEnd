import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button,Platform,Alert} from "react-native";
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native'
import Background1 from "../../components/Background1";


const PaymentScreen = (props) => {
    const booking=props.route.params.booking;
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardDetails, setCardDetails] = React.useState(null);
    const {confirmPayment, loading} = useConfirmPayment();
    const handlePayPress = async () => {
    if (!cardDetails?.complete) {
        Alert.alert('Error', 'Please enter valid card details');
        return;
    }

       const response = await fetch('http://10.0.2.2:5000/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'pkr',
            amount: booking.price,
            bookingId:booking._id,
            customer: booking.userId,
            owner:booking.ownerId
        }),
    });
    const {clientSecret, id} = await response.json();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
        type: 'Card',
        paymentMethodType: 'Card',

        billingDetails: {
            name: 'Jenny Rosen',
        }
    });
    if (error) {
        console.log(error,"errorHelooo");
    } else if (paymentIntent) {
        console.log(paymentIntent);
        Alert.alert('Success', 'Your payment was confirmed!');
    } 


    };

  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Lodgers</Text>
        <Text style={styles.bookingInfo}>Booking Information</Text>
      </View>

        <Text style={styles.label}>Enter Card Details</Text>   
       <CardField
        onCardChange={(cardDetails) => {console.log(cardDetails),setCardDetails(cardDetails)}}
        postalCodeEnabled={false}
        placeholder={{
            number: '4242 4242 4242 4242',
            }}
        cardStyle={styles.card}
        style={{
            width: '100%',
            height: 50,
            marginVertical: 30,

        }}
        
        />

      <TouchableOpacity style={styles.button} >
        <Button title="Pay" onPress={handlePayPress} disabled={loading} />
      </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  label: {
    fontWeight: "bold",
    marginTop: 20
  },
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 20,
      },
    }),
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bookingInfo: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    marginTop: 10
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    width: "100%",
    marginTop: 20
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
    card:{
        borderWidth:1,
        color:'white',
        width:'100%',
        height:50,
        marginVertical:30,
        backgroundColor:'white'
    }

});

export default PaymentScreen;
