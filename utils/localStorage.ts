import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '~/redux/slices/users/userSlice';
// User authentication token
const storeAuthToken = async (token: string) => {
  await AsyncStorage.setItem('authToken', token);
};

// User profile data
const storeUserProfile = async (profile: User) => {
  await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
};

// App settings
// const storeAppSettings = async (settings: AppSettings) => {
//   await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
// };

// Recent searches
const storeRecentSearches = async (searches: string[]) => {
  await AsyncStorage.setItem('recentSearches', JSON.stringify(searches));
};

// Cached event data
const storeCachedEvents = async (events: Event[]) => {
  await AsyncStorage.setItem('cachedEvents', JSON.stringify(events));
};

// Last sync timestamp
const storeLastSyncTimestamp = async (timestamp: number) => {
  await AsyncStorage.setItem('lastSyncTimestamp', timestamp.toString());
};
