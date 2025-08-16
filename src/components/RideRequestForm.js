import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, ScreenNames } from '../constants';
import { commonStyles } from '../styles/commonStyles';
import { LocationService } from '../utils/locationService';
import { ValidationUtils } from '../utils/validation';
import { rideService } from '../services/rideService';

const RideRequestForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    time: '',
    contactNumber: '',
    specialInstructions: '',
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Location state
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      setLocationLoading(true);
      const location = await LocationService.getCurrentLocation();
      
      if (location) {
        setCurrentLocation(location);
        const mapRegion = LocationService.getMapRegion(location);
        setRegion(mapRegion);
      }
    } catch (error) {
      console.error('Error initializing location:', error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    try {
      const address = await LocationService.reverseGeocode(latitude, longitude);
      
      setFormData(prev => ({
        ...prev,
        destination: address
      }));

      setDestinationCoordinates({ latitude, longitude });
      
      if (region) {
        setRegion({
          ...region,
          latitude,
          longitude,
        });
      }
    } catch (error) {
      console.error('Error handling map press:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      // Validate form
      const validation = ValidationUtils.validateRideForm(formData);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        Alert.alert('Validation Error', 'Please fix the errors and try again.');
        return;
      }

      // Submit ride request
      const rideId = await rideService.submitRideRequest(formData);

      // Show success message
      Alert.alert(
        'Success!', 
        `Your ride request has been submitted successfully!\n\nRequest ID: ${rideId}`,
        [
          {
            text: 'View Details',
            onPress: () => navigation.navigate(ScreenNames.REQUEST, {
              ...formData,
              rideId
            })
          },
          {
            text: 'OK',
            onPress: () => resetForm()
          }
        ]
      );

    } catch (error) {
      console.error('Error submitting ride request:', error);
      Alert.alert('Error', error.message || 'Failed to submit ride request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pickupLocation: '',
      destination: '',
      time: '',
      contactNumber: '',
      specialInstructions: '',
    });
    setDestinationCoordinates(null);
    setErrors({});
  };

  const renderInput = (field, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          commonStyles.input,
          errors[field] && styles.inputError
        ]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        {...options}
      />
      {errors[field] && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  if (locationLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={handleMapPress}
        >
          {destinationCoordinates && (
            <Marker coordinate={destinationCoordinates} title="Destination">
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>Selected Destination</Text>
                  <Text style={styles.calloutText}>{formData.destination}</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View style={styles.mapInstructions}>
          <Text style={styles.instructionText}>
            Tap on the map to select your destination
          </Text>
        </View>
      </View>

      {/* Form Container */}
      <KeyboardAvoidingView 
        style={styles.formContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Reserve Your Ride</Text>

          {renderInput('pickupLocation', 'Pickup Location')}
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                commonStyles.input,
                styles.destinationInput,
                errors.destination && styles.inputError
              ]}
              placeholder="Destination (Tap map to select)"
              value={formData.destination}
              editable={false}
            />
            {errors.destination && (
              <Text style={styles.errorText}>{errors.destination}</Text>
            )}
          </View>

          {renderInput('time', 'Preferred Time (e.g., 2:00 PM)')}
          
          {renderInput('contactNumber', 'Contact Number', {
            keyboardType: 'phone-pad',
            onChangeText: (value) => {
              const formatted = ValidationUtils.formatPhoneNumber(value);
              handleInputChange('contactNumber', formatted);
            }
          })}

          {renderInput('specialInstructions', 'Special Instructions (Optional)', {
            multiline: true,
            numberOfLines: 3,
            textAlignVertical: 'top'
          })}

          <TouchableOpacity 
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textWhite} />
            ) : (
              <Text style={styles.submitButtonText}>Book Ride</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: FontSizes.medium,
    color: Colors.textSecondary,
  },
  mapContainer: {
    flex: 3,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapInstructions: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    elevation: 3,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  instructionText: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  callout: {
    padding: Spacing.sm,
  },
  calloutTitle: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    marginBottom: Spacing.xs,
  },
  calloutText: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    elevation: 10,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollContainer: {
    padding: Spacing.lg,
  },
  header: {
    fontSize: FontSizes.xxlarge,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: Colors.textPrimary,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  destinationInput: {
    backgroundColor: Colors.background,
    color: Colors.textSecondary,
  },
  inputError: {
    borderBottomColor: Colors.error,
    borderBottomWidth: 2,
  },
  errorText: {
    fontSize: FontSizes.small,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  submitButton: {
    backgroundColor: Colors.mapMarker,
    paddingVertical: Spacing.md + 1, // 17
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    elevation: 3,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textLight,
    elevation: 0,
  },
  submitButtonText: {
    color: Colors.textWhite,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
  },
});

export default RideRequestForm;
