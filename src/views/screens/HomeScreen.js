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
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/EvilIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
import COLORS from '../../consts/colors';
import WifiIcon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import ChatBot from "../../components/ChatBot";

// import hotels from '../../consts/hotels';
//import {GET_HOTEL} from '../../graphql/queries/hotelQueries';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;



const HomeScreen = ({navigation}) => {

  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [showFilterModal,setShowFilterModal]=React.useState(false)
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [hostel, setHostel] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [food, setFood] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [tv, setTv] = useState(false);
  const [filterWifi,setFilterWifi]=useState(false);
  const [filterTv,setFilterTv]=useState(false);
  const [filterSecurity,setFilterSecurity]=useState(false);
  const [filterParking,setFilterParking]=useState(false);
  const [filterLaundary,setFilterLaundary]=useState(false);
  const [filterFood,setFilterFood]=useState(false);
  const [tempHostel,setTempHostel]=useState([]);
  const [searchText, setSearchText] = useState("");
  const SearchFilterFunction = (text) => {
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
  const getFullList = () => {
    setSearchText('');
    HostelList();

  };
  const HostelList = async () => {
    const hostelss = await Axios.get("http://10.0.2.2:5000/get-hostels", {
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("auth_token"),
      // },
    });
    setHostel(hostelss.data.hostels);
    setTempHostel(hostelss.data.hostels);
    //sort hostels by ratings
    setHostel(hostelss.data.hostels.sort((a, b) => b.ratings - a.ratings));

   // console.log(hostel);
  };



  useEffect(() => {
   HostelList();
    // async function getUser() {
    //   const user = await AsyncStorage.getItem('user');
    //   const parsed = JSON.parse(user);
    //   console.log(parsed);
    //   if(parsed.role==="user"){
    //     navigation.navigate("UserDashboard  ");
    //   }
    //   else if(parsed.role==="owner"){
    //     navigation.navigate("OwnerHome");
    //   }
    // }
    // getUser();

  }, []);

  const CategoryList = ({navigation}) => {
    

        return (
      <View style={style.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.grey,
                }}>
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
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
        onPress={() => navigation.navigate('DetailsScreen', hotel)}>
        <Animated.View style={{...style.card, transform: [{scale}]}}>
          <Animated.View style={{...style.cardOverLay, opacity}} />
          <View style={style.priceTag}>
            <Text
              style={{color: COLORS.white, fontSize: 15, fontWeight: 'bold'}}>
              ${hotel.price}
            </Text>
          </View>
          <Image source={{uri:hotel.image}} style={style.cardImage} />
          <View style={style.cardDetails}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {hotel.name.length > 20?hotel.name.substring(0,20)+"...":hotel.name}
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 11}}>
                  { 
                  hotel.description.length > 50?hotel.description.substring(0,50)+"...":hotel.description
                  }
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
                                {hotel.features.wifi ? (
                  <View style={style.facility}>
                    <WifiIcon name="wifi" size={15} color={COLORS.grey} />
                  </View>
                ) : null}
                {hotel.features.parking ? (
                  <View style={style.facility}>
                    <Icon name="local-parking" size={15} color={COLORS.grey} />
                  </View>
                ) : null}
                {hotel.features.food ? (
                  <View style={style.facility}>
                    <Icon name="restaurant" size={15} color={COLORS.grey} />
                  </View>
                ) : null}
                {hotel.features.laundry ? (
                  <View style={style.facility}>
                    <Icon name="local-laundry-service" size={15} color={COLORS.grey} />
                  </View>
                ) : null}

                {hotel.features.tv ? (
                  <View style={style.facility}>
                    <Icon name="tv" size={15} color={COLORS.grey} />
                  </View>
                ) : null}
                {hotel.features.security ? (
                  <View style={style.facility}>
                    <Icon name="security" size={15} color={COLORS.grey} />
                
                  </View>
                ) : null}
              {/* <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.orange} />
                <Icon name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{fontSize: 14, color: COLORS.grey}}>{hotel.ratings}</Text> */}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  const TopHotelCard = ({hotel}) => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={{uri:hotel.image}} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{hotel.name}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {hotel.location.longitude}: {hotel.location.latitude}
          </Text>
        </View>
      </View>
    );
  };
  const ref = useRef(null);
  const applySearchFilters = ()=>{
   // filter hostel based on search filters and set the filtered hostel list in hostelList state
    // then close the filter modal
    //if modal is cleared then show all the hostel
    if(!filterWifi && !filterParking && !filterFood && !filterLaundary && !filterTv && !filterSecurity){
      HostelList();
      setShowFilterModal(false);
      return;
    }

    let filteredHostelList = hostel.filter((item)=>{
      // filter by wifi, parking, food, laundry, tv, security
      if(filterWifi && !item.features.wifi){
        return false;
      }
      if(filterParking && !item.features.parking){
        return false;
      }
      if(filterFood && !item.features.food){
        return false;
      }
      if(filterLaundary && !item.features.laundry){
        return false;
      }
      if(filterTv && !item.features.tv){
        return false;
      }
      if(filterSecurity && !item.features.security){
        return false;
      }
      return true;
    })
      // save the filtered hostel list in hostelList state
      setHostel(filteredHostelList);
    setShowFilterModal(false);

  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View style={{paddingBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Find your hostel
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>in </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Pakistan
            </Text>
          </View>
        </View>
        <Icon name="person-outline" size={38} color={COLORS.grey}
          onPress={() => navigation.navigate('StartScreen')}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon name="search" size={30} style={{marginLeft: 20}} />
          <TextInput
            placeholder="Search"
            style={{fontSize: 20, paddingLeft: 10}}
            value={searchText}
            onChangeText={(text) => SearchFilterFunction(text)}
          />
          <EnIcon name="cross" size={20} style={{right: 90,position:'absolute'}} onPress={getFullList} />
          <Icon name="filter-list" size={30} style={{right: 55,position:'absolute'}} onPress={()=>setShowFilterModal(true)} />
          <Icon name="my-location"  size={30} style={{
            //move to right side
            position: 'absolute',
            right: 20,

           }}
          onPress={() => navigation.navigate('Maps')}
        />
        </View>
        <CategoryList />
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
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card hotel={item} index={index} />}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: COLORS.grey}}>
            Top hotels
          </Text>
          <Text style={{color: COLORS.grey}}>Show all</Text>
        </View>
        <FlatList
          data={hostel}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({item}) => <TopHotelCard hotel={item} />}
        />


<Modal animationType="slide" transparent visible={showFilterModal}>
      <View style={style.modalContainer}>
        <View style={style.contentContainer}>
          <Text style={style.title}>Filters</Text>
          <CheckBox
            title="WiFi"
            checked={filterWifi}
            onPress={() => {setFilterWifi(!filterWifi)}}
          />
          <CheckBox
            title="Security"
            checked={filterSecurity}
            onPress={() => {setFilterSecurity(!filterSecurity)}}
          />
          <CheckBox
            title="TV"
            checked={filterTv}
            onPress={() => setFilterTv(!filterTv)}
          />
          <CheckBox
            title="Parking"
            checked={filterParking}
            onPress={() => setFilterParking(!filterParking)}
          />
          <CheckBox
            title="Laundry"
            checked={filterLaundary}
            onPress={() => setFilterLaundary(!filterLaundary)}
          />
          <CheckBox
            title="Food"
            checked={filterFood}
            onPress={() => setFilterFood(!filterFood)}
          />
          <TouchableOpacity onPress={applySearchFilters} style={style.closeButton}>
            <Text style={style.closeButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
          {/* <Icon name="filter-list" size={30} style={{right: 10,left:10,position:'absolute'}}  onPress={()=>{navigation.navigate('Bot')}}/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#585858',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#00C48C',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
