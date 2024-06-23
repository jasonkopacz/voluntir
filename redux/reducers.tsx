import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/users/userSlice';
import usersReducer from './slices/users/usersSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
