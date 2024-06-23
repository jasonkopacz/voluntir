import { Link } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../redux/store';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import UserComponent from '~/components/UserComponent';

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <UserComponent />
          <ScreenContent path="app/index.tsx" title="Home" />
          <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
            <Button title="Show Details" />
          </Link>
        </Container>
      </PersistGate>
    </Provider>
  );
}
