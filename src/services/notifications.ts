import * as Notifications from 'expo-notifications';

interface NotificationOptions {
  title: string;
  body: string;
  data?: Record<string, any>;
  seconds?: number;
}

// Configure how notifications are presented when the app is in the foreground
export const initNotificationService = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

// Schedule a notification
export const scheduleNotification = async ({title, body, data, seconds}: NotificationOptions) => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: seconds || 0,
      },
    });
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};
