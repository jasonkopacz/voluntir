import { FlatList } from 'react-native';
import EventItem from './EventItem';
import { Event } from '~/redux/slices/events/eventSlice';

const EventsList = ({ events }: { events: Event[] }) => (
  <FlatList
    data={events}
    renderItem={({ item }) => <EventItem event={item as Event} />}
    keyExtractor={(item) => item.id}
  />
);

export default EventsList;
