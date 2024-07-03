import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, User } from '~/redux/slices/users/userSlice';
import { setUsers } from '~/redux/slices/users/usersSlice';
import { getRecords, addRecord } from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const users = await getRecords<User>(COLLECTION_NAME);
    dispatch(setUsers(users));
    return users;
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});

export const addUsers = createAsyncThunk(
  'users/addUsers',
  async (usersData: User[], { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const newUsers = await Promise.all(
        usersData.map((userData) => addRecord<User>(COLLECTION_NAME, userData))
      );
      dispatch(setUsers(newUsers));
      return newUsers;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
