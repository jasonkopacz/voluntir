import { resetState } from '~/redux/actions/resetStateActions';
import { store, persistor } from '../redux/store';

export const clearStateAndCache = async () => {
  await persistor.purge();
  store.dispatch(resetState());
};
