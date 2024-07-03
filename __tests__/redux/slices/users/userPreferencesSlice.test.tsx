// src/__tests__/userPreferencesSlice.test.ts

import userPreferencesReducer, {
  setCategoryIds,
  setAvailableDays,
  setPreferredDistance,
  setNotificationPreferences,
} from '~/redux/slices/users/userPreferencesSlice';

describe('userPreferencesSlice', () => {
  const initialState = {
    categoryIds: [],
    availableDays: [],
    preferredDistance: 10,
    notificationPreferences: {
      email: true,
      push: true,
    },
  };

  it('should handle initial state', () => {
    expect(userPreferencesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setCategoryIds', () => {
    it('should set category ids', () => {
      const categoryIds = ['1', '2', '3'];
      const actual = userPreferencesReducer(initialState, setCategoryIds(categoryIds));
      expect(actual.categoryIds).toEqual(categoryIds);
    });

    it('should replace existing category ids', () => {
      const state = { ...initialState, categoryIds: ['1', '2'] };
      const newCategoryIds = ['3', '4'];
      const actual = userPreferencesReducer(state, setCategoryIds(newCategoryIds));
      expect(actual.categoryIds).toEqual(newCategoryIds);
    });
  });

  describe('setAvailableDays', () => {
    it('should set available days', () => {
      const availableDays = ['Monday', 'Wednesday', 'Friday'];
      const actual = userPreferencesReducer(initialState, setAvailableDays(availableDays));
      expect(actual.availableDays).toEqual(availableDays);
    });

    it('should replace existing available days', () => {
      const state = { ...initialState, availableDays: ['Monday', 'Tuesday'] };
      const newAvailableDays = ['Saturday', 'Sunday'];
      const actual = userPreferencesReducer(state, setAvailableDays(newAvailableDays));
      expect(actual.availableDays).toEqual(newAvailableDays);
    });
  });

  describe('setPreferredDistance', () => {
    it('should set preferred distance', () => {
      const distance = 25;
      const actual = userPreferencesReducer(initialState, setPreferredDistance(distance));
      expect(actual.preferredDistance).toEqual(distance);
    });

    it('should update existing preferred distance', () => {
      const state = { ...initialState, preferredDistance: 15 };
      const newDistance = 30;
      const actual = userPreferencesReducer(state, setPreferredDistance(newDistance));
      expect(actual.preferredDistance).toEqual(newDistance);
    });
  });

  describe('setNotificationPreferences', () => {
    it('should set notification preferences', () => {
      const preferences = { email: false, push: true };
      const actual = userPreferencesReducer(initialState, setNotificationPreferences(preferences));
      expect(actual.notificationPreferences).toEqual(preferences);
    });

    it('should update existing notification preferences', () => {
      const state = {
        ...initialState,
        notificationPreferences: { email: true, push: false },
      };
      const newPreferences = { email: false, push: false };
      const actual = userPreferencesReducer(state, setNotificationPreferences(newPreferences));
      expect(actual.notificationPreferences).toEqual(newPreferences);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple preference updates', () => {
      let state = userPreferencesReducer(initialState, setCategoryIds(['1', '2']));
      state = userPreferencesReducer(state, setAvailableDays(['Monday', 'Friday']));
      state = userPreferencesReducer(state, setPreferredDistance(20));
      state = userPreferencesReducer(
        state,
        setNotificationPreferences({ email: false, push: true })
      );

      expect(state).toEqual({
        categoryIds: ['1', '2'],
        availableDays: ['Monday', 'Friday'],
        preferredDistance: 20,
        notificationPreferences: {
          email: false,
          push: true,
        },
      });
    });

    it('should maintain other preferences when updating one', () => {
      const state = {
        categoryIds: ['1', '2'],
        availableDays: ['Monday', 'Friday'],
        preferredDistance: 15,
        notificationPreferences: {
          email: true,
          push: false,
        },
      };

      const updatedState = userPreferencesReducer(state, setAvailableDays(['Tuesday', 'Thursday']));

      expect(updatedState).toEqual({
        ...state,
        availableDays: ['Tuesday', 'Thursday'],
      });
    });
  });
});
