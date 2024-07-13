import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCurrentGroup,
  setGroupLoading,
  setGroupError,
  Group,
  clearCurrentGroup,
} from '~/redux/slices/groups/groupSlice';
import { setGroups } from '~/redux/slices/groups/groupsSlice';
import {
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} from '~/api/firestore/dbActions';

const COLLECTION_NAME = 'groups';

export const fetchGroup = createAsyncThunk(
  'group/fetchGroup',
  async (groupId: string, { dispatch }) => {
    try {
      dispatch(setGroupLoading(true));
      const group = await getRecord<Group>(COLLECTION_NAME, groupId);
      if (group) dispatch(setCurrentGroup(group));
    } catch (error: any) {
      dispatch(setGroupError(error.message));
    } finally {
      dispatch(setGroupLoading(false));
    }
  }
);

export const addGroup = createAsyncThunk(
  'group/addGroup',
  async (groupData: Omit<Group, 'id'>, { dispatch }) => {
    try {
      dispatch(setGroupLoading(true));
      const newGroup = await addRecord<Group>(COLLECTION_NAME, groupData);
      dispatch(setCurrentGroup(newGroup));
      return newGroup;
    } catch (error: any) {
      dispatch(setGroupError(error.message));
      throw error;
    } finally {
      dispatch(setGroupLoading(false));
    }
  }
);

export const updateGroup = createAsyncThunk(
  'group/updateGroup',
  async ({ groupId, groupData }: { groupId: string; groupData: Partial<Group> }, { dispatch }) => {
    try {
      dispatch(setGroupLoading(true));
      await updateRecord<Group>(COLLECTION_NAME, groupId, groupData);
      const updatedGroup = await getRecord<Group>(COLLECTION_NAME, groupId);
      if (updatedGroup) dispatch(setCurrentGroup(updatedGroup));
    } catch (error: any) {
      dispatch(setGroupError(error.message));
    } finally {
      dispatch(setGroupLoading(false));
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'group/deleteGroup',
  async (groupId: string, { dispatch }) => {
    try {
      dispatch(setGroupLoading(true));
      await deleteRecord(COLLECTION_NAME, groupId);
      dispatch(clearCurrentGroup());
    } catch (error: any) {
      dispatch(setGroupError(error.message));
    } finally {
      dispatch(setGroupLoading(false));
    }
  }
);

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (_, { dispatch }) => {
  try {
    dispatch(setGroupLoading(true));
    const groups = await getRecords<Group>(COLLECTION_NAME);
    dispatch(setGroups(groups));
    return groups;
  } catch (error: any) {
    dispatch(setGroupError(error.message));
    throw error;
  } finally {
    dispatch(setGroupLoading(false));
  }
});
