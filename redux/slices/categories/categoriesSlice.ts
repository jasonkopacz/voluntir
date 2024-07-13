// src/redux/slices/categoriesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from './categorySlice';

interface CategoriesState {
  byId: { [key: string]: Category };
  allIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  byId: {},
  allIds: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.byId[action.payload.id] = action.payload;
      if (!state.allIds.includes(action.payload.id)) {
        state.allIds.push(action.payload.id);
      }
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      if (state.byId[action.payload.id]) {
        state.byId[action.payload.id] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((category) => {
        if (!state.byId[category.id]) {
          state.byId[category.id] = category;
          state.allIds.push(category.id);
        }
      });
    },
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCategoriesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
