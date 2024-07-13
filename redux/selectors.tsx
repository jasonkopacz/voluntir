import { RootState } from '~/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { Group } from '~/redux/slices/groups/groupSlice';
import { Event } from '~/redux/slices/events/eventSlice';

const selectGroups = (state: RootState) => state.groups;
const selectEvents = (state: RootState) => state.events;

export const selectAllGroups = createSelector([selectGroups], (groups): Group[] =>
  groups.allIds.map((id) => groups.byId[id])
);

export const selectAllEvents = createSelector([selectEvents], (events): Event[] =>