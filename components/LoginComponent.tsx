import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '~/redux/hooks';
import { setCurrentUser } from '~/redux/slices/users/userSlice';
import { GoogleSignin, GoogleSigninButton, User } from '@react-native-google-signin/google-signin';

const webClientId: string | undefined = process.env.GOOGLE_WEB_CLIENT_ID;

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
      const googleUser: User = await GoogleSignin.signIn();

      dispatch(
        setCurrentUser({
          id: googleUser.user.id,
          firstName: googleUser.user.givenName || '',
          lastName: googleUser.user.familyName || '',
          email: googleUser.user.email,
          photo: googleUser.user.photo || '',
        })
      );

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
