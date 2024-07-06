import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCategory,
  setCategoryLoading,
  setCategoryError,
  Category,
  clearCategory,
} from '~/redux/slices/categories/categorySlice';
import { setCategories } from '~/redux/slices/categories/categoriesSlice';
import {
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'categories';

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (categoryId: string, { dispatch }) => {
    try {
      dispatch(setCategoryLoading(true));
      const category = await getRecord<Category>(COLLECTION_NAME, categoryId);
      if (category) dispatch(setCategory(category));
    } catch (error: any) {
      dispatch(setCategoryError(error.message));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (categoryData: Omit<Category, 'id'>, { dispatch }) => {
    console.log('made it');
    try {
      dispatch(setCategoryLoading(true));
      const newCategory = await addRecord<Category>(COLLECTION_NAME, categoryData);
      dispatch(setCategory(newCategory));
      return newCategory;
    } catch (error: any) {
      dispatch(setCategoryError(error.message));
      throw error;
    } finally {
      dispatch(setCategoryLoading(false));
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (
    { categoryId, categoryData }: { categoryId: string; categoryData: Partial<Category> },
    { dispatch }
  ) => {
    try {
      dispatch(setCategoryLoading(true));
      await updateRecord<Category>(COLLECTION_NAME, categoryId, categoryData);
      const updatedCategory = await getRecord<Category>(COLLECTION_NAME, categoryId);
      if (updatedCategory) dispatch(setCategory(updatedCategory));
    } catch (error: any) {
      dispatch(setCategoryError(error.message));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId: string, { dispatch }) => {
    try {
      dispatch(setCategoryLoading(true));
      await deleteRecord(COLLECTION_NAME, categoryId);
      dispatch(clearCategory());
    } catch (error: any) {
      dispatch(setCategoryError(error.message));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { dispatch }) => {
    try {
      dispatch(setCategoryLoading(true));
      const categories = await getRecords<Category>(COLLECTION_NAME);
      dispatch(setCategories(categories));
      return categories;
    } catch (error: any) {
      dispatch(setCategoryError(error.message));
      throw error;
    } finally {
      dispatch(setCategoryLoading(false));
    }
  }
);
