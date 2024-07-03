// src/__tests__/LogoutComponent.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import LogoutComponent from '~/components/auth/LogoutComponent';
import { RootState } from '~/redux/store';
import { clearCurrentUser } from '~/redux/slices/users/userSlice';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    revokeAccess: jest.fn(),
    signOut: jest.fn(),
  },
}));

jest.mock('~/redux/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

type DispatchExts = ThunkDispatch<RootState, void, Action>;
const mockStore = configureStore<Partial<RootState>, DispatchExts>([]);

describe('LogoutComponent', () => {
  let store: ReturnType<typeof mockStore>;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: { id: '123', firstName: 'John', lastName: 'Doe' },
        hasCompletedOnboarding: true,
        isLoading: false,
        error: null,
      },
    } as Partial<RootState>);

    mockDispatch = jest.fn();
    require('~/redux/hooks').useAppDispatch.mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LogoutComponent />
      </Provider>
    );

    expect(getByText('Log Out')).toBeTruthy();
  });

  it('calls logout function when pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LogoutComponent />
      </Provider>
    );

    const logoutButton = getByText('Log Out');
    fireEvent.press(logoutButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearCurrentUser());
    expect(
      require('@react-native-google-signin/google-signin').GoogleSignin.revokeAccess
    ).toHaveBeenCalled();
    expect(
      require('@react-native-google-signin/google-signin').GoogleSignin.signOut
    ).toHaveBeenCalled();
  });

  it('has correct styles', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <LogoutComponent />
      </Provider>
    );

    const logoutButton = getByTestId('logoutButton');
    expect(logoutButton?.props.style).toEqual({
      margin: 20,
      backgroundColor: '#ff3b30',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      opacity: 1,
    });

    const logoutText = getByTestId('logoutButtonText');
    expect(logoutText.props.style).toEqual({
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    });
  });
});
