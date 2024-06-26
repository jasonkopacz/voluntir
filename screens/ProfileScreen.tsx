import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../redux/hooks'; // Adjust the import path as needed
import LogoutComponent from '~/components/LogoutComponent';

const ProfileScreen: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem: React.FC<{
    icon: string;
    title: string;
    value?: string | boolean;
    onPress?: () => void;
    isSwitch?: boolean;
  }> = ({ icon, title, value, onPress, isSwitch }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#333" style={styles.settingIcon} />
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {isSwitch ? (
          <Switch value={value as boolean} onValueChange={onPress} />
        ) : (
          <Text style={styles.settingValue}>{value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user?.photo || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <SettingItem icon="person-outline" title="Edit Profile" onPress={() => {}} />
        <SettingItem icon="lock-closed-outline" title="Change Password" onPress={() => {}} />
        <SettingItem icon="mail-outline" title="Email" value={user?.email} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          value={notifications}
          onPress={() => setNotifications(!notifications)}
          isSwitch
        />
        <SettingItem
          icon="moon-outline"
          title="Dark Mode"
          value={darkMode}
          onPress={() => setDarkMode(!darkMode)}
          isSwitch
        />
        <SettingItem icon="language-outline" title="Language" value="English" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem icon="help-circle-outline" title="Help Center" onPress={() => {}} />
        <SettingItem icon="information-circle-outline" title="About" onPress={() => {}} />
        <SettingItem icon="shield-outline" title="Privacy Policy" onPress={() => {}} />
      </View>
      <LogoutComponent />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen;
