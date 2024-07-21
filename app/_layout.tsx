import '../global.css';
import React from 'react';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from '~/navigation/AppNavigator';

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
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
