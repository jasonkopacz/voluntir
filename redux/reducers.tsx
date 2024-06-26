import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/users/userSlice';
import usersReducer from './slices/users/usersSlice';
import categoryReducer from './slices/categories/categorySlice';
import categoriesReducer from './slices/categories/categoriesSlice';
import groupReducer from './slices/groups/groupSlice';
import groupsReducer from './slices/groups/groupsSlice';
import eventReducer from './slices/events/eventSlice';
import eventsReducer from './slices/events/eventsSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  group: groupReducer,
  groups: groupsReducer,
  event: eventReducer,
  events: eventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
