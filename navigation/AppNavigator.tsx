import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import EventDetail from '~/screens/EventDetailScreen';

export type RootStackParamList = {
  index: undefined;
  EventDetail: { eventId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" component={BottomTabNavigator} />
    <Stack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: true }} />
  </Stack.Navigator>
);

export default AppNavigator;
