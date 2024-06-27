import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import LoginComponent from '~/components/auth/LoginComponent';
import OnboardingQuestionnaire from '../components/onboarding/OnboardingQuestionnaire';

export default function Index(): JSX.Element {
  const user = useAppSelector((state) => state.user.currentUser);
  const hasCompletedOnboarding = useAppSelector((state) => state.user.hasCompletedOnboarding);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Volunteer</Text>
        <LoginComponent />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingQuestionnaire />;
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
