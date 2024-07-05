// app/api/firestore/dbActions.ts

import firestore from '@react-native-firebase/firestore';

export const getRecord = async <T extends Record<string, any>>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> => {
  try {
    const querySnapshot = await firestore()
      .collection(collectionName)
      .where('id', '==', id)
      .limit(1)
      .get();

    console.log('querySnapshot', querySnapshot);
    const doc = querySnapshot.docs[0];
    console.log('doc', doc);
    return { ...doc.data(), id: doc.id } as T & { id: string };
  } catch (error) {
    console.error(`Error getting record from ${collectionName}:`, error);
    return null;
  }
};
export const addRecord = async <T extends Record<string, any>>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<T> => {
  try {
    const docRef = await firestore().collection(collectionName).add(data);
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() } as unknown as T;
  } catch (error) {
    console.error(`Error adding record to ${collectionName}:`, error);
    throw new Error(`Failed to add record to ${collectionName}`);
  }
};

export const getRecords = async <T extends Record<string, any>>(
  collectionName: string,
  query?: Partial<T>
): Promise<(T & { id: string })[]> => {
  try {
    let ref = firestore().collection(collectionName);
    if (query) {
      Object.entries(query).forEach(([field, value]) => {
        ref = ref.where(field, '==', value) as any;
      });
    }
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T & { id: string });
  } catch (error) {
    console.error(`Error getting records from ${collectionName}:`, error);
    throw new Error(`Failed to get records from ${collectionName}`);
  }
};

export const addRecords = async <T extends Record<string, any>>(
  collectionName: string,
  records: T[]
): Promise<T[]> => {
  try {
    const batch = firestore().batch();
    const newRecords: T[] = [];

    records.forEach((record) => {
      const docRef = firestore().collection(collectionName).doc();
      batch.set(docRef, record);
      newRecords.push({ ...record, id: docRef.id });
    });

    await batch.commit();
    return newRecords;
  } catch (error) {
    console.error(`Error adding records to ${collectionName}:`, error);
    throw new Error(`Failed to add records to ${collectionName}`);
  }
};

export const updateRecord = async <T extends Record<string, any>>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await firestore().collection(collectionName).doc(id).update(data);
  } catch (error) {
    console.error(`Error updating record in ${collectionName}:`, error);
    throw new Error(`Failed to update record in ${collectionName}`);
  }
};

export const deleteRecord = async (collectionName: string, id: string): Promise<void> => {
  try {
    await firestore().collection(collectionName).doc(id).delete();
  } catch (error) {
    console.error(`Error deleting record from ${collectionName}:`, error);
    throw new Error(`Failed to delete record from ${collectionName}`);
  }
};
