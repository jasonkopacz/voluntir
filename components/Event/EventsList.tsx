import React from 'react';
import { FlatList, View } from 'react-native';
import EventItem from './EventItem';
import { Event } from '~/redux/slices/events/eventSlice';

const EventsList = ({ events }: { events: Event[] }) => (
  <View>
    <FlatList
      data={events}
      renderItem={({ item }) => <EventItem event={item as Event} />}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={10}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 10,
      }}
    />
  </View>
);

export default EventsList;
