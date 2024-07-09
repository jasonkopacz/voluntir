import { FlatList } from 'react-native';
import EventItem from './EventItem';

const EventsList = ({ events }: { events: Event[] }) => (
  <FlatList
    data={events}
    renderItem={({ item }) => <EventItem event={item} />}
    keyExtractor={(item) => item.id}
  />
);

export default EventsList;
