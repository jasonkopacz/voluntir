import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';

const selectGroups = (state: RootState) => state.groups;
const selectEvents = (state: RootState) => state.events;

export const selectAllGroups = createSelector([selectGroups], (groups) =>
  groups.allIds.map((id) => groups.byId[id])
);

export const selectAllEvents = createSelector([selectEvents], (events) =>
  events.allIds.map((id) => events.byId[id])
);
