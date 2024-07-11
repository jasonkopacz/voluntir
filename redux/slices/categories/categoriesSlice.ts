// src/redux/slices/categoriesSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from './categorySlice';

interface CategoriesState {
  ids: { [key: string]: Category };
  entities: string[];
  isLoading: boolean;
  error: string | null;
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Environmental',
    description: 'Protect and preserve the environment',
    iconName: 'leaf',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '2',
    name: 'Education',
    description: 'Support learning and skill development',
    iconName: 'book',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '3',
    name: 'Healthcare',
    description: 'Assist in medical and wellness initiatives',
    iconName: 'medical',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '4',
    name: 'Elderly Care',
    description: 'Help and support for older adults',
    iconName: 'people',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '5',
    name: 'Animal Welfare',
    description: 'Protect and care for animals',
    iconName: 'paw',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '6',
    name: 'Hunger Relief',
    description: 'Combat food insecurity and malnutrition',
    iconName: 'restaurant',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '7',
    name: 'Homelessness',
    description: 'Support for homeless individuals and families',
    iconName: 'home',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '8',
    name: 'Disaster Relief',
    description: 'Assist in natural disaster recovery efforts',
    iconName: 'alert',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '9',
    name: 'Arts and Culture',
    description: 'Promote and preserve cultural heritage',
    iconName: 'brush',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '10',
    name: 'Community Development',
    description: 'Improve local communities and neighborhoods',
    iconName: 'people',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '11',
    name: 'Youth Mentoring',
    description: 'Guide and support young people',
    iconName: 'school',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
  {
    id: '12',
    name: 'Technology',
    description: 'Bridge the digital divide and promote tech literacy',
    iconName: 'laptop',
    groupIds: ['1', '2', '3'],
    eventIds: ['1', '2', '3'],
  },
];

const initialState: CategoriesState = {
  ids: {},
  entities: [],
  isLoading: false,
  error: null,
};

initialCategories.forEach((category) => {
  initialState.ids[category.id] = category;
  initialState.entities.push(category.id);
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.ids[action.payload.id] = action.payload;
      if (!state.entities.includes(action.payload.id)) {
        state.entities.push(action.payload.id);
      }
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      if (state.ids[action.payload.id]) {
        state.ids[action.payload.id] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      delete state.ids[action.payload];
      state.entities = state.entities.filter((id) => id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.ids = {};
      state.entities = [];
      action.payload.forEach((category) => {
        state.ids[category.id] = category;
        state.entities.push(category.id);
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
