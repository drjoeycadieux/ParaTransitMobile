import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Assuming the PNG image is located in the assets folder
const carIcon = require('../assets/host.png');  // Adjust the path as needed
const ambulanceIcon = require('../assets/ambulance.png');  // Adjust the path as needed

const backgroundImage = require('../assets/images/contentCdn.jpg');  // Corrected to use require for local images

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToBooking = () => {
    navigation.navigate('Booking');
  };

  const goToEmergency = () => {
    navigation.navigate('Emergency');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.heading}>Para Transit</Text>
        <Text style={styles.subHeading}>Get a Ride Now!</Text>

        {/* Book a Ride Button with PNG Car Icon */}
        <TouchableOpacity style={styles.button} onPress={goToBooking}>
          <Image source={carIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Book a Ride</Text>
        </TouchableOpacity>

        {/* Emergency Call Button with PNG Ambulance Icon */}
        <TouchableOpacity style={styles.emergency} onPress={goToEmergency}>
          <Image source={ambulanceIcon} style={styles.icon} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
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
    flexDirection: 'row',  // Align the icon and text horizontally
    alignItems: 'center',
    backgroundColor: '#f2c94c',
    paddingVertical: 19,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  emergency: {
    flexDirection: 'row',  // Align the icon and text horizontally
    alignItems: 'center',
    backgroundColor: '#B22222', // firebrick color
    paddingVertical: 19,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 26,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,  // Space between icon and text
  },
  emergencyText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '26',
    marginLeft: 10,
  },
  icon: {
    width: 26,  // Adjust the size of the icon
    height: 26,  // Adjust the size of the icon
    resizeMode: 'contain',
  },
});

export default HomeScreen;
