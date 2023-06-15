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
  Pressable,
} from "react-native";
import {
  BackIcon,
  EyeIcon,
  UnEyeIcon,
} from "../../components/Icons/Index";
import { isValidateConfirm, isValidatePassword } from "../../utils";
import { styles } from "./style";
import { authenticatorAPI } from "../../services/api/authenticator";
import CheckIcon from "../../components/Icons/Info/CheckIcon";

const ChangePassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(true);
  const [submit, setSubmit] = useState(false);
  const handleLogin = async () => {
    try {
      setSubmit(true)
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
      if (e.response.status === 400) {
        if (e.response.data.password[0] === 'The password is too similar to the email.') {
          Alert.alert("Đổi mật khẩu không thành công, mật khẩu quá giống với email.");
        } if (e.response.data.password[0] === "The password is too similar to the username.") {
          Alert.alert("Đổi mật khẩu không thành công, mật khẩu quá giống với tên đăng nhập.");
        }
      } else if (e.response.status === 404) {
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
            onPress={() => navigation.navigate("Login")}
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
                  onChangeText={(text) => {
                    setPassword(text);
                    setSubmit(false);
                  }}
                  style={
                    submit &&
                      !isValidatePassword(password)
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  value={password}
                  placeholder="Nhập"
                  secureTextEntry={isShowPass}
                />
                <Pressable style={styles.eyeIcon} onPress={() => setIsShowPass(!isShowPass)}>
                  {!isShowPass ? <UnEyeIcon /> : <EyeIcon />}
                </Pressable>
              </View>
              <Text style={!(submit && !isValidatePassword(password)) ? { ...styles.validate } : { ...styles.error }}>
                Mật khẩu dài 6 - 20 ký tự có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 ký tự đặc biệt, không chứa dấu cách hoặc ký tự có dấu.
              </Text>
              <Text style={styles.label}>Nhập lại mật khẩu</Text>
              <View style={styles.contain}>
                <TextInput
                  style={
                    !isValidateConfirm(password, newPassword) && submit
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  placeholder="Nhập"
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    setSubmit(false);
                  }}
                  secureTextEntry={isShowPass}
                />
                <Pressable style={styles.eyeIcon} onPress={() => setIsShowPass(!isShowPass)}>
                  {!isShowPass ? <UnEyeIcon /> : <EyeIcon />}
                  {newPassword.length > 0 && isValidateConfirm(newPassword, password) && <Text style={styles.checkIcon}>
                    <CheckIcon />
                  </Text>}
                </Pressable>
              </View>
              {
                !isValidateConfirm(password, newPassword) && submit ? (
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