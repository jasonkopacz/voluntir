import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Event } from '~/redux/slices/events/eventSlice';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation/AppNavigator';

type EventDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'EventDetailScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'EventDetailScreen'>;
};

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ route, navigation }) => {
  const { eventId } = route.params;
  const event: Event = {} as Event;
  const onJoinEvent = () => {};

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#555" />
          <Text style={styles.infoText}>{`${event.startTime} - ${event.endTime}`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#555" />
          <Text
            style={
              styles.infoText
            }>{`${event.location?.address}, ${event.location?.city}, ${event.location?.state} ${event.location?.zipCode}`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={20} color="#555" />
          <Text
            style={
              styles.infoText
            }>{`${event.currentParticipants}/${event.maxParticipants} participants`}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>
        <TouchableOpacity style={styles.joinButton} onPress={onJoinEvent}>
          <Text style={styles.joinButtonText}>Join Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 20,
    color: '#444',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;
