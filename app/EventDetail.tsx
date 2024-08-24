import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import EventDetail from '~/screens/EventDetailScreen';

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  return <EventDetail eventId={eventId} />;
}
