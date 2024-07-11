// src/redux/slices/eventsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from './eventSlice';

interface EventsState {
  byId: { [key: string]: Event };
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Join us for a day of cleaning up our local beaches!',
    groupId: '1', // Greenpeace
    categoryId: '1', // Environmental
    date: '2023-07-15',
    startTime: '09:00',
    endTime: '13:00',
    location: {
      address: '123 Beach Rd',
      city: 'Seaside',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
    },
    maxParticipants: 50,
    currentParticipants: 30,
    imageUrl: 'https://example.com/beach-cleanup.jpg',
  },
  {
    id: '2',
    title: 'Community Garden Planting',
    description: 'Help us plant a new community garden!',
    groupId: '3', // Habitat for Humanity
    categoryId: '10', // Community Development
    date: '2023-07-22',
    startTime: '10:00',
    endTime: '14:00',
    location: {
      address: '456 Green St',
      city: 'Urbanville',
      state: 'NY',
      zipCode: '12345',
      country: 'USA',
    },
    maxParticipants: 30,
    currentParticipants: 15,
    imageUrl: 'https://example.com/community-garden.jpg',
  },
  {
    id: '3',
    title: 'Wildlife Conservation Workshop',
    description: 'Learn about local wildlife and conservation efforts.',
    groupId: '4', // World Wildlife Fund
    categoryId: '5', // Animal Welfare
    date: '2023-08-05',
    startTime: '13:00',
    endTime: '16:00',
    location: {
      address: '789 Forest Ave',
      city: 'Wildtown',
      state: 'OR',
      zipCode: '54321',
      country: 'USA',
    },
    maxParticipants: 40,
    currentParticipants: 25,
    imageUrl: 'https://example.com/wildlife-workshop.jpg',
  },
];

const initialState: EventsState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

initialEvents.forEach((event) => {
  initialState.byId[event.id] = event;
  initialState.allIds.push(event.id);
});

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
