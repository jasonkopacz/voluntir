import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { RootState } from '~/redux/store';
import { fetchEvents } from '~/redux/actions/events/eventActions';
import EventsList from '~/components/Event/EventList';
import { Event } from '~/redux/slices/events/eventSlice';
import { Group } from '~/redux/slices/groups/groupSlice';
import CategoryScroll from '~/components/Category/CategoryScroll';
import { fetchGroups } from '~/redux/actions/groups/groupActions';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventsState = useAppSelector((state: RootState) => state.events);
  const groupsState = useAppSelector((state: RootState) => state.groups);

  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleCategorySelect = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.categoryIds.some((category) => selectedCategories.includes(category))
      );
      setFilteredGroups(filtered);
    }
  };

  const events = eventsState.allIds.map((id) => eventsState.byId[id]);
  if (eventsState.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (eventsState.error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{eventsState.error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryScroll onCategorySelect={handleCategorySelect} />
      <Text style={styles.title}>Upcoming Events</Text>
      <EventsList events={events as Event[]} />
      {/* Groups List */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    margin: 16,
  },
});

export default HomeScreen;
