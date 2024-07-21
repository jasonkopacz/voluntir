import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '~/screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InboxScreen from '../screens/InboxScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: 'home',
  Search: 'search',
  Profile: 'person',
  Create: 'add-circle',
  Inbox: 'mail',
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = iconMap[route.name as keyof typeof iconMap];
          return (
            <Ionicons
              name={focused ? iconName : (`${iconName}-outline` as any)}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
