// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
