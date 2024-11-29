import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestScreen = ({ route }) => {
  const { pickupLocation, destination, time } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ride Request Details</Text>
      <Text style={styles.text}>Pickup Location: {pickupLocation}</Text>
      <Text style={styles.text}>Destination: {destination}</Text>
      <Text style={styles.text}>Preferred Time: {time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default RequestScreen;
