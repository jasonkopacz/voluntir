import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '~/redux/hooks';
import { login } from '~/redux/actions/users/userActions';
import {
  GoogleSignin,
  GoogleSigninButton,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import { User as ReduxUser } from '~/redux/slices/users/userSlice';
import { getRecord } from '~/api/firestore/dbActions';

const webClientId: string | undefined = process.env.GOOGLE_WEB_CLIENT_ID;

// namespace Volunteer {
//   export interface User extends ReduxUser {}

//   export function fromGoogleUser(googleUser: GoogleUser): User {
//     return {
//       id: googleUser.user.id,
//       firstName: googleUser.user.givenName || '',
//       lastName: googleUser.user.familyName || '',
//       email: googleUser.user.email,
//       photo: googleUser.user.photo || '',
//       groupIds: [],
//       eventIds: [],
//     };
//   }
// }

export default function LoginComponent() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
    });
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.getTokens();
      console.log('idToken', idToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        let existingUser: ReduxUser | null = null;
        try {
          existingUser = await getRecord<ReduxUser>('users', firebaseUser.uid);
        } catch (error) {
          console.log('User not found in Firestore, creating new user');
        }

        const user: ReduxUser = {
          id: firebaseUser.uid,
          firstName: firebaseUser.displayName?.split(' ')[0] || '',
          lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
          email: firebaseUser.email || '',
          photo: firebaseUser.photoURL || '',
          groupIds: existingUser?.groupIds || [],
          eventIds: existingUser?.eventIds || [],
        };

        // Dispatch the login action to update Redux state and save to Firestore
        await dispatch(login(user));

        console.log('User signed in successfully:', user);
      } else {
        throw new Error('Failed to get user from Firebase User Credential');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // const handleLogin = async (): Promise<void> => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const googleUser: GoogleUser = await GoogleSignin.signIn();

  //     const volunteerUser: Volunteer.User = Volunteer.fromGoogleUser(googleUser as GoogleUser);
  //     await (dispatch(login(volunteerUser as ReduxUser)) as any).unwrap();

  //     console.log('User saved to Redux store:', googleUser.user);
  //     setError(undefined);
  //   } catch (e) {
  //     console.error('Login error:', e);
  //     setError(e as Error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLogin}
        testID="google-signin-button"
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
