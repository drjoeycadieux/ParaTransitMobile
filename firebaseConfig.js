// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDZV7taFCNWJSq-vQdPFlp0fYkyBrzR_ks",
    authDomain: "webclone-581b7.firebaseapp.com",
    projectId: "webclone-581b7",
    storageBucket: "webclone-581b7.firebasestorage.app",
    messagingSenderId: "934204454708",
    appId: "1:934204454708:web:14aeb7f218ce5c8d4d9761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

export { database, push, update, ref };
