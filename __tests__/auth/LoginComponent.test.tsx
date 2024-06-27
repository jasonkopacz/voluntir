// src/__tests__/LoginComponent.test.tsx

import React from 'react';
// import { View, Text } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import LoginComponent from '~/components/auth/LoginComponent';
import { RootState } from '~/redux/store';

jest.mock('@react-native-google-signin/google-signin', () => {
  const mockReact = require('react');
  const mockRN = require('react-native');

  const MockGoogleSigninButton = ({
    size,
    color,
    onPress,
    testID,
  }: {
    size: number;
    color: number;
    onPress: () => void;
    testID: string;
  }) => {
    return mockReact.createElement(
      mockRN.View,
      {
        testID: testID,
        accessibilityLabel: 'Sign in with Google',
        onTouchEnd: onPress,
        style: {
          width: size === 1 ? 300 : 200, // 1 is Wide
          backgroundColor: color === 0 ? '#4285F4' : '#FFFFFF', // 0 is Dark
        },
      },
      mockReact.createElement(
        mockRN.Text,
        {
          style: { color: color === 0 ? '#FFFFFF' : '#4285F4' },
        },
        'Sign in with Google'
      )
    );
  };

  MockGoogleSigninButton.Size = {
    Standard: 0,
    Wide: 1,
    Icon: 2,
  };

  MockGoogleSigninButton.Color = {
    Dark: 0,
    Light: 1,
  };

  return {
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn().mockResolvedValue(true),
      signIn: jest.fn(),
    },
    GoogleSigninButton: MockGoogleSigninButton,
  };
});
type DispatchExts = ThunkDispatch<RootState, void, Action>;
const mockStore = configureStore<Partial<RootState>, DispatchExts>([]);

describe('LoginComponent', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: null,
        hasCompletedOnboarding: false,
        isLoading: false,
        error: null,
      },
    } as Partial<RootState>);
  });

  it('renders correctly', () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    expect(getByTestId('google-signin-button')).toBeTruthy();
    expect(queryByText('Sign in with Google')).toBeTruthy();
    expect(queryByText(/error/i)).toBeNull();
  });

  it('calls GoogleSignin.signIn when button is pressed', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    const signInButton = getByText('Sign in with Google');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(GoogleSignin.signIn).toHaveBeenCalled();
    });
  });

  it('dispatches setCurrentUser action on successful sign in', async () => {
    const mockUser = {
      user: {
        id: '123',
        givenName: 'John',
        familyName: 'Doe',
        email: 'john@example.com',
        photo: 'https://example.com/photo.jpg',
      },
    };

    (GoogleSignin.signIn as jest.Mock).mockResolvedValue(mockUser);

    const { getByText } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    const signInButton = getByText('Sign in with Google');
    fireEvent.press(signInButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe('user/setCurrentUser');
      expect(actions[0].payload).toEqual({
        id: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        photo: 'https://example.com/photo.jpg',
        groupIds: [],
        eventIds: [],
      });
    });
  });

  it('displays error message on sign in failure', async () => {
    (GoogleSignin.signIn as jest.Mock).mockRejectedValue(new Error('Sign in failed'));

    const { getByText, findByText } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    const signInButton = getByText('Sign in with Google');
    fireEvent.press(signInButton);

    const errorMessage = await findByText('Sign in failed');
    expect(errorMessage).toBeTruthy();
  });
});
