import React, { useState } from "react";
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  Modal,
} from "react-native";
import {
  BackIcon,
  EyeIcon,
} from "../../components/Icons/Index";
import { isValidateConfirm, isValidatePassword } from "../../utils";
import { styles } from "./style";
import { authenticatorAPI } from "../../services/api/authenticator";

const ChangePassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(true);
  const handleLogin = async () => {
    try {
      if (isValidatePassword(password) && isValidateConfirm(password, newPassword)) {
        const token = route.params?.token ? route.params?.token : null;
        let data = {
          password: password,
          token: token.token,
        }
        await authenticatorAPI.passwordResetConfirm(data);
        navigation.navigate("Success");
      }
    } catch (e) {
      if(e.response.status === 400) {
        if(e.response.data.password[0] === 'The password is too similar to the email.') {
          Alert.alert("Đổi mật khẩu không thành công, mật khẩu quá giống với email.");
        } if (e.response.data.password[0] === "The password is too similar to the username.") {
          Alert.alert("Đổi mật khẩu không thành công, mật khẩu quá giống với tên đăng nhập.");
        }
      } else if(e.response.status === 404) {
        Alert.alert("Mã xác thực của bạn đã hết hạn");
      } else {
        Alert.alert("Đổi mật khẩu không thành công");
      }
      console.log(e.response.status);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/BgLogin.png")}
    >
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
              <Text style={styles.header}>Đổi mật khẩu</Text>
              <SafeAreaView>
                <Text style={styles.label}>Mật khẩu</Text>
                <View style={styles.contain}>
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    style={
                      password !== "" &&
                        !isValidatePassword(password)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={password}
                    placeholder="Nhập"
                    secureTextEntry={isShowPass}
                  />
                  <Text style={styles.eyeIcon} onPress={() => setIsShowPass(!isShowPass)}>
                    <EyeIcon />
                  </Text>
                </View>
                <Text style={styles.validate}>
                  Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường và
                  cả những kí tự đặc biệt
                </Text>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <View style={styles.contain}>
                  <TextInput
                    style={
                        !isValidateConfirm(password, newPassword) && newPassword.length > 0
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Nhập"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry={isShowPass}
                  />
                  <Text style={styles.eyeIcon} onPress={() => setIsShowPass(!isShowPass)}>
                    <EyeIcon />
                  </Text>
                </View>
                {
                  !isValidateConfirm(password, newPassword) && newPassword.length > 0 ? (
                  <Text style={styles.error}>Mật khẩu nhập lại không giống</Text>
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
    </ImageBackground>
  );
};
export default ChangePassword;