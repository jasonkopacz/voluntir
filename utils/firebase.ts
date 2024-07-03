import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import { Platform } from 'react-native';

const getAppId = () => {
  if (Platform.OS === 'ios') {
    return process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS;
  } else if (Platform.OS === 'android') {
    return process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID;
  }
  throw new Error('Unsupported platform');
};

const firebaseConfig = {
  appId: getAppId() as string,
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_WEB_API_KEY as string,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL as string,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID as string,
};

const requiredFields = ['appId', 'apiKey', 'authDomain', 'projectId'];
for (const field of requiredFields) {
  if (!firebaseConfig[field as keyof typeof firebaseConfig]) {
    throw new Error(`Firebase configuration error: ${field} is missing.`);
  }
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
export const db = firebase.firestore();
