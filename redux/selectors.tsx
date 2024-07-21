import { RootState } from '~/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { Group } from '~/redux/slices/groups/groupSlice';
import { Event } from '~/redux/slices/events/eventSlice';

const selectGroups = (state: RootState) => state.groups;
const selectEvents = (state: RootState) => state.events;

export const selectGroupById = createSelector(
  [selectGroups, (state: RootState, groupId: string) => groupId],
  (groups, groupId): Group | undefined => groups.byId[groupId]
);

export const selectAllGroups = createSelector([selectGroups], (groups): Group[] =>
  groups.allIds.map((id) => groups.byId[id])
);

export const selectEventById = createSelector(
  [selectEvents, (state: RootState, eventId: string) => eventId],
  (events, eventId): Event | undefined => events.byId[eventId]
);

export const selectAllEvents = createSelector([selectEvents], (events): Event[] =>
  events.allIds.map((id) => events.byId[id])
);
