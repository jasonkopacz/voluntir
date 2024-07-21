import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAppSelector } from '~/redux/hooks';
import { selectEventById, selectGroupById } from '~/redux/selectors';

interface EventDetailScreenProps {
  eventId: string;
}

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ eventId }) => {
  const event = useAppSelector((state) => selectEventById(state, eventId));
  const group = event
    ? useAppSelector((state) => selectGroupById(state, event.groupId))
    : undefined;

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.detail}>Date: {event.date}</Text>
        <Text style={styles.detail}>
          Time: {event.startTime} - {event.endTime}
        </Text>
        <Text style={styles.detail}>
          Location: {event.location.city}, {event.location.state}
        </Text>
        <Text style={styles.detail}>Organizer: {group ? group.name : 'Unknown'}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.detail}>
          Participants: {event.currentParticipants}/{event.maxParticipants}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  detail: {
    fontSize: 16,
    margin: 8,
  },
  description: {
    fontSize: 16,
    margin: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 16,
  },
});

export default EventDetailScreen;
