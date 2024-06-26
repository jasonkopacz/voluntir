// src/screens/UsersPage.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { useAppSelector } from '../redux/hooks';
// google user object
// {"idToken": null, "scopes": ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email",
// "openid", "profile", "email"],
// "serverAuthCode": null,
// "user": {"email": "jtkopacz@gmail.com", "familyName": "Kopacz", "givenName": "Jason",
// "id": "110781254796068001286", "name": "Jason Kopacz",
// "photo": "https://lh3.googleusercontent.com/a/ACg8ocKf-tFqX5LF_2ExKn1Q2Bx2l8ZLdpm2UdxdqLtESwQhTPa1DnNC"}}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

const UserItem: React.FC<{ user: User }> = ({ user }) => (
  <View style={styles.userItem}>
    <Image source={{ uri: user.photo }} style={styles.userImage} />
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
  userImage: {},
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
