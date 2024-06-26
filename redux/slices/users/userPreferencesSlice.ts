// src/redux/slices/userPreferencesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  categoryIds: string[];
  availableDays: string[];
  preferredDistance: number;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
}

const initialState: UserPreferences = {
  categoryIds: [],
  availableDays: [],
  preferredDistance: 10,
  notificationPreferences: {
    email: true,
    push: true,
  },
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setCategoryIds: (state, action: PayloadAction<string[]>) => {
      state.categoryIds = action.payload;
    },
    setAvailableDays: (state, action: PayloadAction<string[]>) => {
      state.availableDays = action.payload;
    },
    setPreferredDistance: (state, action: PayloadAction<number>) => {
      state.preferredDistance = action.payload;
    },
    setNotificationPreferences: (
      state,
      action: PayloadAction<{ email: boolean; push: boolean }>
    ) => {
      state.notificationPreferences = action.payload;
    },
  },
});

export const {
  setCategoryIds,
  setAvailableDays,
  setPreferredDistance,
  setNotificationPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
