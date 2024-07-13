import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { Group } from '~/redux/slices/groups/groupSlice';

const GroupItem = ({ group }: { group: Group }) => {
  if (!group) return null;

  return (
    <View style={styles.groupItem}>
      <Image source={{ uri: group.logo }} style={styles.groupImage} />
      <View style={styles.groupDetails}>
        <Text style={styles.groupTitle}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <Text onPress={() => Linking.openURL(group.website)} style={styles.groupWebsite}>
          {group.website}
        </Text>
        <Text style={styles.groupDescription}>{`${group.userIds.length} members`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  groupDetails: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  groupWebsite: {
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
});

export default React.memo(GroupItem);
