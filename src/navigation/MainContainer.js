import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Stream from '../screens/Stream/Stream';
import Map from '../screens/Map/MapScreen';
import Info from '../screens/Info/Info';
// import { MapIcon } from "../components/Icons/Index";
import {
  ChartIcon,
  YoutubeIcon,
  MapIcon,
  PaymentIcon,
  CameraActiveIcon,
  CameraIcon,
  MapIconActive,
  SmartIcon,
  ChartIconActive,
  YoutubeIconActive,
} from '../components/Icons/Index';
const Tab = createBottomTabNavigator();
const MainContainer = () => {
  return (
    <Tab.Navigator
      // initialRouteName="Info"
      screenOptions={{
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: 'rgba(20, 30, 210, 0.05)',
        tabBarItemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.05)',
          borderTopWidth: 1,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Trang chu"
        options={({ navigator }) => ({
          tabBarIcon: ({ color, focused }) =>
            focused ? <ChartIconActive /> : <ChartIcon />,
          tabBarShowLabel: false,
        })}
        component={Home}
      />
      <Tab.Screen
        name="Stream"
        component={Stream}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <CameraActiveIcon /> : <CameraIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <MapIconActive /> : <MapIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Playback"
        component={Stream}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <YoutubeIconActive /> : <YoutubeIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Smart"
        component={Stream}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? <SmartIcon /> : <PaymentIcon />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ color }) => <PaymentIcon />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
