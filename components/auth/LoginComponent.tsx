import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '~/redux/hooks';
import { login, signup } from '~/redux/actions/users/userActions';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { User } from '~/redux/slices/users/userSlice';
import { getRecord } from '~/api/firestore/dbActions';

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID as string;

export default function LoginComponent() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
    });
  }, []);

  const handleLogin = async (): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const user = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const firebaseUser = userCredential.user;

      if (firebaseUser) {
        try {
          const userProfile = await dispatch(login(firebaseUser.uid));
          if (userProfile) {
            console.log('success');
          } else {
            console.log('New user');
            const newUser: User = {
              id: firebaseUser.uid,
              firstName: firebaseUser.displayName?.split(' ')[0] || '',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: firebaseUser.email || '',
              photo: firebaseUser.photoURL || '',
              groupIds: [],
              eventIds: [],
            };

            console.log('dispatching signup');
            await dispatch(signup(newUser));
            console.log('User signed up successfully:', newUser);
          }
        } catch (error) {
          console.error('Error during login/signup process:', error);
          throw error;
        }
      } else {
        throw new Error('Failed to get user from Firebase User Credential');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

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
