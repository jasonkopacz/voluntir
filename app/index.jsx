import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Stack, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '946778248468-30ad6u2mdg6vguc2gu8c59hf9q7a4029.apps.googleusercontent.com',
      "client_type": 3
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      console.log(user);
      setUserInfo(user);
      setError();
    } catch (e) {
      console.log(e)
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
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <>
        <Text>Debug: About to render GoogleSigninButton</Text>
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
});
