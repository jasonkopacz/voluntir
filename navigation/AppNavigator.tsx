import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import EventDetailScreen from '~/screens/EventDetailScreen';

export type RootStackParamList = {
  index: undefined;
  EventDetailScreen: { eventId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" component={BottomTabNavigator} />
    <Stack.Screen
      name="EventDetailScreen"
      component={EventDetailScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
