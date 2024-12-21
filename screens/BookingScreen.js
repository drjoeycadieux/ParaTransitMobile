import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

// components
import RideRequestForm from '../components/RideRequestForm';

const BookingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <RideRequestForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 2, // Give more space to the form
    justifyContent: 'flex-end', // Align form to the bottom
    paddingHorizontal: 20, // Optional padding for better spacing
  },
});

export default BookingScreen;
