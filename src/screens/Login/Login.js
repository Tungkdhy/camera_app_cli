import React, { useState, useEffect } from 'react';
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
  Pressable,
} from 'react-native';
import axios from 'axios';
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  Radio,
  RadioCheck,
} from '../../components/Icons/Index';
// import messaging from '@react-native-firebase/messaging';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { useDispatch } from 'react-redux';
import { setUserTypeCode } from '../../redux/actions/getUserAction';

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const [data, setData] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/login/',
        {
          username: userName,
          password: password,
        },
      );
      if (res) {
        Alert.alert('Đăng nhập thành công');
        await AsyncStorage.setItem('token', res.data.access);
        await AsyncStorage.setItem('remember', `${rememberMe}`);
        await AsyncStorage.setItem('role', res.data.role);
        const infoUser = await axiosClient.get('/user/get-user-info/');
        let userTypeCode = infoUser[0].USERTYPE_CODE;
        dispatch(setUserTypeCode(userTypeCode));

        navigation.navigate('Home');

      }
    } catch (e) {
      Alert.alert('Đăng nhập không thành công');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/BgLogin.png')}>
        <KeyboardAvoidingView enabled={true} behavior="padding">
          <View style={styles.contentLogin}>
            <View style={styles.title}>
              <TouchableHighlight
                onPress={() => navigation.navigate('Wellcom')}
                style={styles.icon}>
                <BackIcon />
              </TouchableHighlight>
              <Text style={styles.textLogin}>Đăng nhập</Text>
            </View>
            <View style={styles.contentForm}>
              <View style={styles.formLogin}>
                <View style={styles.logo}>
                  <Logo />
                </View>
                <SafeAreaView>
                  <View style={styles.userIcon}>
                    <UserIcon />
                  </View>
                  <TextInput
                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                    onChangeText={text => setUserName(text)}
                    style={
                      userName.length < 6 && userName !== ''
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={userName}
                    placeholder="Tên đăng nhập"
                  />
                  {userName.length < 6 && userName !== '' && (
                    <Text style={styles.error}>Vui lòng nhập đủ 6 ký tự</Text>
                  )}
                  <View style={styles.lockIcon}>
                    <LockIcon />
                  </View>
                  <Text
                    onPress={() => setIsShowPass(!isShowPass)}
                    style={styles.eyeIcon}>
                    <EyeIcon />
                  </Text>
                  <TextInput
                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                    style={
                      password.length < 6 && password !== ''
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Mật khẩu"
                    secureTextEntry={isShowPass}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                  {password.length < 6 && password !== '' && (
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
                  onPress={() => navigation.navigate('Forgot')}
                  style={styles.forgot}>
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
