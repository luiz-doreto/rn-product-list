import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

const useNotificationObserver = () => {
    const router = useRouter();
  useEffect(() => {
    function redirect(notification: Notifications.Notification) {
      const productId = notification.request.content.data?.productId;
      if (typeof productId === 'string') {
        router.push(`/product/${productId}`);
      }
    }

    const response = Notifications.getLastNotificationResponse();
    if (response?.notification) {
      redirect(response.notification);
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      redirect(response.notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

export default useNotificationObserver;
