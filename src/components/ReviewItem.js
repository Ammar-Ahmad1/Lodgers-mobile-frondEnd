import React from 'react';
import { View, Text, Image } from 'react-native';

const ReviewItem = ({ review }) => {
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 10, borderWidth:1, borderColor:'gray',borderRadius:10, marginLeft:2,marginRight:2}}>
      {review.image ? (
        <Image source={{ uri: review.image }} style={{ width: 70, height: 70, borderRadius: 35 }} />
      ):(<Image source={require('../assets/images/user.png')} style={{ width: 70, height: 70, borderRadius: 35 }} />)
      }
     {/* <Image source={{uri: review.image}} style={{ width: 70, height: 70, borderRadius: 35 }} /> */}
    <View style={{ marginLeft: 10 ,marginTop:5 }}>
      <Text style={{ fontWeight: 'bold',fontSize:15 }}>{review.name}</Text>
      <Text style={{fontSize: 13,flexWrap:'wrap'}}>{review.review}</Text>
      {/* <Text style={{ color: 'gray' }}>{item.date}</Text> */}
    </View>
  </View>
);
};
 
export default ReviewItem;        