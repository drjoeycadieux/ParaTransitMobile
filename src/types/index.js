// Type definitions for the ParaTransit app
// These can be gradually converted to TypeScript if desired

/**
 * @typedef {Object} RideRequest
 * @property {string} pickupLocation - The pickup location
 * @property {string} destination - The destination location
 * @property {string} time - The preferred time for the ride
 * @property {string} contactNumber - The contact phone number
 * @property {string} specialInstructions - Any special instructions
 * @property {string} status - The status of the ride request
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string} updatedAt - ISO timestamp of last update
 * @property {string} formId - The unique ID of the ride request
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} latitude - The latitude coordinate
 * @property {number} longitude - The longitude coordinate
 */

/**
 * @typedef {Object} MapRegion
 * @property {number} latitude - The center latitude
 * @property {number} longitude - The center longitude
 * @property {number} latitudeDelta - The latitude delta for zoom level
 * @property {number} longitudeDelta - The longitude delta for zoom level
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string|null} error - The error message if validation failed
 */

/**
 * @typedef {Object} FormValidationResult
 * @property {boolean} isValid - Whether all form fields are valid
 * @property {Object} errors - Object containing field names as keys and error messages as values
 */

export {}; // Make this a module
