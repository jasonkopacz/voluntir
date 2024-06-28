// app/redux/actions/usersActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, User } from '~/redux/slices/users/userSlice';
import { setUsers } from '~/redux/slices/users/usersSlice';
import { getRecords, addRecords } from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (query: any, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const users: User[] = (await getRecords(COLLECTION_NAME, query)) as User[];
    dispatch(setUsers(users));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
});
