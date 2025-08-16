import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Assets, ScreenNames, Spacing, BorderRadius } from '../constants';
import { commonStyles } from '../styles/commonStyles';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleBookRide = () => {
    navigation.navigate(ScreenNames.BOOKING);
  };

  const handleEmergency = () => {
    navigation.navigate(ScreenNames.EMERGENCY);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Image source={Assets.IMAGES.BACKGROUND} style={commonStyles.backgroundImage} />
      <View style={commonStyles.overlay} />
      
      <View style={styles.content}>
        <Text style={commonStyles.heading}>Para Transit</Text>
        <Text style={commonStyles.subHeading}>Get a Ride Now!</Text>

        <TouchableOpacity 
          style={[commonStyles.primaryButton, styles.buttonSpacing]} 
          onPress={handleBookRide}
          activeOpacity={0.8}
        >
          <Image source={Assets.ICONS.HOST} style={commonStyles.icon} />
          <Text style={[commonStyles.buttonText, commonStyles.primaryButtonText]}>
            Book a Ride
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={commonStyles.emergencyButton} 
          onPress={handleEmergency}
          activeOpacity={0.8}
        >
          <Image source={Assets.ICONS.AMBULANCE} style={commonStyles.icon} />
          <Text style={[commonStyles.buttonText, commonStyles.emergencyButtonText]}>
            Emergency Call
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: Spacing.lg,
  },
  buttonSpacing: {
    marginBottom: Spacing.md,
  },
});

export default HomeScreen;
