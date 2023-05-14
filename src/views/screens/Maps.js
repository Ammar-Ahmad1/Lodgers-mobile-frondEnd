import { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Animated, Dimensions} from 'react-native';
import  { PROVIDER_GOOGLE } from 'react-native-maps';
//import MapView from 'expo';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import BackButton from '../../components/BackButton';
import Axios from 'axios';
// import MapCard from '../../components/MapCard';
const {width} = Dimensions.get('screen');
const CARD_WIDTH = width / 1.8;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
export default function App({navigation}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [tempHostel, setTempHostel] = useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const getHostels = async () => {
    const hostelss = await Axios.get(`http://10.0.2.2:5000/get-hostels`);
    setHostels(hostelss.data.hostels);
    // console.log(hostels[0].location.coordinates[0]);
    // console.log(hostels[0].location.coordinates[1]);
    let location1 = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setLocation(location1);
  }

  // const getHostelsNearby = async () => {
  //   try {
  //       let API_KEY="AIzaSyBZ4tgjiSbdleu8pBD1xFAnNpaTscTkZTo";
  //        let  location1= await Location.getCurrentPositionAsync({
  //           accuracy: Location.Accuracy.Balanced,

  //         });
  //         //setLocation(location1);
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location1.coords.latitude},${location1.coords.longitude}&radius=1000&type=point_of_interest&keyword=hotel&key=${API_KEY} `,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },

  //         method: 'GET',
          
  //       }
  //     );
  //     // console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     setHostels(data.results);
  //     console.log(hostels);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // getHostelsNearby();
      
    })();

    getHostels();

  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  return (

    
    <View style={styles.container}>
      
      {/* <BackButton goBack={navigation.goBack} /> */}
      <MapView style={styles.map}
         showsUserLocation={true}
         followsUserLocation={true}
         loadingEnabled={true}
         zoomEnabled={true}
      >
     
      {hostels.map((hostel, index) => (

          <Marker
            coordinate={{
              latitude: hostel.location.coordinates[1],
              longitude: hostel.location.coordinates[0],
            }}

            title={hostel.name}
            description={hostel.description}

          onPress={
            () => navigation.navigate('DetailsScreen', hostel)
          }

          />
        ))}

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
    endPadding: {
      paddingRight: width - CARD_WIDTH,
    },
    card: {
      padding: 10,
      elevation: 2,
      backgroundColor: '#FFF',
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: 'hidden',
    },



  });
// export default Maps




// import React from 'react';
// import MapView from 'react-native-maps';
// import { StyleSheet, View } from 'react-native';
// import Marker from 'react-native-maps';
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} 
//       showsUserLocation={true}
//       followsUserLocation={true}

//       />
//     <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });