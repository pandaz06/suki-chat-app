import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAjXw9EQWI_ZL3_eZ-s3UAxvgPGco2yxH0',
    authDomain: 'suki-chat-app.firebaseapp.com',
    projectId: 'suki-chat-app',
    storageBucket: 'suki-chat-app.appspot.com',
    messagingSenderId: '795471246105',
    appId: '1:795471246105:web:35fbcaf4816ff9c7cb4b88',
    measurementId: 'G-22H2PX3XN1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Emulator set up
connectAuthEmulator(auth, 'http://localhost:9099');
if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
}
connectStorageEmulator(storage, 'localhost', 9199);
