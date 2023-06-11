import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "react-native-paper";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import Header from "../../components/Header";

const UserBooking = ({ navigation, route }) => {
  const { item, hotel } = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  const theme = useTheme();

  const bookRoom = () => {
    if (contact) {
      AsyncStorage.getItem("user").then((user) => {
        user = JSON.parse(user);
        fetch("http://10.0.2.2:5000/add-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hostelId: item._id,
            userId: user._id,
            checkIn: date,
            contactNo: contact,
            customerName: user.name,
            price: hotel.roomPrice,
            message: message,
            ownerId: item.owner,
            hostelName: item.name,
            roomImage: hotel.roomImage,
            roomType: hotel.roomType,
            roomId: hotel._id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              Alert.alert("Error", data.error);
            } else {
              Alert.alert("Success", "Booking Successful");
              navigation.navigate("UserDashboard");
            }
          });
      });
    } else {
      Alert.alert("Error", "Please fill all the fields");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Booking Details</Header>
      <Header style={{ fontSize: 20 }}>{item.name}</Header>
      <View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Check In:</Text>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerText}>
              {date ? date.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Contact No:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Contact No."
            onChangeText={(text) => setContact(text)}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Price:</Text>
          <Text style={styles.priceText}>{hotel.roomPrice}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Any Message:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Message"
            onChangeText={(text) => setMessage(text)}
          />
        </View>
        <TouchableOpacity onPress={bookRoom} style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          style={styles.datePicker}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShow(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
  },
  fieldLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerButton: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  datePickerText: {
    color: "black",
  },
  textInput: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  priceText: {
    width: 200,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});

export default UserBooking;
