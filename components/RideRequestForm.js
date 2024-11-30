import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { firebase } from '../firebaseConfig.js';

const RideRequestForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleRequestRide = async () => {
    // Trim spaces from the inputs and validate fields
    if (
      !pickupLocation.trim() ||
      !destination.trim() ||
      !time.trim() ||
      !contactNumber.trim() ||
      !specialInstructions.trim()
    ) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Create the ride request object
    const rideRequest = {
      pickupLocation,
      destination,
      time,
      contactNumber,
      specialInstructions,
    };

    try {
      // Save data to Firebase Realtime Database and get the unique document ID
      const newRequestRef = await firebase.database().ref('rideRequests').push(rideRequest);

      // Retrieve the generated document ID (form ID)
      const formId = newRequestRef.key;

      // Optionally, you can add the formId to the rideRequest data
      await newRequestRef.update({ formId });

      // Show a success alert with the generated form ID
      Alert.alert('Success', `Ride request submitted with ID: ${formId}`);

      // Clear the form fields
      setPickupLocation('');
      setDestination('');
      setTime('');
      setContactNumber('');
      setSpecialInstructions('');
    } catch (error) {
      console.error(error);  // Log the error to console for debugging
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Para-Transit Ride</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"  // Phone number input type
      />
      <TextInput
        style={styles.input}
        placeholder="Special Instructions (Optional)"
        value={specialInstructions}
        onChangeText={setSpecialInstructions}
      />

      {/* Custom Button with TouchableOpacity */}
      <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
        <Text style={styles.buttonText}>Book Ride</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    fontSize: 16,
  },
  // Custom button styles
  button: {
    backgroundColor: '#161616',
    paddingVertical: 16,           
    paddingHorizontal: 24,       
    borderRadius: 5,             
    alignItems: 'center',         
    justifyContent: 'center',    
    elevation: 3,                 
  },
  buttonText: {
    color: 'white',              
    fontSize: 18,                
    fontWeight: 'bold',            
  },
});

export default RideRequestForm;
