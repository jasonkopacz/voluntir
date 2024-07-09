// src/redux/slices/eventSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
  id: string;
  title: string;
  description: string;
  groupId: string;
  categoryId: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  maxParticipants: number;
  currentParticipants: number;
  imageUrl: string;
}

interface EventState {
  currentEvent: Event | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventState = {
  currentEvent: null,
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<Event>) => {
      state.currentEvent = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    setEventLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEventError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCurrentEvent, clearCurrentEvent, setEventLoading, setEventError } =
  eventSlice.actions;

export default eventSlice.reducer;
