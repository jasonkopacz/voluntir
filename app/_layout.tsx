import '../global.css';

import { Stack } from 'expo-router';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
export default function Layout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
