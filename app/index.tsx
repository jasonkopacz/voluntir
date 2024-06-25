import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, User } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Button } from '../components/Button';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

const webClientId: string | undefined = process.env.GOOGLE_WEB_CLIENT_ID;

export default function Home(): JSX.Element {
  const [error, setError] = useState<Error | undefined>();
  const [userInfo, setUserInfo] = useState<User | undefined>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId,
    });
  }, []);

  const signin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(undefined);
    } catch (e) {
      console.log(e);
      setError(e as Error);
    }
  };

  const logout = (): void => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.header}>Voluntir</Text>
        <Text>{JSON.stringify(error)}</Text>
        {userInfo ? (
          <Button title="Logout" onPress={logout} />
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signin}
          />
        )}
      </View>
      <BottomTabNavigator />
    </Provider>
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
