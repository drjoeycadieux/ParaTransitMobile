import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { firebase } from '../firebaseConfig.js';

const RideRequestForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
    } else {
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setRegion({
        ...region,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // Reverse geocode the coordinates to get an address
    const result = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (result && result.length > 0) {
      const address = result[0].city || result[0].region || result[0].name || 'Unknown location';
      setDestination(address); // Update destination input with the address
    } else {
      setDestination(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`); // Fallback to coordinates if no address found
    }

    setDestinationCoordinates({ latitude, longitude });
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  const handleRequestRide = async () => {
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

    const rideRequest = {
      pickupLocation,
      destination,
      time,
      contactNumber,
      specialInstructions,
    };

    try {
      const newRequestRef = await firebase.database().ref('rideRequests').push(rideRequest);
      const formId = newRequestRef.key;
      await newRequestRef.update({ formId });

      Alert.alert('Success', `Ride request submitted with ID: ${formId}`);
      
      setPickupLocation('');
      setDestination('');
      setTime('');
      setContactNumber('');
      setSpecialInstructions('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={region}
          region={location ? { ...region, latitude: location.latitude, longitude: location.longitude } : region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          showsUserLocation={true}
          onPress={handleMapPress} // Update destination when map is tapped
        >
          {destinationCoordinates && (
            <Marker coordinate={destinationCoordinates} title="Destination">
              <Callout>
                <View>
                  <Text>Selected Destination</Text>
                  <Text>{destination}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>

      {/* Form Inputs */}
      <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Reserve Your Ride</Text>

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
            editable={false} // Destination is updated by tapping on the map
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
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Special Instructions (Optional)"
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
          />

          <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
            <Text style={styles.buttonText}>Book Ride</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapContainer: {
    flex: 3, // Map takes the majority of the screen
  },
  map: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#161616',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideRequestForm;
