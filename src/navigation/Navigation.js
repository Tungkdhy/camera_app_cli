import React from "react";
import { View, Text } from "react-native";
import {
  ChartIcon,
  MapIcon,
  CameraActiveIcon,
  PaymentIcon,
  YoutubeIcon,
} from "../components/Icons/Index";
import { styles } from "./styles";
const Navigation = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.item, ...styles.active }}>
        <Text onPress={()=>navigation.navigate("Login")}>
          <ChartIcon />
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <CameraActiveIcon />
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <MapIcon />
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <YoutubeIcon />
        </Text>
      </View>
      <View style={styles.item}>
        <Text>
          <PaymentIcon />
        </Text>
      </View>
    </View>
  );
};

export default Navigation;
