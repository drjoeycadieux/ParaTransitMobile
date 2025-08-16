import { ref, push, update, get, child } from 'firebase/database';
import { database } from './firebase';

export class RideService {
  constructor() {
    this.ridesRef = ref(database, 'rideRequests');
  }

  /**
   * Submit a new ride request
   * @param {Object} rideData - The ride request data
   * @returns {Promise<string>} - The ID of the created ride request
   */
  async submitRideRequest(rideData) {
    try {
      // Validate required fields
      this.validateRideRequest(rideData);
      
      // Add timestamp
      const rideRequest = {
        ...rideData,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      // Push to Firebase
      const newRequestRef = await push(this.ridesRef, rideRequest);
      const formId = newRequestRef.key;
      
      // Update with the generated ID
      await update(newRequestRef, { formId });

      return formId;
    } catch (error) {
      console.error('Error submitting ride request:', error);
      throw new Error('Failed to submit ride request. Please try again.');
    }
  }

  /**
   * Get a ride request by ID
   * @param {string} rideId - The ride request ID
   * @returns {Promise<Object>} - The ride request data
   */
  async getRideRequest(rideId) {
    try {
      const snapshot = await get(child(this.ridesRef, rideId));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error('Ride request not found');
      }
    } catch (error) {
      console.error('Error fetching ride request:', error);
      throw new Error('Failed to fetch ride request');
    }
  }

  /**
   * Update ride request status
   * @param {string} rideId - The ride request ID
   * @param {string} status - The new status
   * @returns {Promise<void>}
   */
  async updateRideStatus(rideId, status) {
    try {
      const rideRef = child(this.ridesRef, rideId);
      await update(rideRef, { 
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating ride status:', error);
      throw new Error('Failed to update ride status');
    }
  }

  /**
   * Validate ride request data
   * @param {Object} rideData - The ride request data to validate
   * @throws {Error} - If validation fails
   */
  validateRideRequest(rideData) {
    const requiredFields = ['pickupLocation', 'destination', 'time', 'contactNumber'];
    
    for (const field of requiredFields) {
      if (!rideData[field] || !rideData[field].toString().trim()) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    if (!phoneRegex.test(rideData.contactNumber.replace(/\s/g, ''))) {
      throw new Error('Please enter a valid contact number');
    }
  }
}

// Export singleton instance
export const rideService = new RideService();
