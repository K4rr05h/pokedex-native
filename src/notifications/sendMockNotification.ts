import * as Notifications from 'expo-notifications';

export async function sendMockNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🔥 Notificação Mock!',
      body: 'Isso é apenas um teste local.',
    },
    trigger: null,
  });
}
