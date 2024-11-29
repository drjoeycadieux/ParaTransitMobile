import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import RideRequestForm from '../components/RideRequestForm';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RideRequestForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
});

export default HomeScreen;
