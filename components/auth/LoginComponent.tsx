import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '~/redux/hooks';
import { setCurrentUser } from '~/redux/slices/users/userSlice';
import {
  GoogleSignin,
  GoogleSigninButton,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import { User as ReduxUser } from '~/redux/slices/users/userSlice';
const webClientId: string | undefined = process.env.GOOGLE_WEB_CLIENT_ID;

namespace Volunteer {
  export interface User extends ReduxUser {}

  export function fromGoogleUser(googleUser: GoogleUser): User {
    return {
      id: googleUser.user.id,
      firstName: googleUser.user.givenName || '',
      lastName: googleUser.user.familyName || '',
      email: googleUser.user.email,
      photo: googleUser.user.photo || '',
      groupIds: [],
      eventIds: [],
    };
  }
}

export default function LoginComponent() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
    });
  }, []);

  const login = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleUser: GoogleUser = await GoogleSignin.signIn();

      const volunteerUser: Volunteer.User = Volunteer.fromGoogleUser(googleUser);

      dispatch(setCurrentUser(volunteerUser));

      console.log('User saved to Redux store:', googleUser.user);
      setError(undefined);
    } catch (e) {
      console.error('Login error:', e);
      setError(e as Error);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
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
