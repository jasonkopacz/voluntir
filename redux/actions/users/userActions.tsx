import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser, setLoading, setError, User } from '../../slices/users/userSlice';
import { getRecord, addRecord, updateRecord, deleteRecord } from '../../../api/firestore/dbActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorage from '~/redux/hooks';
const COLLECTION_NAME = 'users';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { dispatch }) => {
    const [storedUser, setStoredUser] = useAsyncStorage<User | null>('logged-in-user', null);
    try {
      dispatch(setLoading(true));
      const user = await getRecord<User>(COLLECTION_NAME, userId);
      setStoredUser(user);
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
      return newUser;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }: { userId: string; userData: Partial<User> }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await updateRecord<User>(COLLECTION_NAME, userId, userData);
      const updatedUser = await getRecord<User>(COLLECTION_NAME, userId);
      dispatch(setCurrentUser(updatedUser));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await deleteRecord(COLLECTION_NAME, userId);
      dispatch(setCurrentUser(null));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
export const login = createAsyncThunk<User | null, string>(
  'auth/login',
  async (userId: string, { dispatch, rejectWithValue }) => {
    const [storedUser, setStoredUser] = useAsyncStorage<User | null>('logged-in-user', null);
    try {
      dispatch(setLoading(true));
      const userProfile = await getRecord<User>(COLLECTION_NAME, userId);
      if (userProfile) {
        dispatch(setCurrentUser(userProfile));
        setStoredUser(userProfile);
        return userProfile;
      } else {
        console.log('User not found');
        return null;
      }
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const signup = createAsyncThunk<User, User>(
  'auth/signup',
  async (user: User, { dispatch, rejectWithValue }) => {
    const [storedUser, setStoredUser] = useAsyncStorage<User | null>('logged-in-user', null);
    try {
      dispatch(setLoading(true));
      const userProfile = await addRecord<User>(COLLECTION_NAME, user);
      dispatch(setCurrentUser(userProfile));
      setStoredUser(userProfile);
      return userProfile;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'An unknown error occurred'));
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  const [storedUser, setStoredUser] = useAsyncStorage<User | null>('logged-in-user', null);
  try {
    dispatch(setLoading(true));
    dispatch(setCurrentUser(null));
    setStoredUser(null);
  } catch (error: any) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
});
