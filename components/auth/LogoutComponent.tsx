import { useAppDispatch } from '~/redux/hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { logout } from '~/redux/actions/users/userActions';
export default function LogoutComponent() {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} testID="logoutButton">
      <Text style={styles.logoutButtonText} testID="logoutButtonText">
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
