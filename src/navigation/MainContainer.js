import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayBack from "../screens/Playback/Playback";
import Home from "../screens/Home/Home";
import Payment from "../screens/Payment/Payment";
import Stream from "../screens/Stream/Stream";
import Map from "../screens/Map/Map";
import Info from "../screens/Info/Info";

import Login from "../screens/Login/Login";
// import { MapIcon } from "../components/Icons/Index";
import {
  ChartIcon,
  YoutubeIcon,
  MapIcon,
  PaymentIcon,
  CameraActiveIcon,
} from "../components/Icons/Index";
const Tab = createBottomTabNavigator();
const MainContainer = () => {
  return (
    
      <Tab.Navigator
        initialRouteName="Info"
        screenOptions={{
          tabBarActiveBackgroundColor: "#FFFFFF",
          tabBarActiveTintColor: "red",
          tabBarActiveBackgroundColor:"rgba(20, 30, 210, 0.05)",
          tabBarItemStyle: {
            borderColor: "rgba(0, 0, 0, 0.05)",
            borderTopWidth: 1,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Trang chu"
          options={({ navigator }) => ({
            tabBarIcon: ({ color,focused }) => focused ? <ChartIcon/>:<MapIcon/>,
            tabBarShowLabel: false,
          })}
          component={Home}
          
        />
        <Tab.Screen
          name="Stream"
          component={Stream}
          options={{
            tabBarIcon: ({ color }) => <CameraActiveIcon />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ color }) => <MapIcon />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Playback"
          component={Stream}
          options={{
            tabBarIcon: ({ color }) => <YoutubeIcon />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Payment"
          component={Payment}
          options={{
            tabBarIcon: ({ color }) => <PaymentIcon />,
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
  )
};

export default MainContainer;
