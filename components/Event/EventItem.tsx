import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Event } from '~/redux/slices/events/eventSlice';

const EventItem = ({ event }: { event: Event }) => {
  if (!event.title) {
    return null;
  }
  return (
    <View style={styles.eventItem}>
      <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
      {console.log(event)}
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text>{`${event.date} ${event.startTime} - ${event.endTime}`}</Text>
        <Text>{`${event?.location.city}, ${event?.location.state}`}</Text>
        <Text>{`${event.currentParticipants}/${event.maxParticipants} participants`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default EventItem;
