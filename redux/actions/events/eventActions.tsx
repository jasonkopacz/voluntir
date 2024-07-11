import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentEvent,
  setEventLoading,
  setEventError,
  Event,
  clearCurrentEvent,
} from '~/redux/slices/events/eventSlice';
import { setEvents } from '~/redux/slices/events/eventsSlice';
import {
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'events';

export const fetchEvent = createAsyncThunk(
  'event/fetchEvent',
  async (eventId: string, { dispatch }) => {
    try {
      dispatch(setEventLoading(true));
      const event = await getRecord<Event>(COLLECTION_NAME, eventId);
      if (event) dispatch(setCurrentEvent(event));
    } catch (error: any) {
      dispatch(setEventError(error.message));
    } finally {
      dispatch(setEventLoading(false));
    }
  }
);

export const addEvent = createAsyncThunk(
  'event/addEvent',
  async (eventData: Omit<Event, 'id'>, { dispatch }) => {
    try {
      dispatch(setEventLoading(true));
      const newEvent = await addRecord<Event>(COLLECTION_NAME, eventData);
      dispatch(setCurrentEvent(newEvent));
      return newEvent;
    } catch (error: any) {
      dispatch(setEventError(error.message));
      throw error;
    } finally {
      dispatch(setEventLoading(false));
    }
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ eventId, eventData }: { eventId: string; eventData: Partial<Event> }, { dispatch }) => {
    try {
      dispatch(setEventLoading(true));
      await updateRecord<Event>(COLLECTION_NAME, eventId, eventData);
      const updatedEvent = await getRecord<Event>(COLLECTION_NAME, eventId);
      if (updatedEvent) dispatch(setCurrentEvent(updatedEvent));
    } catch (error: any) {
      dispatch(setEventError(error.message));
    } finally {
      dispatch(setEventLoading(false));
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (eventId: string, { dispatch }) => {
    try {
      dispatch(setEventLoading(true));
      await deleteRecord(COLLECTION_NAME, eventId);
      dispatch(clearCurrentEvent());
    } catch (error: any) {
      dispatch(setEventError(error.message));
    } finally {
      dispatch(setEventLoading(false));
    }
  }
);

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { dispatch }) => {
  try {
    dispatch(setEventLoading(true));
    const events = await getRecords<Event>(COLLECTION_NAME);
    dispatch(setEvents(events));
    return events;
  } catch (error: any) {
    dispatch(setEventError(error.message));
    throw error;
  } finally {
    dispatch(setEventLoading(false));
  }
});
