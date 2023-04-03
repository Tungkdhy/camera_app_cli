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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
} from "../../components/Icons/Index";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(true);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://42.96.41.91:10710/vinorsoft/aicamera/v1.0/authenticator/login/",
        {
          username: userName,
          password: password,
        }
      );
      if (res) {
        Alert.alert("Đăng nhập thành công" + res.data.access);
        await AsyncStorage.setItem("token",res.data.access)
        navigation.navigate("Home");
      }
    } catch (e) {
      Alert.alert("Đăng nhập không thành công");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/images/BgLogin.png")}
      >
        <KeyboardAvoidingView enabled={true} behavior="padding">
          <View style={styles.contentLogin}>
            <View style={styles.title}>
              <TouchableHighlight
                onPress={() => navigation.navigate("Wellcom")}
                style={styles.icon}
              >
                <BackIcon />
              </TouchableHighlight>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </View>
            <View style={styles.contentForm}>
              <View style={styles.register}>
                <Text>Bạn chưa có tài khoản ? </Text>
                <Text
                  onPress={() => navigation.navigate("Register")}
                  style={styles.re}
                >
                  Đăng ký
                </Text>
              </View>
              <View style={styles.formLogin}>
                <View style={styles.logo}>
                  <Logo />
                </View>
                <SafeAreaView>
                  <View style={styles.userIcon}>
                    <UserIcon />
                  </View>
                  <TextInput
                    onChangeText={(text) => setUserName(text)}
                    style={
                      userName.length < 6 && userName !== ""
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={userName}
                    placeholder="Tên đăng nhập"
                  />
                  {userName.length < 6 && userName !== "" && (
                    <Text style={styles.error}>Vui lòng nhập đủ 6 ký tự</Text>
                  )}
                  <View style={styles.lockIcon}>
                    <LockIcon />
                  </View>
                  <Text
                    onPress={() => setIsShowPass(!isShowPass)}
                    style={styles.eyeIcon}
                  >
                    <EyeIcon />
                  </Text>
                  <TextInput
                    style={
                      password.length < 6 && password !== ""
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Mật khẩu"
                    secureTextEntry={isShowPass}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  {password.length < 6 && password !== "" && (
                    <Text style={styles.error_password}>
                      Mật khẩu tối thiểu có 6 ký tự
                    </Text>
                  )}
                </SafeAreaView>
                <TouchableHighlight onPress={handleLogin} style={styles.login}>
                  <View style={styles.buttonLogin}>
                    <Text style={styles.btnText}>Đăng nhập</Text>
                  </View>
                </TouchableHighlight>
                <Text
                  onPress={() => navigation.navigate("Forgot")}
                  style={styles.forgot}
                >
                  Quên mật khẩu
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
export default Login;
