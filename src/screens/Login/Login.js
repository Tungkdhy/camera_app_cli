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
  Image,
} from 'react-native';
import axios from 'axios';
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
} from '../../components/Icons/Index';
// import messaging from '@react-native-firebase/messaging';
import { styles } from './styles';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { useDispatch } from 'react-redux';
import { setUserTypeCode } from '../../redux/actions/getUserAction';
import { isValidatorUsername } from '../../utils';

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const dispatch = useDispatch();
  const [error, setErrpr] = useState(false)
  
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
        await AsyncStorage.setItem('token', res.data.access);
        await AsyncStorage.setItem('role', res.data.role);
        const infoUser = await axiosClient.get('/user/get-user-info/');
        let userTypeCode = infoUser[0]?.USERTYPE_CODE;
        dispatch(setUserTypeCode(userTypeCode));
        navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Đăng nhập không thành công');
    }
  };
  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
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
                    onChangeText={text => {
                      setUserName(text)
                      setErrpr(false)
                    }}
                    style={
                      ((userName.length < 6 && userName !== '') || (error && userName.length === 0))
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={userName}
                    placeholder="Tên đăng nhập"
                  />
                  {(userName.split(" ").length === 1 && userName.length > 0) ? (userName.length < 6 && userName !== '' ? (
                    <Text style={styles.error}>Vui lòng nhập đủ 6 ký tự</Text>
                  ) : (error && userName.length === 0) ? <Text style={styles.error}>Tên đăng nhập không được để trống</Text> : "") : (userName.length > 0 && <Text style={styles.error}>Tên đăng nhập không được chứa khoảng trắng</Text>)}
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
                      ((password.length < 8 && password !== '') || (error && password.length === 0))
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Mật khẩu"
                    secureTextEntry={isShowPass}
                    value={password}
                    onChangeText={text => {
                      setErrpr(false)
                      setPassword(text)
                    }}
                  />
                  {(password.split(" ").length === 1 && password.length > 0) ? (password.length < 8 && password !== '' ? (
                    <Text style={styles.error_password}>
                      Mật khẩu tối thiểu có 8 ký tự
                    </Text>
                  ) : (error && password.length === 0) ? <Text style={styles.error_password}>Mật khẩu không được để trống</Text> : "") : (password.length > 0 && <Text style={styles.error_password}>Mật khẩu không được chứa khoảng trắng</Text>)}
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
