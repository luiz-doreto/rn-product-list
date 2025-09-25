import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/models/product.model';
import { useLocalSearchParams, useNavigation } from 'expo-router';

const useProductViewModel = () => {
  const { id, title } = useLocalSearchParams<{ id: string; title?: string }>();
  const navigation = useNavigation();

  const fetchProduct = async (): Promise<Product> => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: fetchProduct,
    enabled: !!id,
  });

  useEffect(() => {
    if (product && product.title !== title) {
      navigation.setOptions({
        title: product.title,
      });
    }
  }, [product, title, navigation]);

  return {
    product,
    isLoading,
    error,
  };
};

export default useProductViewModel;
