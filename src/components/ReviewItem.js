import React from 'react';
import { View, Text, Image } from 'react-native';

const ReviewItem = ({ review }) => {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{review.email} </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Image style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }} 
        //source={{ uri: 'https://example.com/profile-picture.jpg' }}
         />
        <Text style={{ fontSize: 16 }}>{review.name}</Text>
      </View>
      <Text style={{ marginBottom: 8 }}>{review.review}</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* {[1, 2, 3, 4, 5].map(star => (
        //   <Image key={star} style={{ width: 16, height
        //     : 5, marginRight: 4 }} source={star <= review.rating ? require('./star-filled.png') : require('./star-outline.png')} />
            ))} */}
          </View>
        </View>
);
};

export default ReviewItem;        