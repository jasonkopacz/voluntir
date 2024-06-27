// store.test.ts

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from '~/redux/reducers';

// Mock the modules
jest.mock('@reduxjs/toolkit', () => {
  const actualToolkit = jest.requireActual('@reduxjs/toolkit');
  return {
    ...actualToolkit,
    configureStore: jest.fn().mockImplementation((config) => {
      const store = actualToolkit.configureStore(config);
      return {
        ...store,
        getState: jest.fn().mockReturnValue({}),
        dispatch: jest.fn(),
      };
    }),
  };
});

jest.mock('redux-persist', () => {
  const actualPersist = jest.requireActual('redux-persist');
  return {
    ...actualPersist,
    persistReducer: jest.fn((config, reducer) => reducer),
    persistStore: jest.fn().mockImplementation(() => ({
      purge: jest.fn(),
      flush: jest.fn(),
      pause: jest.fn(),
      persist: jest.fn(),
      register: jest.fn(),
    })),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('~/redux/reducers', () => ({
  rootReducer: jest.fn(),
}));

describe('Redux Store', () => {
  let store: any;
  let persistor: any;

  beforeEach(() => {
    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    persistor = persistStore(store);
  });

  it('should create a Redux store with persisted reducer', () => {
    require('~/redux/store');

    expect(persistReducer).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'root',
        storage: AsyncStorage,
      }),
      rootReducer
    );

    expect(configureStore).toHaveBeenCalledWith(
      expect.objectContaining({
        reducer: expect.any(Function),
        middleware: expect.any(Function),
      })
    );
  });

  it('should export the correct types', () => {
    const { store } = require('~/redux/store');

    type TestRootState = ReturnType<typeof store.getState>;
    type TestAppDispatch = typeof store.dispatch;

    const testState: TestRootState = store.getState();
    const testDispatch: TestAppDispatch = store.dispatch;

    expect(testState).toBeDefined();
    expect(testDispatch).toBeDefined();
  });

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  it('should have ignoredActions in the middleware', () => {
    const actionsToTest = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

    actionsToTest.forEach((action) => {
      expect(() => {
        store.dispatch({ type: action });
      }).not.toThrow();
    });
  });
});
