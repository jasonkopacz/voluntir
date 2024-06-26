// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  gorupIds: string[];
  eventIds: string[];
}
interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentUser, clearCurrentUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
