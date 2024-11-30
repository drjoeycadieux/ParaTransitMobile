import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const SupportButtonCall = () => {
  const handleCall = () => {
    const phoneNumber = 'tel:+14383899142'; // Replace with the phone number you want to call
    Linking.openURL(phoneNumber)
      .catch((err) => console.error('Error opening dialer:', err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCall}>
        <Text style={styles.buttonText}>Dispatcher</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#259c21',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3, // Adds shadow on Android
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SupportButtonCall;