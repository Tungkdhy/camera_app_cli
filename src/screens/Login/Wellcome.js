import React from "react";
import {
  View,
  ImageBackground,
  Text,
  Button,
  TouchableHighlight,
} from "react-native";
import { styles } from "./styles";

const Wellcome = ({ navigation }) => {
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
            onPress={() => navigation.navigate("Login")}
            style={styles.touch}
          >
            <View style={styles.button}>
              <Text style={styles.btnText}>Đăng nhập</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.touch}>
            <View style={styles.buttonRegister}>
              <Text onPress={()=>navigation.navigate("Register")} style={styles.btnText}>Đăng ký</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Wellcome;
