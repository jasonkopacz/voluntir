import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import App from './_layout';
import LoginComponent from '~/components/auth/LoginComponent';
import OnboardingQuestionnaire from '../components/Onboarding/OnboardingQuestionnaire';
import { Redirect } from 'expo-router';

export default function Index(): JSX.Element {
  const user = useAppSelector((state) => state.user.currentUser);
  const hasCompletedOnboarding = useAppSelector((state) => state.user.hasCompletedOnboarding);

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
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
