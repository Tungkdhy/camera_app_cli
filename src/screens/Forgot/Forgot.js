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
  ActivityIndicator,
} from "react-native";
import { isValidatorEmail } from "../../utils";
import { BackIcon } from "../../components/Icons/Index";
import { styles } from "./style";
import { authenticatorAPI } from "../../services/api/authenticator";
import { useDispatch } from "react-redux";
import { setEmailUser } from "../../redux/actions/getUserAction";

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true)
    try {
      let data = {
        email: email
      }
      await authenticatorAPI.forgotPassRequire(data);
      navigation.navigate("CodeVerify", { name: "Forgot" });
      setLoading(false)
      dispatch(setEmailUser(data.email));
    } catch (e) {
      console.log(e);
      setLoading(false)
      Alert.alert("Mã xác thực gửi về email của bạn");
    }
  };
  const onPrevious = () => {
    navigation.navigate('Wellcom')
  }
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
          style={styles.box_view}
        >
          <View style={styles.title}>
            <TouchableHighlight
              onPress={onPrevious}
              style={styles.icon}
            >
              <BackIcon />
            </TouchableHighlight>

          </View>
          <View style={styles.contentForm}>
            <View style={styles.formLogin}>
              <Text style={styles.header}>Quên mật khẩu</Text>
              <SafeAreaView>
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
        {loading && (
          <View style={styles.behavior}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        </Modal>
      </View>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
export default Forgot;
