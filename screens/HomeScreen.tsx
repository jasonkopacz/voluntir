import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { RootState } from '~/redux/store';
import { fetchEvents } from '~/redux/actions/events/eventActions';
import EventsList from '~/components/Event/EventsList';
import { Event } from '~/redux/slices/events/eventSlice';
import { fetchGroups } from '~/redux/actions/groups/groupActions';
import GroupsList from '~/components/Group/GroupsList';
import { Group } from '~/redux/slices/groups/groupSlice';
import { fetchCategories } from '~/redux/actions/categories/categoryActions';
import CategoryScroll from '~/components/Category/CategoryScroll';
// import { clearStateAndCache } from '~/utils/stateManagement';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventsState = useAppSelector((state: RootState) => state.events);
  const groupsState = useAppSelector((state: RootState) => state.groups);

  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGroups());
    dispatch(fetchCategories());
    setEvents(eventsState.allIds.map((id) => eventsState.byId[id]));
    setGroups(groupsState.allIds.map((id) => groupsState.byId[id]));
    setFilteredGroups(groupsState.allIds.map((id) => groupsState.byId[id]));
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

  // const handleResetApp = async () => {
  //   await clearStateAndCache();
  // };

  const renderItem = () => (
    <View style={styles.content}>
      <Text style={styles.title}>Upcoming Events</Text>
      <EventsList events={events as Event[]} />
      <Text style={styles.title}>Local Groups</Text>
      <GroupsList groups={filteredGroups as Group[]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<CategoryScroll onCategorySelect={handleCategorySelect} />}
        data={[{ key: 'content' }]}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
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
