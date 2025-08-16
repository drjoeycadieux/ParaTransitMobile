// Legacy firebaseConfig.js - redirects to new structure
// This file is kept for backward compatibility
// New code should use src/services/firebase.js

export { database } from './src/services/firebase';
export { ref, push, update } from 'firebase/database';
