import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';


// import Components
import EmergencyRideForm from '../components/EmergencyRideForm';
import RideRequestForm from '../components/RideRequestForm';
import SupportButtonCall from '../components/SupportButtonCall';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RideRequestForm />
      <EmergencyRideForm/>

      <SupportButtonCall/>
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
