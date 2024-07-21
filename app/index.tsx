import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import App from './_layout';
import LoginComponent from '~/components/auth/LoginComponent';
import OnboardingQuestionnaire from '../components/Onboarding/OnboardingQuestionnaire';
import { NavigationContainer } from '@react-navigation/native';

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
    <NavigationContainer>
      <App />;
    </NavigationContainer>
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
