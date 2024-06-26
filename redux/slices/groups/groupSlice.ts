// src/redux/slices/groupSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Group {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  contactEmail: string;
  categoryIds: string[];
  userIds: string[];
}

interface GroupState {
  currentGroup: Group | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  currentGroup: null,
  isLoading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setCurrentGroup: (state, action: PayloadAction<Group>) => {
      state.currentGroup = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearCurrentGroup: (state) => {
      state.currentGroup = null;
    },
    setGroupLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGroupError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCurrentGroup, clearCurrentGroup, setGroupLoading, setGroupError } =
  groupSlice.actions;

export default groupSlice.reducer;
