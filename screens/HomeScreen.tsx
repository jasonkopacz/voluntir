import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Animated } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { RootState } from '~/redux/store';
import { fetchEvents } from '~/redux/actions/events/eventActions';
import EventsList from '~/components/Event/EventsList';
import { Event } from '~/redux/slices/events/eventSlice';
import { Group } from '~/redux/slices/groups/groupSlice';
import CategoryScroll from '~/components/Category/CategoryScroll';
import { fetchGroups } from '~/redux/actions/groups/groupActions';
import GroupsList from '~/components/Group/GroupsList';

const HEADER_MIN_HEIGHT = 60;
const SELECTED_ROW_HEIGHT = 40;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventsState = useAppSelector((state: RootState) => state.events);
  const groupsState = useAppSelector((state: RootState) => state.groups);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGroups());
  }, [dispatch]);

  useEffect(() => {
    setFilteredGroups(groupsState.allIds.map((id) => groupsState.byId[id]));
    setFilteredEvents(eventsState.allIds.map((id) => eventsState.byId[id]));
  }, [eventsState, groupsState]);

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    if (categories.length === 0) {
      setFilteredGroups(groupsState.allIds.map((id) => groupsState.byId[id]));
      setFilteredEvents(eventsState.allIds.map((id) => eventsState.byId[id]));
    } else {
      const filteredGroups = groupsState.allIds
        .map((id) => groupsState.byId[id])
        .filter((group) => group.categoryIds.some((category) => categories.includes(category)));
      setFilteredGroups(filteredGroups);

      const filteredEvents = eventsState.allIds
        .map((id) => eventsState.byId[id])
        .filter((event) => categories.includes(event.categoryId));
      setFilteredEvents(filteredEvents);
    }
  };

  if (eventsState.isLoading || groupsState.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (eventsState.error || groupsState.error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{eventsState.error || groupsState.error}</Text>
      </SafeAreaView>
    );
  }

  const renderItem = () => (
    <View style={styles.content}>
      <Text style={styles.title}>Upcoming Events</Text>
      <EventsList events={filteredEvents} />
      <Text style={styles.title}>Local Groups</Text>
      <GroupsList groups={filteredGroups} />
    </View>
  );

  const contentPaddingTop =
    selectedCategories.length > 0 ? HEADER_MIN_HEIGHT + SELECTED_ROW_HEIGHT : HEADER_MIN_HEIGHT;

  return (
    <SafeAreaView style={styles.container}>
      <CategoryScroll onCategorySelect={handleCategorySelect} scrollY={scrollY} />
      <Animated.FlatList
        data={[{ key: 'content' }]}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        contentContainerStyle={{ paddingTop: contentPaddingTop }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
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
