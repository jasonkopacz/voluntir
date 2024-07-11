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
  ids: { [key: string]: User };
  entities: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  ids: {},
  entities: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.ids[action.payload.id] = action.payload;
      if (!state.entities.includes(action.payload.id)) {
        state.entities.push(action.payload.id);
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.ids[action.payload.id]) {
        state.ids[action.payload.id] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      delete state.ids[action.payload];
      state.entities = state.entities.filter((id) => id !== action.payload);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.ids = {};
      state.entities = [];
      action.payload.forEach((user) => {
        state.ids[user.id] = user;
        state.entities.push(user.id);
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
