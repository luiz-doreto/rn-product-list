import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';

const FiltersButton = () => {
  return (
    <Link href='/filters-modal' asChild>
      <Pressable style={styles.container}>
        <Feather name='filter' size={24} />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 6,
  },
});

export default FiltersButton;
