import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, SafeAreaView } from 'react-native';
import { Colors, EmergencyContacts, FontSizes, FontWeights, Spacing, BorderRadius } from '../constants';
import { commonStyles } from '../styles/commonStyles';

const EmergencyScreen = () => {
  const handleCall911 = () => {
    Alert.alert(
      'Emergency Call',
      'You are about to call 911. This will connect you to emergency services.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => makeCall(EmergencyContacts.EMERGENCY_911) }
      ]
    );
  };

  const handleCallDispatcher = () => {
    Alert.alert(
      'Dispatcher Call',
      'You are about to call the Para Transit dispatcher.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => makeCall(EmergencyContacts.DISPATCHER) }
      ]
    );
  };

  const makeCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((error) => {
      console.error('Error making call:', error);
      Alert.alert('Error', 'Unable to make the call. Please try again.');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Services</Text>
        <Text style={styles.subtitle}>
          Tap below to call emergency services or dispatcher
        </Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.emergencyButton} 
          onPress={handleCall911}
          activeOpacity={0.8}
        >
          <Text style={styles.emergencyButtonText}>Call 911</Text>
          <Text style={styles.buttonSubtext}>Emergency Services</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dispatcherButton} 
          onPress={handleCallDispatcher}
          activeOpacity={0.8}
        >
          <Text style={styles.dispatcherButtonText}>Call Dispatcher</Text>
          <Text style={styles.buttonSubtext}>Para Transit Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.emergencyLight,
  },
  header: {
    paddingTop: Spacing.xxxl + 10, // 58
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: FontWeights.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emergencyButton: {
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.xl,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dispatcherButton: {
    backgroundColor: Colors.backgroundWhite,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.xl,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyButtonText: {
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    color: Colors.emergencyLight,
    marginBottom: Spacing.xs,
  },
  dispatcherButtonText: {
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    color: Colors.emergencyLight,
    marginBottom: Spacing.xs,
  },
  buttonSubtext: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default EmergencyScreen;
