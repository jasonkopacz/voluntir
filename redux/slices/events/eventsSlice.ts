// src/redux/slices/eventsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from './eventSlice';

interface EventsState {
  byId: { [key: string]: Event };
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.byId[action.payload.id] = action.payload;
      if (!state.allIds.includes(action.payload.id)) {
        state.allIds.push(action.payload.id);
      }
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      if (state.byId[action.payload.id]) {
        state.byId[action.payload.id] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((event) => {
        state.byId[event.id] = event;
        state.allIds.push(event.id);
      });
    },
    setEventsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEventsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addEvent, updateEvent, removeEvent, setEvents, setEventsLoading, setEventsError } =
  eventsSlice.actions;

export default eventsSlice.reducer;
