import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useSystemAPI } from '../api/system';

export function HomePage() {
  const systemAPI = useSystemAPI();
  if ('Notification' in window) {
    window.Notification.requestPermission()
      .then(() => {
        const messaging = getMessaging();

        onMessage(messaging, (payload) => {
          console.log(payload.notification?.title);
        });

        return getToken(messaging, {
          vapidKey: 'BLguINrNTm3cFPY2wtx-7YaY1Y9_YDL6oxoxGn4BcDZm5EcnpsoXcnPAbnCc3kAuAvTpE1J1SQ__fxgG4SzsiJE',
        });
      })
      .then((token) => {
        console.log(token);
        return systemAPI.registrToken(token);
      })
      .then(() => {
        console.log('token registered');
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button>Home Page</button>
    </>
  );
}
