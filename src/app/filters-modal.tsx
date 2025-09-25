import { StyleSheet, Text, View } from 'react-native';
import useFilterModalViewModel from '@/viewmodels/modal/useFilterModalViewModel';
import { Picker } from '@react-native-picker/picker';
import { SortByOptions } from '@/constants';

const FiltersModal = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
  } = useFilterModalViewModel();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={value => setSelectedCategory(value)}
      >
        {categories?.map(category => (
          <Picker.Item
            key={category.slug}
            label={category.name}
            value={category.slug}
            color={selectedCategory === category.slug ? '#007AFF' : 'black'}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Sort By:</Text>
      <Picker
        selectedValue={selectedSort}
        onValueChange={value => setSelectedSort(value)}
      >
        {SortByOptions.map(option => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
            color={selectedSort === option.value ? '#007AFF' : 'black'}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default FiltersModal;
