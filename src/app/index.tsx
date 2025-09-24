import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import useHomeViewModel from '@/viewmodels/home/useHomeViewModel';
import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import { Product } from '@/models/product.model';
import ProductCard from '@/components/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { products, fetchMore, hasMore, isFetchingMore, error } =
    useHomeViewModel();

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );
  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <StatusBar style='auto' />
      {error && <Text>Error: {error.message}</Text>}
      <FlashList
        contentContainerStyle={styles.listContainer}
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={hasMore ? fetchMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingMore ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
});
