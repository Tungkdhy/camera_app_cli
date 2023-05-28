import React, { useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../services/axiosClient";
import { setUserTypeCode } from "../../redux/actions/getUserAction";
import { useDispatch } from "react-redux";

const Wellcome = ({ navigation }) => {
  const dispatch = useDispatch()
  async function getToken() {
    const res = await AsyncStorage.getItem('remember');
    if (res === 'true') {
      try {
        const infoUser = await axiosClient.get('/user/get-user-info/');
        let userTypeCode = infoUser[0].USERTYPE_CODE;
        dispatch(setUserTypeCode(userTypeCode));
        if (userTypeCode !== '300920220005') {
          navigation.navigate("Live");
        } else {
          navigation.navigate("Home");
        }
      } catch (error) {
        Alert.alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        navigation.navigate('Login');
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
