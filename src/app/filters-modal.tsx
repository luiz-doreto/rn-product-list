import { Text, View } from 'react-native';
import useFilterModalViewModel from '@/viewmodels/modal/useFilterModalViewModel';

const FiltersModal = () => {
  const { categories, sortByOptions } = useFilterModalViewModel();
  return (
    <View>
      <Text>Filter by category:</Text>
      {categories?.map(category => (
        <Text key={category}>{category}</Text>
      ))}
      <Text>Sort By</Text>
      {Object.keys(sortByOptions).map(key => (
        <Text key={key}>
          {sortByOptions[key as keyof typeof sortByOptions]}
        </Text>
      ))}
    </View>
  );
};

export default FiltersModal;
