// app/api/firestore/dbActions.ts

import firestore from '@react-native-firebase/firestore';

export const addRecord = async <T extends { id?: string }>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<T> => {
  const docRef = await firestore().collection(collectionName).add(data);
  return { ...data, id: docRef.id } as T;
};

export const getRecord = async <T extends { id: string }>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const doc = await firestore().collection(collectionName).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
};

export const getRecords = async (collectionName: string, query?: any) => {
  let ref = firestore().collection(collectionName);
  if (query) {
    Object.entries(query).forEach(([field, value]) => {
      ref = ref.where(field, '==', value) as any;
    });
  }
  const snapshot = await ref.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addRecords = async (collectionName: string, data: any[]) => {
  const docRef = await firestore().collection(collectionName).add(data);
  return docRef.id;
};

export const updateRecord = async (collectionName: string, id: string, data: any) => {
  await firestore().collection(collectionName).doc(id).update(data);
};

export const deleteRecord = async (collectionName: string, id: string) => {
  await firestore().collection(collectionName).doc(id).delete();
};
