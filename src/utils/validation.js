import { ValidationRules } from '../constants';

export class ValidationUtils {
  /**
   * Validate phone number
   * @param {string} phoneNumber - Phone number to validate
   * @returns {Object} - {isValid: boolean, error: string}
   */
  static validatePhoneNumber(phoneNumber) {
    if (!phoneNumber || !phoneNumber.trim()) {
      return {
        isValid: false,
        error: ValidationRules.REQUIRED_FIELD_ERROR
      };
    }

    // Remove all non-digit characters for validation
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    if (cleanPhone.length < ValidationRules.PHONE_MIN_LENGTH) {
      return {
        isValid: false,
        error: ValidationRules.PHONE_INVALID_ERROR
      };
    }

    // Basic phone validation (can be enhanced with more sophisticated patterns)
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return {
        isValid: false,
        error: ValidationRules.PHONE_INVALID_ERROR
      };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate required field
   * @param {string} value - Value to validate
   * @param {string} fieldName - Name of the field for error message
   * @returns {Object} - {isValid: boolean, error: string}
   */
  static validateRequired(value, fieldName = 'Field') {
    if (!value || !value.toString().trim()) {
      return {
        isValid: false,
        error: `${fieldName} is required`
      };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate time format (simple validation for now)
   * @param {string} time - Time string to validate
   * @returns {Object} - {isValid: boolean, error: string}
   */
  static validateTime(time) {
    if (!time || !time.trim()) {
      return {
        isValid: false,
        error: ValidationRules.REQUIRED_FIELD_ERROR
      };
    }

    // For now, just check if it's not empty
    // Can be enhanced with proper time format validation
    return { isValid: true, error: null };
  }

  /**
   * Validate all form fields
   * @param {Object} formData - Form data to validate
   * @returns {Object} - {isValid: boolean, errors: Object}
   */
  static validateRideForm(formData) {
    const errors = {};
    let isValid = true;

    // Validate pickup location
    const pickupValidation = ValidationUtils.validateRequired(
      formData.pickupLocation, 
      'Pickup location'
    );
    if (!pickupValidation.isValid) {
      errors.pickupLocation = pickupValidation.error;
      isValid = false;
    }

    // Validate destination
    const destinationValidation = ValidationUtils.validateRequired(
      formData.destination, 
      'Destination'
    );
    if (!destinationValidation.isValid) {
      errors.destination = destinationValidation.error;
      isValid = false;
    }

    // Validate time
    const timeValidation = ValidationUtils.validateTime(formData.time);
    if (!timeValidation.isValid) {
      errors.time = timeValidation.error;
      isValid = false;
    }

    // Validate contact number
    const phoneValidation = ValidationUtils.validatePhoneNumber(formData.contactNumber);
    if (!phoneValidation.isValid) {
      errors.contactNumber = phoneValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }

  /**
   * Format phone number for display
   * @param {string} phoneNumber - Phone number to format
   * @returns {string} - Formatted phone number
   */
  static formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format based on length (US format example)
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phoneNumber; // Return as-is if doesn't match expected format
  }
}
