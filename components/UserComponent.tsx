import React from 'react';
import { View, Button } from 'react-native';

import { useAppDispatch } from '../redux/hooks';
import { setCurrentUser } from '../redux/slices/users/userSlice';

import UserScreen from '~/screens/UserScreen';

const UserComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const updateUser = () => {
    dispatch(
      setCurrentUser({ id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' })
    );
  };

  return (
    <View>
      <UserScreen />
      <Button title="Update User" onPress={updateUser} />
    </View>
  );
};

export default UserComponent;
