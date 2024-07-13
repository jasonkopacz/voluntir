import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    loadStoredValue();
  }, []);

  async function loadStoredValue() {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.error('Error loading stored value:', error);
    }
  }

  async function setValue(value: T) {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting stored value:', error);
    }
  }

  return [storedValue, setValue] as const;
}

export default useAsyncStorage;
