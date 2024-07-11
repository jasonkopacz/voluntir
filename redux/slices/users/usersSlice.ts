// src/redux/slices/usersSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  groupIds: string[];
  eventIds: string[];
}

interface UsersState {
  byId: { [key: string]: User };
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.byId[action.payload.id] = action.payload;
      if (!state.allIds.includes(action.payload.id)) {
        state.allIds.push(action.payload.id);
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.byId[action.payload.id]) {
        state.byId[action.payload.id] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((user) => {
        state.byId[user.id] = user;
        state.allIds.push(user.id);
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, updateUser, removeUser, setUsers, setLoading, setError } =
  usersSlice.actions;
export default usersSlice.reducer;
