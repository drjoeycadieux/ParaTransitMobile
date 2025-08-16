import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { MapConfig } from '../constants';

export class LocationService {
  /**
   * Request location permissions and get current location
   * @returns {Promise<Object>} - The current location coordinates
   */
  static async getCurrentLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return location.coords;
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check your location settings.'
      );
      return null;
    }
  }

  /**
   * Convert coordinates to address using reverse geocoding
   * @param {number} latitude - The latitude
   * @param {number} longitude - The longitude
   * @returns {Promise<string>} - The formatted address
   */
  static async reverseGeocode(latitude, longitude) {
    try {
      const result = await Location.reverseGeocodeAsync({ 
        latitude, 
        longitude 
      });

      if (result && result.length > 0) {
        const addressComponents = result[0];
        return LocationService.formatAddress(addressComponents);
      } else {
        return `${latitude.toFixed(MapConfig.COORDINATE_PRECISION)}, ${longitude.toFixed(MapConfig.COORDINATE_PRECISION)}`;
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return `${latitude.toFixed(MapConfig.COORDINATE_PRECISION)}, ${longitude.toFixed(MapConfig.COORDINATE_PRECISION)}`;
    }
  }

  /**
   * Format address from geocoding result
   * @param {Object} addressComponents - The address components from geocoding
   * @returns {string} - Formatted address string
   */
  static formatAddress(addressComponents) {
    const {
      streetNumber,
      street,
      city,
      region,
      postalCode,
      country,
      name
    } = addressComponents;

    let formattedAddress = '';

    if (streetNumber && street) {
      formattedAddress += `${streetNumber} ${street}`;
    } else if (street) {
      formattedAddress += street;
    } else if (name) {
      formattedAddress += name;
    }

    if (city) {
      formattedAddress += formattedAddress ? `, ${city}` : city;
    }

    if (region) {
      formattedAddress += formattedAddress ? `, ${region}` : region;
    }

    if (postalCode) {
      formattedAddress += formattedAddress ? ` ${postalCode}` : postalCode;
    }

    return formattedAddress || 'Unknown location';
  }

  /**
   * Get region for map display
   * @param {Object} coordinates - The coordinates object with latitude and longitude
   * @returns {Object} - Region object for MapView
   */
  static getMapRegion(coordinates) {
    if (!coordinates) {
      return MapConfig.DEFAULT_REGION;
    }

    return {
      ...MapConfig.DEFAULT_REGION,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };
  }

  /**
   * Calculate distance between two coordinates
   * @param {Object} coord1 - First coordinate {latitude, longitude}
   * @param {Object} coord2 - Second coordinate {latitude, longitude}
   * @returns {number} - Distance in kilometers
   */
  static calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = LocationService.toRadians(coord2.latitude - coord1.latitude);
    const dLon = LocationService.toRadians(coord2.longitude - coord1.longitude);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(LocationService.toRadians(coord1.latitude)) * 
      Math.cos(LocationService.toRadians(coord2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees - Degrees to convert
   * @returns {number} - Radians
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}
