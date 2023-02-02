import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/views/screens/HomeScreen';
import StartScreen from './src/views/screens/StartScreen';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/ResgisterScreen';
import UserDashboard from './src/views/screens/UserDashboard';
import ResetPassword from './src/views/screens/ResetPassword';
import RegisterOwnerScreen from './src/views/screens/RegisterOwnerScreen';
import OwnerHomeScreen from './src/views/screens/OwnerHomeScreen';
import HostelAdd from './src/views/screens/HostelAdd';
import OwnerDetails from './src/views/screens/OwnerDetails';
import AddRoom from './src/views/screens/AddRoom';
import Maps from './src/views/screens/Maps';
import editUser from './src/views/screens/editUser';
import BookingScreen from './src/views/screens/owner/BookingScreen';
import UserBooking from './src/views/screens/UserBooking';
import HostelMarker from './src/views/screens/HostelMarker';
import OwnerBooking from './src/views/screens/owner/OwnerBooking';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
  
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OwnerHome" component={OwnerHomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="RegisterOwnerScreen" component={RegisterOwnerScreen} />
        <Stack.Screen name="HostelForm" component={HostelAdd} />
        <Stack.Screen name="editOwner" component={editUser} />
        <Stack.Screen name="OwnerDetails" component={OwnerDetails} />
        <Stack.Screen name="AddRoom" component={AddRoom} />
        <Stack.Screen name="bookingScreen" component={BookingScreen} />
        <Stack.Screen name="UserBooking" component={UserBooking} />
        <Stack.Screen name="HostelMarker" component={HostelMarker} />
        <Stack.Screen name="OwnerBooking" component={OwnerBooking} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;