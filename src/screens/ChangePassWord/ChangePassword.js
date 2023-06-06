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
import axios from "axios";
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
} from "../../components/Icons/Index";
import { isValidatePassword } from "../../utils";
import { styles } from "./style";
import { authenticatorAPI } from "../../services/api/authenticator";

const ChangePassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(true);
  const handleLogin = async () => {
    try {
      if (password === newPassword) {
        const token = route.params?.token ? route.params?.token : null;
        let data = {
          password: password,
          token: token.token,
        }
        await authenticatorAPI.passwordResetConfirm(data);
        navigation.navigate("Success");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Đổi mật khẩu không thành công");
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/BgLogin.png")}
    >
      <View style={styles.contentLogin}>
        <Modal
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={() => {
            return 0
          }}
        >
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
                  secureTextEntry={true}
                />
                <Text style={styles.validate}>
                  Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường và
                  cả những kí tự đặc biệt
                </Text>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <TextInput
                  style={
                    newPassword.length < 6 &&
                      newPassword !== "" &&
                      !isValidatePassword(newPassword)
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  placeholder="Nhập"
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  secureTextEntry={true}
                />
                {newPassword.length < 6 &&
                  newPassword !== "" &&
                  !isValidatePassword(newPassword) ? (
                  <Text style={styles.error}>Vui lòng nhập đúng định dạng</Text>
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

        </Modal>
      </View>
    </ImageBackground>
  );
};
export default ChangePassword;
