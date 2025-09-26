import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useQuery } from '@tanstack/react-query';
import EventReminderModule from 'event-reminder';
import { Product } from '@/models/product.model';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Alert } from 'react-native';
import { scheduleNotification } from '@/services/notifications';

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

  const handleScheduleNotification = async (productTitle: string, productId: number) => {
    try {
      await Notifications.requestPermissionsAsync();
      await scheduleNotification({
        title: 'Product Reminder',
        body: `Reminder for: ${productTitle}`,
        data: { productId: productId.toString() },
        seconds: 15,
      });
      Alert.alert('Success', 'Notification with deep linking scheduled successfully (15 seconds)');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to schedule notification');
    }
  };

  return {
    product,
    handleSetReminder,
    handleScheduleNotification,
    isLoading,
    error,
  };
};

export default useProductViewModel;
