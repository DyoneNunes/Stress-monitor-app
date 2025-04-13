import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD2dCQJrgyIUAcYz26qnHiK4DUEpjtQay0",
    authDomain: "stress-monitor-app.firebaseapp.com",
    projectId: "stress-monitor-app",
    storageBucket: "stress-monitor-app.firebasestorage.app",
    messagingSenderId: "1028666565158",
    appId: "1:1028666565158:web:9cb8684706d2f1dbcfbce7",
    measurementId: "G-EFF34TQJE1"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  export { db, auth };