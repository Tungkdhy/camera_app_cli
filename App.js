
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './src/navigation/MainContainer';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Wellcome from './src/screens/Login/Wellcome';
import Forgot from './src/screens/Forgot/Forgot';
import Register from './src/screens/Register/Register';
import ChangePassword from './src/screens/ChangePassWord/ChangePassword';
import Payment from './src/screens/Payment/Payment';
import CodeVerify from './src/components/CodeVerify/CodeVerify';
import Success from './src/components/CodeVerify/Success';
import Live from './src/screens/Stream/Live/Live';
import Detail from './src/screens/Info/Detail/Detail';
import Setting from './src/screens/Stream/Setting/Setting';
import { Store } from './src/redux/store';
import { Provider } from 'react-redux';
import PlayBack from './src/screens/Playback/Playback';
import Notification from './src/screens/Notification';

import EditInfo from './src/screens/Info/EditInfo/Edit';
import ChangePasswordInfo from './src/screens/Info/ChangePasswordInfo/ChangePasswordInfo';

// import MapScreen from './src/screens/Map/MapScreen';
// import requestUserPermission from './src/utils/FCM_helper';
// import { NotificationListener } from './src/utils/FCM_helper';
const Stack = createStackNavigator()
export default function App() {

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Wellcom' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Wellcom' component={Wellcome} />
          <Stack.Screen name="Home" component={MainContainer} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="CodeVerify" component={CodeVerify} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="Live" component={Live} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="PlayBack" component={PlayBack} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="ChangePasswordInfo" component={ChangePasswordInfo} />
          <Stack.Screen name="EditInfo" component={EditInfo} />
          <Stack.Screen name="Report" component={Payment} />

          {/* <Stack.Screen name="Map" component={MapScreen} /> */}

          {/* <Stack.Screen name="Stream" component={Stream}/> */}
          {/* <Stack.Screen name="Forgot" component={Forgot}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  auto: {

  }
});
