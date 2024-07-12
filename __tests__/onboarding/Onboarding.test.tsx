// src/__tests__/OnboardingQuestionnaire.test.tsx

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import OnboardingQuestionnaire from '~/components/Onboarding/OnboardingQuestionnaire';
import { RootState } from '~/redux/store';
import { Category } from '~/redux/slices/categories/categorySlice';

jest.mock('../../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

type DispatchExts = ThunkDispatch<RootState, void, Action>;
const mockStore = configureStore<Partial<RootState>, DispatchExts>([]);

describe('OnboardingQuestionnaire', () => {
  let store: ReturnType<typeof mockStore>;
  let mockDispatch: jest.Mock;

  const createMockCategory = (id: string, name: string): Category => ({
    id,
    name,
    description: `Description for ${name}`,
    iconName: 'default-icon',
    groupIds: [],
    eventIds: [],
  });

  beforeEach(() => {
    const mockCategories: { [key: string]: Category } = {
      '1': createMockCategory('1', 'Category 1'),
      '2': createMockCategory('2', 'Category 2'),
    };

    store = mockStore({
      categories: {
        byId: mockCategories,
        allIds: Object.keys(mockCategories),
        isLoading: false,
        error: null,
      },
    } as Partial<RootState>);

    mockDispatch = jest.fn();
    require('../../redux/hooks').useAppDispatch.mockReturnValue(mockDispatch);
    require('../../redux/hooks').useAppSelector.mockImplementation((selector) =>
      selector(store.getState())
    );
  });
  it('renders correctly', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <OnboardingQuestionnaire />
      </Provider>
    );

    expect(getByText("Let's personalize your experience")).toBeTruthy();
    expect(getByText('What categories of volunteer work interest you?')).toBeTruthy();
    expect(getAllByText('Next')).toBeTruthy();
  });

  it('progresses through steps when clicking Next', () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <OnboardingQuestionnaire />
      </Provider>
    );

    // Step 1: Categories
    expect(getByText('What categories of volunteer work interest you?')).toBeTruthy();
    fireEvent.press(getByText('Next'));

    // Step 2: Days
    expect(getByText('Which days are you usually available?')).toBeTruthy();
    fireEvent.press(getByText('Next'));

    // Step 3: Distance
    expect(getByText('How far are you willing to travel for events?')).toBeTruthy();
    fireEvent.press(getByText('Next'));

    // Step 4: Notifications
    expect(getByText('Notification preferences:')).toBeTruthy();
    expect(getByText('Finish')).toBeTruthy();
    expect(queryByText('Next')).toBeNull();
  });

  it('selects and deselects options correctly', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <OnboardingQuestionnaire />
      </Provider>
    );

    const categoryButton = getByTestId('1');
    await act(async () => {
      fireEvent.press(categoryButton);
    });

    expect(categoryButton.props.style).toMatchObject({
      backgroundColor: '#4CAF50',
    });

    await act(async () => {
      fireEvent.press(categoryButton);
    });

    expect(categoryButton.props.style).toMatchObject({
      backgroundColor: '#FFFFFF',
    });
  });

  it('dispatches actions on finish', () => {
    const { getByText } = render(
      <Provider store={store}>
        <OnboardingQuestionnaire />
      </Provider>
    );

    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));

    fireEvent.press(getByText('Finish'));

    expect(mockDispatch).toHaveBeenCalledTimes(5);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'userPreferences/setCategoryIds' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'userPreferences/setAvailableDays' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'userPreferences/setPreferredDistance' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'userPreferences/setNotificationPreferences' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'user/setOnboardingComplete' })
    );
  });
});
