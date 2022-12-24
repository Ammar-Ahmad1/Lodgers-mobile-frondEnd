// import { Text, View } from 'react-native'
// import React, { Component } from 'react'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { Marker } from 'react-native-maps';
// import { StyleSheet } from 'react-native';
// export class Maps extends Component {
//   render() {
//     return (
//         <View style={styles.container}>
//         <MapView style={styles.map} />
//       </View>
//     )
//   }
// }
import { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {/* {location && <Marker coordinate={location.coords} />} */}
      <MapView style={styles.map}
         showsUserLocation={true}
         followsUserLocation={true}
      >
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
  });
// export default Maps
