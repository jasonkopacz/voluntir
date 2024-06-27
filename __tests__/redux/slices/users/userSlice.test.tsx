// src/__tests__/userSlice.test.ts

import userReducer, {
  setCurrentUser,
  clearCurrentUser,
  setOnboardingComplete,
  setLoading,
  setError,
  User,
  UserState,
} from '~/redux/slices/users/userSlice';

describe('userSlice', () => {
  const initialState: UserState = {
    currentUser: null,
    hasCompletedOnboarding: false,
    isLoading: false,
    error: null,
  };

  const mockUser: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    photo: 'https://example.com/photo.jpg',
    groupIds: ['group1', 'group2'],
    eventIds: ['event1', 'event2'],
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setCurrentUser', () => {
    it('should handle setCurrentUser', () => {
      const actual = userReducer(initialState, setCurrentUser(mockUser));
      expect(actual.currentUser).toEqual(mockUser);
    });

    it('should handle setCurrentUser with null', () => {
      const stateWithUser = { ...initialState, currentUser: mockUser };
      const actual = userReducer(stateWithUser, setCurrentUser(null));
      expect(actual.currentUser).toBeNull();
    });
  });

  it('should handle clearCurrentUser', () => {
    const stateWithUser = { ...initialState, currentUser: mockUser };
    const actual = userReducer(stateWithUser, clearCurrentUser());
    expect(actual.currentUser).toBeNull();
  });

  it('should handle setOnboardingComplete', () => {
    const actual = userReducer(initialState, setOnboardingComplete());
    expect(actual.hasCompletedOnboarding).toBe(true);
  });

  it('should handle setLoading', () => {
    const actual = userReducer(initialState, setLoading(true));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'An error occurred';
    const actual = userReducer(initialState, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
  });

  describe('complex scenarios', () => {
    it('should handle setting user and then clearing', () => {
      let state = userReducer(initialState, setCurrentUser(mockUser));
      expect(state.currentUser).toEqual(mockUser);

      state = userReducer(state, clearCurrentUser());
      expect(state.currentUser).toBeNull();
    });

    it('should handle setting loading, then error, then clearing error', () => {
      let state = userReducer(initialState, setLoading(true));
      expect(state.isLoading).toBe(true);

      state = userReducer(state, setError('An error occurred'));
      expect(state.error).toBe('An error occurred');
      expect(state.isLoading).toBe(true); // Loading should still be true

      state = userReducer(state, setLoading(false));
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('An error occurred'); // Error should persist

      state = userReducer(state, setError(null));
      expect(state.error).toBeNull();
    });

    it('should maintain other state when updating one property', () => {
      let state = userReducer(initialState, setCurrentUser(mockUser));
      state = userReducer(state, setOnboardingComplete());
      state = userReducer(state, setLoading(true));

      expect(state).toEqual({
        currentUser: mockUser,
        hasCompletedOnboarding: true,
        isLoading: true,
        error: null,
      });

      state = userReducer(state, setError('An error'));

      expect(state).toEqual({
        currentUser: mockUser,
        hasCompletedOnboarding: true,
        isLoading: true,
        error: 'An error',
      });
    });
  });
});
