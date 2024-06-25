import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

const webClientId = process.env.GOOGLE_WEB_CLIENT_ID;

export default function Home() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
      client_type: 3,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError();
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const logout = () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voluntir</Text>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signin}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    padding: 10,
  },
});
