import { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Animated, Dimensions} from 'react-native';
import  { PROVIDER_GOOGLE } from 'react-native-maps';
//import MapView from 'expo';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import BackButton from '../../components/BackButton';
import Axios from 'axios';
const HostelMarker = ({navigation, route}) => {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    //const [hostel, setHostel] = useState([ ])
    const hostel = route.params;
    console.log(hostel.name);
  return (
    <View style={styles.container}>
      
      
      <MapView style={styles.map}
         showsUserLocation={true}
         followsUserLocation={true}
         loadingEnabled={true}
         zoomEnabled={true}
      >
     
          <Marker
            // key={index}
            coordinate={{
              latitude: hostel.location.coordinates[1],
              longitude: hostel.location.coordinates[0],
            }}

            title={hostel.name}
            description={hostel.description}

          // onPress={
          //   () => navigation.navigate('DetailsScreen', hostel)
          // }
          
          />

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    mapCard: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    mapCardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    mapCardAddress: {
      fontSize: 12,
      color: 'grey',
    },
    scrollView: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    // endPadding: {
    //   paddingRight: width - CARD_WIDTH,
    // },
    // card: {
    //   padding: 10,
    //   elevation: 2,
    //   backgroundColor: '#FFF',
    //   marginHorizontal: 10,
    //   shadowColor: '#000',
    //   shadowRadius: 5,
    //   shadowOpacity: 0.3,
    //   shadowOffset: { x: 2, y: -2 },
    //   height: CARD_HEIGHT,
    //   width: CARD_WIDTH,
    //   overflow: 'hidden',
    // },



  });
export default HostelMarker