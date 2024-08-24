import '../global.css';
import React from 'react';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="EventDetail" options={{ headerShown: true }} />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
