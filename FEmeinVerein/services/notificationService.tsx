import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    getNotificationToken();
  }
}

export async function getNotificationToken() {
  let fcmtoken = AsyncStorage.getItem("fcmtoken");
  console.log(fcmtoken);
  if (fcmtoken !== null) {
    try {
      let fcmtoken = await messaging().getToken();
      console.log(fcmtoken);
      if (fcmtoken) {
        await AsyncStorage.setItem("fcmtoken", fcmtoken);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("error inside fcmtoken");
  }
}

export const NotificationListener = () => {
  messaging().getInitialNotification().then[
    (remoteMessage) => {
      if (remoteMessage)
        console.log("Message initial: " + remoteMessage.notification);
    }
  ];

  messaging().onMessage(async (remoteMessage) => {
    console.log("notificiation on foreground state ..... " + remoteMessage);
  });
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log(
      "notificiation on foreground state OPENED..... " + remoteMessage
    );
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(
      "notificiation on foreground state BACKGROUND..... " + remoteMessage
    );
  });
};

export const sendPostMessage = () => {};
