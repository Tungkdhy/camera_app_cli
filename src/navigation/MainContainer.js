import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Stream from '../screens/Stream/Stream';
// import Map from '../screens/Map/MapScreen';
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
  UserIcon,
} from '../components/Icons/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeIcon, HomeIconActive } from '../components/Icons/BottomBar/HomeIcon';
import Dashboard from '../screens/Dashboard';
import UserIconUnActive from '../components/Icons/BottomBar/UserIconUnActive';
const Tab = createBottomTabNavigator();
const MainContainer = () => {
  const [role, setRole] = useState('A');
  useEffect(() => {
    const getRole = async () => {
      try {
        const roles = await AsyncStorage.getItem('role');
        setRole(roles);
      } catch (e) { }
    };
    getRole();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarActiveTintColor: 'red',
        tabBarActiveBackgroundColor: 'rgba(20, 30, 210, 0.05)',
        tabBarItemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.05)',
          // borderTopWidth: 1,
        },
        headerShown: false,
      }}>
        <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, focused }) => focused ? <HomeIconActive/>  : <HomeIcon />,
          tabBarShowLabel: false,
        }}
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
      {role === 'A' && (
        <Tab.Screen
          name="Trang chu"
          options={({ navigator }) => ({
            tabBarIcon: ({ color, focused }) =>
              focused ? <ChartIconActive /> : <ChartIcon />,
            tabBarShowLabel: false,
          })}
          component={Home}
        />
      )}
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ color, focused }) => focused ? <UserIcon /> : <UserIconUnActive />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainContainer;
