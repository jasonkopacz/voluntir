// src/redux/slices/groupsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from './groupSlice';

interface GroupsState {
  byId: { [key: string]: Group };
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.byId[action.payload.id] = action.payload;
      if (!state.allIds.includes(action.payload.id)) {
        state.allIds.push(action.payload.id);
      }
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      if (state.byId[action.payload.id]) {
        state.byId[action.payload.id] = action.payload;
      }
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((group) => {
        state.byId[group.id] = group;
        state.allIds.push(group.id);
      });
    },
    setGroupsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGroupsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addGroup, updateGroup, removeGroup, setGroups, setGroupsLoading, setGroupsError } =
  groupsSlice.actions;

export default groupsSlice.reducer;
