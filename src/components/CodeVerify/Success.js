import React, { useState, useRef } from "react";
import { View, TouchableHighlight, ImageBackground, Text } from "react-native";
import { BackIcon, SuccessIcon } from "../Icons/Index";
import axios from "axios";
import { styles } from "./style";

const Success = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/BgLogin.png")}
    >
      <View style={styles.contentLogin}>
        <View style={styles.title}>
          <TouchableHighlight
            onPress={() => navigation.navigate("Login")}
            style={styles.icon}
          >
            <BackIcon />
          </TouchableHighlight>
        </View>
        <View style={styles.contentForm}>
          <View style={styles.formLogin}>
            <View style={styles.iconSuccess}>
              <SuccessIcon />
            </View>
            <Text style={styles.titleSuccess}>Đổi mật khẩu thành công</Text>
            <Text style={styles.descriptionSuccess}>
                Đăng nhập để tiếp tục sử dụng
            </Text>
            <TouchableHighlight onPress={handleLogin} style={styles.login}>
              <View style={styles.buttonLogin}>
                <Text style={styles.btnText}>Xác nhận</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Success;
