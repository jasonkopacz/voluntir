// src/redux/slices/groupsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from './groupSlice';

interface GroupsState {
  ids: { [key: string]: Group };
  entities: string[];
  isLoading: boolean;
  error: string | null;
}

const initialGroups: Group[] = [
  {
    id: '1',
    name: 'Greenpeace',
    description: 'International environmental organization',
    logo: 'https://example.com/greenpeace-logo.png',
    website: 'https://www.greenpeace.org',
    contactEmail: 'info@greenpeace.org',
    categoryIds: ['1'], // Environmental
    userIds: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Red Cross',
    description: 'International humanitarian organization',
    logo: 'https://example.com/redcross-logo.png',
    website: 'https://www.redcross.org',
    contactEmail: 'info@redcross.org',
    categoryIds: ['3', '8'], // Healthcare, Disaster Relief
    userIds: ['1', '2', '3'],
  },
  {
    id: '3',
    name: 'Habitat for Humanity',
    description: 'Nonprofit organization focused on providing affordable housing',
    logo: 'https://example.com/habitat-logo.png',
    website: 'https://www.habitat.org',
    contactEmail: 'info@habitat.org',
    categoryIds: ['7', '10'], // Homelessness, Community Development
    userIds: ['1', '2', '3'],
  },
  {
    id: '4',
    name: 'World Wildlife Fund (WWF)',
    description:
      'International organization working in wilderness preservation and reducing human impact on the environment',
    logo: 'https://example.com/wwf-logo.png',
    website: 'https://www.worldwildlife.org',
    contactEmail: 'info@wwf.org',
    categoryIds: ['1', '5'], // Environmental, Animal Welfare
    userIds: ['1', '2', '3'],
  },
  {
    id: '5',
    name: 'Doctors Without Borders',
    description: 'International humanitarian medical non-governmental organization',
    logo: 'https://example.com/dwb-logo.png',
    website: 'https://www.doctorswithoutborders.org',
    contactEmail: 'info@dwb.org',
    categoryIds: ['3', '8'], // Healthcare, Disaster Relief
    userIds: ['1', '2', '3'],
  },
];

const initialState: GroupsState = {
  ids: {},
  entities: [],
  isLoading: false,
  error: null,
};

initialGroups.forEach((group) => {
  initialState.ids[group.id] = group;
  initialState.entities.push(group.id);
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.ids[action.payload.id] = action.payload;
      if (!state.entities.includes(action.payload.id)) {
        state.entities.push(action.payload.id);
      }
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      if (state.ids[action.payload.id]) {
        state.ids[action.payload.id] = action.payload;
      }
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      delete state.ids[action.payload];
      state.entities = state.entities.filter((id) => id !== action.payload);
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.ids = {};
      state.entities = [];
      action.payload.forEach((group) => {
        state.ids[group.id] = group;
        state.entities.push(group.id);
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
