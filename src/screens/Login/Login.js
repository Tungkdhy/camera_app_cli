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
  Modal,
} from 'react-native';
import axios from 'axios';
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  UnEyeIcon,
  SuccessIcon,
} from '../../components/Icons/Index';
// import messaging from '@react-native-firebase/messaging';
import { styles } from './styles';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { useDispatch } from 'react-redux';
import { setUserTypeCode } from '../../redux/actions/getUserAction';
import { isValidatePassword, isValidatorUsername } from '../../utils';

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleLogin = async () => {
    if (isValidatorUsername(userName) && isValidatePassword(password)) {
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
          setModalSuccess(true);
        }
      } catch (e) {
        console.log(e);
        Alert.alert('Đăng nhập không thành công');
      }
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
  useEffect(() => {
    if (modalSuccess) {
      const countNavigate = setTimeout(() => {
        setModalSuccess(false);
        navigation.navigate('Home');
      }, 1000);
      return () => clearTimeout(countNavigate);
    }
  }, [modalSuccess]);
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
                  <View style={styles.formInput}>
                    <View style={styles.userIcon}>
                      <UserIcon />
                    </View>
                    <TextInput
                      placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                      onChangeText={text => {
                        setUserName(text);
                        setError(false);
                      }}
                      style={
                        (userName.length < 6 && userName !== '') ||
                          (error && userName.length === 0)
                          ? { ...styles.input, ...styles.borderError }
                          : styles.input
                      }
                      value={userName}
                      placeholder="Tên đăng nhập"
                    />
                    {error && !isValidatorUsername(userName) && (
                      <Text style={styles.error}>
                        Tên người dùng dài từ 6 - 15 ký tự. Chỉ chứa các ký tự
                        viết thường và số.
                      </Text>
                    )}
                  </View>
                  <View style={styles.formInput}>
                    <View style={styles.lockIcon}>
                      <LockIcon />
                    </View>
                    <Pressable
                      onPress={() => setIsShowPass(!isShowPass)}
                      style={styles.eyeIcon}>
                      {isShowPass ? <EyeIcon /> : <UnEyeIcon />}
                    </Pressable>
                    <TextInput
                      placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                      style={
                        (password.length < 8 && password !== '') ||
                          (error && password.length === 0)
                          ? { ...styles.input, ...styles.borderError }
                          : styles.input
                      }
                      placeholder="Mật khẩu"
                      secureTextEntry={isShowPass}
                      value={password}
                      onChangeText={text => {
                        setError(false);
                        setPassword(text);
                      }}
                    
                    />
                    {error && !isValidatePassword(password) && (
                      <Text style={styles.error_password}>
                        Mật khẩu 6-20 ký tự. Ít nhất 1 ký tự viết hoa, 1 ký tự
                        viết thường, 1 ký tự đặc biệt, 1 ký tự số, không chứa
                        khoảng trắng.
                      </Text>
                    )}
                  </View>
                  <TouchableHighlight
                    onPress={handleLogin}
                    style={styles.login}>
                    <View style={styles.buttonLogin}>
                      <Text style={styles.btnText}>Đăng nhập</Text>
                    </View>
                  </TouchableHighlight>
                  <Text
                    onPress={() => navigation.navigate('Forgot')}
                    style={styles.forgot}>
                    Quên mật khẩu
                  </Text>
                </SafeAreaView>
              </View>
            </View>
          </View>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalSuccess}
            style={styles.modal}>
            <View style={styles.mainView}>
              <View style={styles.headerModal}>
                <Text style={styles.textHeader}>Đăng nhập thành công</Text>
                <View style={styles.textHeader}>
                  <SuccessIcon />
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};
export default Login;
