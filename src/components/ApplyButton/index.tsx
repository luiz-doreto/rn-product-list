import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useFiltersStore from '@/store/useFiltersStore';

const ApplyButton = () => {
  const router = useRouter();
  const { applyFilters } = useFiltersStore();

  const handleApply = () => {
    applyFilters();
    router.back();
  };

  return (
    <Pressable onPress={handleApply}>
      <Text style={styles.buttonText}>Apply</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
    padding: 8,
  },
});

export default ApplyButton;
