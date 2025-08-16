import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../constants';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import RequestScreen from '../screens/RequestScreen';
import EmergencyScreen from '../screens/EmergencyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={ScreenNames.HOME}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f2c94c',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name={ScreenNames.HOME} 
          component={HomeScreen}
          options={{ title: 'Para Transit' }}
        />
        <Stack.Screen 
          name={ScreenNames.BOOKING} 
          component={BookingScreen}
          options={{ title: 'Book a Ride' }}
        />
        <Stack.Screen 
          name={ScreenNames.REQUEST} 
          component={RequestScreen}
          options={{ title: 'Ride Details' }}
        />
        <Stack.Screen 
          name={ScreenNames.EMERGENCY} 
          component={EmergencyScreen}
          options={{ 
            title: 'Emergency Services',
            headerStyle: {
              backgroundColor: '#f44336',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
