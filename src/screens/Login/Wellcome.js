import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Wellcome = ({ navigation }) => {
  async function getToken() {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    if (token) {
      if (role !== 'A') {
        navigation.navigate("Live");
      } else {
        navigation.navigate("Home");
      }
    } else {
      navigation.navigate('Login');
    }
  }
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/BgLogin.png")}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Hệ thống CameraAI</Text>
        <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

        <View style={styles.actions}>
          <TouchableHighlight
            onPress={() => getToken()}
            style={styles.touch}
          >
            <View style={styles.button}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    </ImageBackground>
  );
};

export default Wellcome;
