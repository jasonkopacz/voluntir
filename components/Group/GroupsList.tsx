import { FlatList, View } from 'react-native';
import GroupItem from './GroupItem';
import { Group } from '~/redux/slices/groups/groupSlice';

const GroupsList = ({ groups }: { groups: Group[] }) => (
  <View>
    <FlatList
      data={groups}
      renderItem={({ item }) => <GroupItem group={item as Group} />}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={10}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 10,
      }}
    />
  </View>
);

export default GroupsList;
