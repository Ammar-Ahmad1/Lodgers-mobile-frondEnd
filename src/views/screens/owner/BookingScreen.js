import { 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
  Button,
  RefreshControl,

} from 'react-native'
import COLORS from '../../../consts/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CupertinoSearchBarBasic from "../../../components/CupertinoSearchBarBasic";
import CupertinoSegmentWithThreeTabs from "../../../components/CupertinoSegmentWithThreeTabs";
import MaterialCardWithImageAndTitle from "../../../components/MaterialCardWithImageAndTitle";
import MaterialButtonSuccess from "../../../components/MaterialButtonSuccess";
import React from 'react'
import Axios from 'axios'
import BackButton from '../../../components/BackButton'
import Background1 from '../../../components/Background1'
import Header from '../../../components/Header'



const BookingScreen = ({navigation, route} ) => {
  const id= route.params
  const categories = ['All', 'Paid', 'Pending', 'Cancelled'];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const [bookings, setBookings] = React.useState([])
  const [checkBooking, setCheckBooking] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchText, setSearchText] = React.useState('')
  const getBookings = () => {
    Axios.get(`http://10.0.2.2:5000/get-bookings-by-users/${id}`)
    .then(res => {
      console.log(res.data.booking)
      setBookings(res.data.booking)
      setCheckBooking(res.data.booking)
    }
    )
    setSelectedCategoryIndex(0);

  }
  const SearchFilterFunction = (text) => {
    //search by _id
    const newData = bookings.filter((item) => {
      const itemData = item._id
        ? item._id.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setBookings(newData);
    setSearchText(text);
    if(text === ''){
      getBookings()
    }
  };


  React.useEffect(() => {
    getBookings()
  }, [])
  const CategoryList = ({navigation}) => {
    
    const updateListwithCategory = (index) => {
      setSelectedCategoryIndex(index)
      if(index === 0){
        getBookings()
      }

      if(index === 1){
        const newData = checkBooking.filter((item) => {
          const itemData=item.status 
          const textData = true;
          return itemData === textData;
        });
        setBookings(newData);
      }
      if(index === 2){
        const newData = checkBooking.filter((item) => {
          const itemData=item.status 
          const textData = false;
          return itemData === textData;
        });
        setBookings(newData);
      }


    }
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={()=>{updateListwithCategory(index)}}>
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.primary
                      : COLORS.black,
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
  return (
    // <Background1>

      
      <View style={styles.container}>
        <BackButton goBack={() => navigation.navigate('UserDashboard')} />
        <View style={styles.bookingsStack}>
          <Text style={styles.bookings}>Bookings</Text>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={30} style={{marginLeft: 20}} />
            <TextInput
              placeholder="Search"
              style={{fontSize: 20, paddingLeft: 10}}
              onChangeText={(text) => SearchFilterFunction(text)}
              value={searchText}
            />
          </View>
        </View>
        <CategoryList />
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', paddingBottom: 20 , paddingHorizontal: 20}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getBookings}
          />
        }
        
        >
      
        {
          bookings.length === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>No Bookings</Text>
            </View>
          ) :
          bookings.map((booking) => (
            <View style={styles.materialCardWithImageAndTitleStack}>  
              <MaterialCardWithImageAndTitle
                titleStyle="Title goes here"
                titleStyle={booking.hostelName}
                style={styles.materialCardWithImageAndTitle}
                booking={booking}
                getBookings={getBookings}
              >
              </MaterialCardWithImageAndTitle>
            </View>        
          ))}
        </ScrollView>
        </View>
      
    // </Background1>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  bookings: {
    top: 0,
    position: "absolute",
    fontSize: 60,
    fontWeight: "bold",
    color: "#121212",
    lineHeight: 20,
    left: 150,
    width: 153,
    height: 48,
    fontSize: 20,
    letterSpacing: 0
  },
  cupertinoSearchBarBasic: {
    height: 44,
    width: 350,
    position: "absolute",
    left: 15,
    top: 39
  },
  bookingsStack: {
    width: 375,
    height: 83,
    marginTop: 56,
    marginBottom: 10,
  },
  cupertinoSegmentWithThreeTabs: {
    height: 56,
    width: 375,
    marginTop: 1,
    marginLeft: -3,
    paddingBottom: 10,
    marginTop: 10,
    paddingTop: 10,
  },
  materialCardWithImageAndTitle: {
    height: 200,
    width: 359,
    marginLeft: 15,
    position: "absolute",
    left: -12,
    top: 10,
    marginTop: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,


  },
  materialButtonSuccess: {
    height: 36,
    width: 100,
    position: "absolute",
    left: 242,
    top: 135
  },
  materialCardWithImageAndTitleStack: {
    width: 359,
    height: 200,
    marginLeft: 8,
    paddingBottom: 10,

  },
  searchInputContainer: {
    height: 50,
    width: 400,
    backgroundColor: "lightgrey",
    marginTop: 35,
    marginLeft: 6,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialButtonSuccessStack: {
    width: 342,
    height: 171,
    marginTop: 10,
    marginLeft: 10,
  },
  materialButtonSuccess: {
    height: 36,
    width: 100,
    position: "absolute",
    left: 242,
    top: 135
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
  
});


export default BookingScreen