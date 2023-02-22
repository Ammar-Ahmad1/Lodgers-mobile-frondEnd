import React from 'react';
import { View, Text,Modal } from 'react-native';

export default function componentName({booking}) {
  
  return (
    <Modal>
      <View>
        <Text>Booking Details</Text>
        <Text>Booking ID: {booking.id}</Text>
        <Text>Booking Date: {booking.date}</Text>
        <Text>Booking Time: {booking.time}</Text>
        <Text>Booking Status: {booking.status}</Text>
      </View>
    </Modal>

  );
}
