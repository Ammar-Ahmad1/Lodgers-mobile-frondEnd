import React,{useEffect,useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  FlatList,
  LogBox,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background1 from '../../components/Background1'
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import ReviewItem from '../../components/ReviewItem';
import BackButton from '../../components/BackButton';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;
const DetailsScreen = ({navigation, route}) => {
  const item = route.params;
const [rooms,setRooms] = useState([ ])
const scrollX = React.useRef(new Animated.Value(0)).current;
const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
const [activeCardIndex, setActiveCardIndex] = React.useState(0);
const [modalVisible, setModalVisible] = useState(false);
const [showReview, setShowReview] = useState(false);
const [review, setReview] = useState('');
const [reviews, setReviews] = useState([]);
const [user, setUser] = useState(null);
const [reviewUser, setReviewUser] = useState([]);
// const booking = () => {
//   AsyncStorage.getItem('user').then((user) => {
//     if (user) {
//       navigation.navigate('Home', {item});
//     } else {
//       navigation.navigate('LoginScreen');
//     }
//   });
// };
const getReviews = async () => {
  const reviews = await Axios.get(`http://10.0.2.2:5000/get-reviews/${item._id}`);
  setReviews(reviews.data.reviews);
  // console.log(reviews.data);
  //get users 

};
const getUserById = async (id) => {
  console.log("getting user with id", id)
  fetch(`http://10.0.2.2:5000/get-user/${id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data, "data")
    setReviewUser(data.user)
  })
  .catch(err => console.log(err))


  // const user = await Axios.get(`http://10.0.2.2:5000/get-user/${id}`);
  // setReviewUser(user.data.user);
  // console.log(user.user,"hello")
  // // console.log
};
const addReview = () => {
  AsyncStorage.getItem('user').then((user) => {
    let id=JSON.parse(user)._id
    let name=JSON.parse(user).name
    let email=JSON.parse(user).email
    if (user) {
      Axios.post('http://10.0.2.2:5000/add-review', {
        review,
        hostel: item._id,
        user: id,
        name:name,
        email:email
      }).then((res) => {
        // console.log(res.data);
        setModalVisible(false);
        setReview('');
      });
    } else {
      navigation.navigate('LoginScreen');
    }
  });
};



const roomList = async () => {
  const roommss = await Axios.get(`http://10.0.2.2:5000/get-rooms/${item._id}`, {
  });
  setRooms(roommss.data.room);
  // console.log(rooms);
};
useEffect(() => {
  roomList();
  getReviews();
  AsyncStorage.getItem('user').then((user) => {
    setUser(JSON.parse(user));
  });
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

}, []);
const Card = ({hotel, index}) => {
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 0, 0.7],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });
  const bookHostel = () => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        navigation.navigate('UserBooking', {item,hotel});
      } else {
        navigation.navigate('LoginScreen');
      }
    });
  };

  return (
    <TouchableOpacity
      disabled={activeCardIndex != index}
      activeOpacity={1}
      onPress={bookHostel}
     // onPress={() => navigation.navigate('DetailsScreen', hotel)}
     >
      <Animated.View style={{...style.card, transform: [{scale}]}}>
        <Animated.View style={{...style.cardOverLay, opacity}} />
        <View style={style.priceTag}>
          <Text
            style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
            ${hotel.roomPrice}
          </Text>
        </View>
        <Image source={{uri:hotel.roomImage}} style={style.cardImage} />
        <View style={style.cardDetails}>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                {hotel.roomType}
              </Text>
              <Text style={{color: COLORS.grey, fontSize: 11}}>
                {hotel.roomDescription}
              </Text>
            </View>
            <Icon name="bookmark-border" size={26} color={COLORS.primary} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={15} color={COLORS.orange} />
              <Icon name="star" size={15} color={COLORS.orange} />
              <Icon name="star" size={15} color={COLORS.orange} />
              <Icon name="star" size={15} color={COLORS.orange} />
              <Icon name="star" size={15} color={COLORS.grey} />
            </View>
            <Text style={{fontSize: 14, color: COLORS.grey}}>{hotel.roomStatus}</Text>
            <ArrowIcon name="arrowright" size={20} color={COLORS.grey} />
          {/* <EIcon name="dots-three-vertical" size={20} color={COLORS.grey} onPress={booking()}/> */}
          </View>
        </View>
      </Animated.View>
     
    </TouchableOpacity>
  );
};
const openModal = () => {
  AsyncStorage.getItem('user').then((user) => {
    if (user) {
      setModalVisible(true);
    } else {
      navigation.navigate('LoginScreen');
    }
  });
};
const ReviewCard = ({review,user1}) => {
  // console.log(review)
  // console.log(user1,"USEERRR!111")
  return (
    <ScrollView>
    <View style={style.reviewCard}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image
          source={{uri:review.user.image}}
          style={{width: 50, height: 50, borderRadius: 25}}
        /> */}
        <View style={{marginLeft: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {review.name}
          </Text>
          <Text style={{color: COLORS.grey, fontSize: 12}}>
            {review.email}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{color: COLORS.grey, fontSize: 15, fontWeight: 'bold'}}>
          {review.review}
        </Text>
      </View>
    </View>
    </ScrollView>
  );
};

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={{uri:item.image}}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <Icon name="rate-review" size={28} color={COLORS.white} onPress={()=>setShowReview(true)}/>
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} onPress={()=> navigation.navigate('HostelMarker',item)} />
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 5,
            }}>
            {/* {item.location.coordinates[0]}:{item.location.coordinates[1]} */}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} />
              </View>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 5}}>
                4.0
              </Text>
            </View>
            <Text style={{fontSize: 13, color: COLORS.grey}}>365reviews</Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{lineHeight: 20, color: COLORS.grey}}>
              {item.description}
            </Text>
          </View>
          </View>
          <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={rooms}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={true}
            renderItem={({item, index}) => <Card hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        <View style={style.btn}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
          //on press booking
          onPress={openModal}
          >

            Leave Review
          </Text>
          <Modal visible={modalVisible} animationType="slide">
            <View style={style.modalContent}>
              <Icon
                name="close"
                size={24}
                style={{...style.modalToggle, ...style.modalClose}}
                onPress={() => setModalVisible(false)}
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Review</Text>
              <Text style={{fontSize: 14, color: COLORS.grey}}>
                Leave a review for this hostel
              </Text>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 14, color: COLORS.grey}}>
                  Your review
                </Text>
                <TextInput
                  style={{
                    height: 100,
                    borderWidth: 1,
                    borderColor: COLORS.grey,
                    borderRadius: 10,
                    marginTop: 10,
                    padding: 10,
                  }}
                  multiline
                  numberOfLines={4}
                  placeholder="Write your review here"
                  onChangeText={(val) => setReview(val)}
                />

              </View>
              {/* submit */}
              <TouchableOpacity style={style.btn}>
                <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
                onPress={addReview}
                >
                  Submit
                </Text>
              </TouchableOpacity>

            </View>
          </Modal>          
        </View>
      
      <Modal visible={showReview} animationType="slide">
        <Background1>
        <View style={{ flex: 1 }}>
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
            <BackButton />
        <Text style={{ marginLeft: 16, fontSize: 24 }}>Hostel Reviews</Text>
      </View>
      <TextInput
        style={{ paddingHorizontal: 16, paddingVertical: 8 }}
        placeholder="Search reviews"
        // value={searchTerm}
        // onChangeText={setSearchTerm}
      />
      <FlatList
        data={reviews}
        keyExtractor={review => review._id.toString()}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </View>
        </Background1>        
      </Modal>
    </View>
  </ScrollView>
    
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  reviewCard: {
    height: 150,
    width: 2000,
    // backgroundColor: COLORS.white,
    backgroundColor: 'skyblue',
    borderRadius: 20  ,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    elevation: 5,

  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  card: {
    height: 300,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 40,
    width: 60,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
});

export default DetailsScreen;
