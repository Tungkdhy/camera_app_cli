import React, { useState } from "react";
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../services/axiosClient";
import { isValidatorEmail } from "../../utils";
import { BackIcon } from "../../components/Icons/Index";
import { styles } from "./style";

const Forgot = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axiosClient.post(
        "/authenticator/password-reset/require",
        { email: email }
      );
      const token = await axios.post(
        "http://42.96.41.91:10710/vinorsoft/aicamera/v1.0/authenticator/password-reset/get-token",
        {
          email: email,
        }
      );

      if (token.status === 200) {
        await AsyncStorage.setItem("token", token.data.token);
        navigation.navigate("CodeVerify", { name: "Forgot" });
      }
    } catch (e) {
      Alert.alert("Mã xác thực gửi về email của bạn");
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/BgLogin.png")}
    >
      {/* <KeyboardAvoidingView enabled={true} behavior="padding"> */}
        <View style={styles.contentLogin}>
          <View style={styles.title}>
            <TouchableHighlight
              onPress={() => navigation.navigate("Wellcom")}
              style={styles.icon}
            >
              <BackIcon />
            </TouchableHighlight>
            
          </View>
          <View style={styles.contentForm}>
            <View style={styles.formLogin}>
              <Text style={styles.header}>Quên mật khẩu</Text>
              <SafeAreaView>
                <Text style={styles.label}>Tên tài khoản</Text>
                <TextInput
                  onChangeText={(text) => setUserName(text)}
                  style={
                    userName.length < 6 && userName !== ""
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  value={userName}
                  placeholder="Nhập"
                />
                {userName.length < 6 && userName !== "" ? (
                  <Text style={styles.error}>Vui lòng nhập đủ 6 ký tự</Text>
                ) : (
                  <Text></Text>
                )}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={
                    email.length < 6 && email !== "" && isValidatorEmail(email)
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  placeholder="Nhập"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                {email !== "" && !isValidatorEmail(email) ? (
                  <Text style={styles.error}>Vui lòng nhập đúng email</Text>
                ) : (
                  <Text></Text>
                )}
              </SafeAreaView>
              <TouchableHighlight onPress={handleLogin} style={styles.login}>
                <View style={styles.buttonLogin}>
                  <Text style={styles.btnText}>Tiếp tục</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
export default Forgot;
