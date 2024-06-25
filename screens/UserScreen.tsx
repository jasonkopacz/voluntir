// src/screens/UsersPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAppSelector } from '../redux/hooks';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserItem: React.FC<{ user: User }> = ({ user }) => (
  <View style={styles.userItem}>
    <Text style={styles.userName}>{user.firstName}</Text>
    <Text style={styles.userEmail}>{user.email}</Text>
  </View>
);

const UserScreen: React.FC = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>
      {user ? (
        user && <UserItem user={user} />
      ) : (
        <Text style={styles.emptyMessage}>No users found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserScreen;
