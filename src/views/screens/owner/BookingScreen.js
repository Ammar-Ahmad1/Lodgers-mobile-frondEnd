import { 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
  Button,

} from 'react-native'
import React from 'react'
import Axios from 'axios'
import BackButton from '../../../components/BackButton'
import Background from '../../../components/Background'
import Header from '../../../components/Header'


const BookingScreen = ({navigation, route} ) => {
  const id= route.params
  const [bookings, setBookings] = React.useState([])
  const getBookings = () => {
    Axios.get(`http://10.0.2.2:5000/get-bookings-by-users/${id}`)
    .then(res => {
      console.log(res.data.booking)
      setBookings(res.data.booking)
    }
    )

  }
  React.useEffect(() => {
    getBookings()
  }, [])
  const deleteBooking = (id) => {
    console.log(id)
    Axios.delete(`http://10.0.2.2:5000/delete-booking/${id}`)
    .then(res => {
      console.log(res.data)
      getBookings()
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
    <Background>
       <BackButton goBack={navigation.goBack} />
       
       <Header>Bookings</Header>
       <ScrollView style={{width: '100%'}}>
        {bookings&&bookings.map((item, index) => {
          return (
            <View  >
            <View style={styles.rectangle} key={index}>
              <Text style={styles.header}>Booking {index + 1}</Text>
              <Text style={styles.bookingText}>Check In: {item.checkIn}</Text>
              {/* <Text style={styles.bookingText}>Check Out: {item.checkOut}</Text> */}
              <Text style={styles.bookingText}>Price: {item.price}</Text>
              <Text style={styles.bookingText}>Message: {item.message}</Text>
              <Text style={styles.bookingText}>Contact: {item.contactNo}</Text>
              <Text style={styles.bookingText}>Customer Name: {item.customerName}</Text>
              {item.status? <Text style={styles.bookingText}>Status: Confirmed</Text>: <Text style={styles.bookingText}>Status: Pending</Text>}
              {item.status?null:
              <View style={styles.button}>
                <Button 
                  title="Cancel"
                  color="red"
                  onPress={() => cancelBooking(item._id)}
                />
              </View>
              }
            </View>
            </View>
          )
        })}

        </ScrollView>
      
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
  },
  button:{
    width: 100,
    height: 40,
    // backgroundColor: 'red',
    alignItems: 'center',
    marginLeft: 150,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,

  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rectangle: {

    height: 320,
    width: 100*3,
    backgroundColor: 'yellow',
    // position: 'absolute', 
    // zIndex: 99,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  bookingText: {
    fontSize: 20,
    fontWeight: 'light',
  },

});
export default BookingScreen