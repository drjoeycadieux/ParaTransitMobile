import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



// import screens
import HomeScreen from './screens/HomeScreen';
import RequestScreen from './screens/RequestScreen';
import BookingScreen from './screens/BookingScreen';
import EmergencyScreen from './screens/EmergencyScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RequestScreen" component={RequestScreen} />

 
        
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
