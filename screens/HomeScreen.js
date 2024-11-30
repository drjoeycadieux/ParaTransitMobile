import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the useNavigation hook

const backgroundImage = '../assets/images/contentCdn.jpg';

const HomeScreen = () => {
  const navigation = useNavigation();  // Initialize the useNavigation hook

  // Function to handle navigation when the button is pressed
  const goToBooking = () => {
    navigation.navigate('Booking');  // Navigate to the "Booking" screen
  };


  const goToEmergency = () => {
    navigation.navigate('Emergency');  // Navigate to the "Booking" screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: backgroundImage }} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to para-transit</Text>
        <Text style={styles.subHeading}>Get a ride now</Text>

        <TouchableOpacity style={styles.button} onPress={goToBooking}>
          <Text style={styles.buttonText}>Book a Ride</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.emergency} onPress={goToEmergency}>
          <Text style={styles.emergencyText}>Emergency Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay for better text visibility
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    color: 'white',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f2c94c',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  emergency: {
    backgroundColor: '#161616',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  emergencyText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
