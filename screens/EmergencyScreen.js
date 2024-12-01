import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, SafeAreaView } from 'react-native';



const EmergencyScreen = () => {
  // Function to handle call to 911
  const call911 = () => {
    const phoneNumber = 'tel:911';
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'Unable to make the call. Please try again.');
    });
  };

  // Function to handle call to dispatcher
  const callDispatcher = () => {
    const phoneNumber = 'tel:+14383899142'; // Example dispatcher number (replace with real number)
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'Unable to make the call. Please try again.');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Services</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={call911}>
          <Text style={styles.buttonText}>Call 911</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={callDispatcher}>
          <Text style={styles.buttonText}>Call Dispatcher</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f44336', // Red background for an emergency theme
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f44336', // Red text for emphasis
  },
});

export default EmergencyScreen;
