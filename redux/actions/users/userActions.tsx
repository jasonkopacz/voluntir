// app/redux/actions/userActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser, setLoading, setError, User } from '~/redux/slices/users/userSlice';
import { getRecord, addRecord, updateRecord, deleteRecord } from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'users';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const user = await getRecord<User>(COLLECTION_NAME, userId);
      dispatch(setCurrentUser(user));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const addUser = createAsyncThunk(
  'user/addUser',
  async (userData: Omit<User, 'id'>, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const newUser = await addRecord<User>(COLLECTION_NAME, userData);
      dispatch(setCurrentUser(newUser));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
