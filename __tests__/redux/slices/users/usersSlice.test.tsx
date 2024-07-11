// src/__tests__/usersSlice.test.ts

import usersReducer, {
  addUser,
  updateUser,
  removeUser,
  setUsers,
  setLoading,
  setError,
} from '~/redux/slices/users/usersSlice';

describe('usersSlice', () => {
  const initialState = {
    byId: {},
    allIds: [],
    isLoading: false,
    error: null,
  };

  const mockUser1 = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    photo: 'https://example.com/john.jpg',
    groupIds: ['group1'],
    eventIds: ['event1'],
  };

  const mockUser2 = {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    photo: 'https://example.com/jane.jpg',
    groupIds: ['group2'],
    eventIds: ['event2'],
  };

  it('should handle initial state', () => {
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addUser', () => {
    it('should add a new user', () => {
      const actual = usersReducer(initialState, addUser(mockUser1));
      expect(actual.byId).toEqual({ [mockUser1.id]: mockUser1 });
      expect(actual.allIds).toEqual([mockUser1.id]);
    });

    it('should not duplicate user id in allIds', () => {
      const stateWithUser = usersReducer(initialState, addUser(mockUser1));
      const actual = usersReducer(stateWithUser, addUser(mockUser1));
      expect(actual.allIds).toEqual([mockUser1.id]);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', () => {
      const stateWithUser = usersReducer(initialState, addUser(mockUser1));
      const updatedUser = { ...mockUser1, firstName: 'Johnny' };
      const actual = usersReducer(stateWithUser, updateUser(updatedUser));
      expect(actual.byId[mockUser1.id]).toEqual(updatedUser);
    });

    it("should not add a new user if it doesn't exist", () => {
      const actual = usersReducer(initialState, updateUser(mockUser1));
      expect(actual).toEqual(initialState);
    });
  });

  describe('removeUser', () => {
    it('should remove an existing user', () => {
      const stateWithUser = usersReducer(initialState, addUser(mockUser1));
      const actual = usersReducer(stateWithUser, removeUser(mockUser1.id));
      expect(actual.byId).toEqual({});
      expect(actual.allIds).toEqual([]);
    });

    it("should not change state if user doesn't exist", () => {
      const actual = usersReducer(initialState, removeUser('nonexistent'));
      expect(actual).toEqual(initialState);
    });
  });

  describe('setUsers', () => {
    it('should set multiple users', () => {
      const users = [mockUser1, mockUser2];
      const actual = usersReducer(initialState, setUsers(users));
      expect(actual.byId).toEqual({
        [mockUser1.id]: mockUser1,
        [mockUser2.id]: mockUser2,
      });
      expect(actual.allIds).toEqual([mockUser1.id, mockUser2.id]);
    });

    it('should replace existing users', () => {
      const stateWithUser = usersReducer(initialState, addUser(mockUser1));
      const actual = usersReducer(stateWithUser, setUsers([mockUser2]));
      expect(actual.byId).toEqual({ [mockUser2.id]: mockUser2 });
      expect(actual.allIds).toEqual([mockUser2.id]);
    });
  });

  it('should handle setLoading', () => {
    const actual = usersReducer(initialState, setLoading(true));
    expect(actual.isLoading).toBe(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'An error occurred';
    const actual = usersReducer(initialState, setError(errorMessage));
    expect(actual.error).toBe(errorMessage);
  });

  describe('complex scenarios', () => {
    it('should handle adding multiple users and then removing one', () => {
      let state = usersReducer(initialState, addUser(mockUser1));
      state = usersReducer(state, addUser(mockUser2));
      expect(state.allIds.length).toBe(2);

      state = usersReducer(state, removeUser(mockUser1.id));
      expect(state.allIds.length).toBe(1);
      expect(state.byId[mockUser2.id]).toEqual(mockUser2);
    });

    it('should handle setting users, updating one, and then removing one', () => {
      let state = usersReducer(initialState, setUsers([mockUser1, mockUser2]));

      const updatedUser1 = { ...mockUser1, firstName: 'Johnny' };
      state = usersReducer(state, updateUser(updatedUser1));

      state = usersReducer(state, removeUser(mockUser2.id));

      expect(state.byId).toEqual({ [mockUser1.id]: updatedUser1 });
      expect(state.allIds).toEqual([mockUser1.id]);
    });

    it('should maintain loading and error states when modifying users', () => {
      let state = usersReducer(initialState, setLoading(true));
      state = usersReducer(state, setError('An error'));
      state = usersReducer(state, addUser(mockUser1));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe('An error');
      expect(state.byId[mockUser1.id]).toEqual(mockUser1);
    });
  });
});
