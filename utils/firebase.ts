import { initializeApp } from 'firebase/app';
import '@react-native-firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  androidAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID,
  iosAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS,
  webApiKey: process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }
