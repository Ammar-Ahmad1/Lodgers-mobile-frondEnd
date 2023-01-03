import React,{useState, useEffect,useRef} from 'react';
import Axios from "axios";
import MapView from 'react-native-maps';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  AsyncStorage,
} from 'react-native';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import COLORS from '../../consts/colors';

// import hotels from '../../consts/hotels';
//import {GET_HOTEL} from '../../graphql/queries/hotelQueries';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;



const OwnerHomeScreen = ({navigation}) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [hostel, setHostel] = useState([]);
  const [ownerid, setOwnerid] = useState([]);
    const [token,setToken] = useState([]);
    const [user,setUser] = useState([]);
    const [searchText, setSearchText] = useState("");
    const setMaalik = async () => {
      AsyncStorage.getItem("user").then((user) => {
        let parsed = JSON.parse(user);
        setUser(parsed);
        setOwnerid(parsed._id);
        console.log(parsed._id);
    });
  };
  const SearchFilterFunction = (text) => {
    //passing the inserted text in textinput
    const newData = hostel.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setHostel(newData);
    setSearchText(text);
    // get full list
    if (text == '') {
      HostelList();
    }
  
  };

  const HostelList = async () => {    
    const hostelss = await Axios.get(`http://10.0.2.2:5000/get-hostels/${ownerid}`);
    setHostel(hostelss.data.hostels);
    console.log(hostelss.data.hostels);
};
useEffect(() => {

 setMaalik();
  HostelList();
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

    return (
      

      <TouchableOpacity
        disabled={activeCardIndex != index}
        activeOpacity={1}
        onPress={() => navigation.navigate('OwnerDetails', hotel)}>
        <Animated.View style={{...style.card, transform: [{scale}]}}>
          <Animated.View style={{...style.cardOverLay, opacity}} />
          <View style={style.priceTag}>
            <Text
              style={{color: COLORS.white, fontSize: 20, fontWeight: 'bold'}}>
              ${hotel.price}
            </Text>
          </View>
          <Image source={{uri:hotel.image}} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {hotel.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 11}}>
                  {hotel.description}
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
              <Text style={{fontSize: 14, color: COLORS.grey}}>{hotel.ratings}</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const ref = useRef(null);
  return (

    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>

      <View style={style.header}>

        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Your Hostels
          </Text>
        </View>
        <Icon name="person-outline" size={38} color={COLORS.grey}
          onPress={() => navigation.navigate('editOwner')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
      <View style={style.searchInputContainer}>
            <Icon name="search" size={30} style={{marginLeft: 20}} />
            <TextInput
              placeholder="Search"
              style={{fontSize: 20, paddingLeft: 10}}
              onChangeText={(text) => SearchFilterFunction(text)}
              value={searchText}

            />
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
              data={hostel}
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
          onPress={() => navigation.navigate('bookingScreen', ownerid)}
          >

            See Bookings
          </Text>
        </View>
        <View style={style.btn}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}
          //on press booking
          onPress={() => navigation.navigate('HostelForm', ownerid)}
          >

            Add New Hostel
          </Text>
        
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  map: {
    width: '50%',
    height: '50%',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
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
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default OwnerHomeScreen;
