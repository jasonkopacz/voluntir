import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Event } from '~/redux/slices/events/eventSlice';

type RootStackParamList = {
  EventDetailScreen: { eventId: string };
};

type EventItemProps = {
  event: Event;
};

const EventItem: React.FC<EventItemProps> = ({ event }: EventItemProps): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (!event) {
    throw new Error('Event is required');
  }

  const handlePress = (): void => {
    navigation.navigate('EventDetailScreen', { eventId: event.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.eventItem}>
      <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text>{`${event.date} ${event.startTime} - ${event.endTime}`}</Text>
        <Text>{`${event?.location.city}, ${event?.location.state}`}</Text>
        <Text>{`${event.currentParticipants}/${event.maxParticipants} participants`}</Text>
      </View>
    </TouchableOpacity>
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
