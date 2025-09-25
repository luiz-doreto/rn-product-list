import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useFiltersStore from '@/store/useFiltersStore';
import { colors } from '@/constants/colors';

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
    color: colors.primary,
    fontSize: 16,
    padding: 8,
  },
});

export default ApplyButton;
