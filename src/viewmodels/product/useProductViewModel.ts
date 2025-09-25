import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventReminderModule from 'event-reminder';
import { Product } from '@/models/product.model';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Alert } from 'react-native';

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

    const handleSetReminder = async (productTitle: string) => {
    try {
      const permissionGranted = await EventReminderModule.requestCalendarPermission();
      
      if (permissionGranted) {
        const result = await EventReminderModule.addProductReminder(productTitle);
        Alert.alert('Success', result.message);
      } else {
        Alert.alert(
          'Permission Denied',
          'Calendar access is required to set reminders. Please enable it in your device settings.'
        );
      }
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to set reminder');
    }
  };

  return {
    product,
    handleSetReminder,
    isLoading,
    error,
  };
};

export default useProductViewModel;
