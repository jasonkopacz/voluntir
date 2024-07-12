import '../global.css';

import { Stack } from 'expo-router';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
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
