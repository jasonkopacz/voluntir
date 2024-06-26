import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import LoginComponent from '~/components/LoginComponent';
import { useAppSelector } from '../redux/hooks';

export default function Index(): JSX.Element {
  const user = useAppSelector((state) => state.user.currentUser);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Volunteer</Text>
        <LoginComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BottomTabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    padding: 10,
    textAlign: 'center',
  },
});
