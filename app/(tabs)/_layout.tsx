import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  search: 'search',
  profile: 'person',
  create: 'add-circle',
  inbox: 'mail',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          const iconName = iconMap[route.name as keyof typeof iconMap];
          return (
            <Ionicons
              name={focused ? iconName : (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="create" options={{ title: 'Create' }} />
      <Tabs.Screen name="inbox" options={{ title: 'Inbox' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
