// Screen names for navigation
export const ScreenNames = {
  HOME: 'Home',
  BOOKING: 'Booking',
  REQUEST: 'RequestScreen',
  EMERGENCY: 'Emergency',
};

// Emergency contact numbers
export const EmergencyContacts = {
  EMERGENCY_911: '911',
  DISPATCHER: '+14383899142', // Replace with actual dispatcher number
};

// Map configuration
export const MapConfig = {
  DEFAULT_REGION: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  COORDINATE_PRECISION: 4,
};

// Form validation
export const ValidationRules = {
  PHONE_MIN_LENGTH: 10,
  REQUIRED_FIELD_ERROR: 'This field is required',
  PHONE_INVALID_ERROR: 'Please enter a valid phone number',
  GENERAL_ERROR: 'Something went wrong. Please try again.',
};

// Asset paths
export const Assets = {
  ICONS: {
    HOST: require('../../assets/host.png'),
    AMBULANCE: require('../../assets/ambulance.png'),
    PARA_TRANSIT: require('../../assets/para-transit.png'),
  },
  IMAGES: {
    BACKGROUND: require('../../assets/images/contentCdn.jpg'),
  },
};
