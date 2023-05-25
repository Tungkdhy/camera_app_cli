import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export default async function requestUserPermission() {
 console.log("tung");
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await GetFCMToken()
  }
}
async function GetFCMToken(){
    let fcmToken = await AsyncStorage.getItem("fcmToken")
    console.log(fcmToken);
    if(!fcmToken){
        try{
            const token = await messaging().getToken()
            if(token){
                console.log(token);
                await AsyncStorage.setItem("fcmToken",token)
            }
        }
   
    catch(e){
        console.log(e);
    }
    }
}
export const NotificationListener = ()=>{
    messaging().onNotificationOpenedApp(remoteMessage=>{
        console.log("Tung");
    })
    messaging().getInitialNotification().then(removeMessage=>{
        if(removeMessage){
            console.log(removeMessage.notification);
        }
    })
    messaging().onMessage(async message=>{
        console.log("Oke",message);
    })
}