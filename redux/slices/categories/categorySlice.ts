// src/redux/slices/categorySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  groupIds: string[];
  eventIds: string[];
}

interface CategoryState {
  currentCategory: Category | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  currentCategory: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearCategory: (state) => {
      state.currentCategory = null;
    },
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCategoryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setCategory, clearCategory, setCategoryLoading, setCategoryError } =
  categorySlice.actions;

export default categorySlice.reducer;
