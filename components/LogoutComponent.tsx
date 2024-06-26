import { useAppDispatch } from '~/redux/hooks';
import { clearCurrentUser } from '~/redux/slices/users/userSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
export default function LogoutComponent() {
  const dispatch = useAppDispatch();

  const logout = (): void => {
    dispatch(clearCurrentUser());
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <TouchableOpacity style={styles.logoutButton}>
      <Text style={styles.logoutButtonText} onPress={logout}>
        Log Out
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    margin: 20,
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
