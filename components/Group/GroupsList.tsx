import { FlatList } from 'react-native';
import GroupItem from './GroupItem';
import { Group } from '~/redux/slices/groups/groupSlice';

const GroupsList = ({ groups }: { groups: Group[] }) => (
  <FlatList
    data={groups}
    renderItem={({ item }) => <GroupItem group={item as Group} />}
    keyExtractor={(item) => item.id}
  />
);

export default GroupsList;
