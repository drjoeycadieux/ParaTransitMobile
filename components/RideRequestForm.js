import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Text, Alert } from 'react-native';
import { firebase } from '../firebaseConfig.js';

const RideRequestForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  const handleRequestRide = async () => {
    if (!pickupLocation || !destination || !time) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const rideRequest = { pickupLocation, destination, time };

    try {
      // Save data to Firebase Realtime Database
      await firebase.database().ref('rideRequests').push(rideRequest);
      Alert.alert('Success', 'Ride request submitted!');
      setPickupLocation('');
      setDestination('');
      setTime('');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Para-Transit Ride Request</Text>

      <TextInput
        style={styles.input}
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Time"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Request Ride" onPress={handleRequestRide} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default RideRequestForm;
