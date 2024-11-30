import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';



// components
import RideRequestForm from '../components/RideRequestForm';

const BookingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>You start booking here.</Text>
      </View>
      <RideRequestForm/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
