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
  Button,
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
  ErrorIcon,
} from '../../components/Icons/Index';
// import { StackActions, NavigationActions } from 'react-navigation';
import { StackActions, NavigationAction } from '@react-navigation/native';

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
  const [error2, setError2] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isChange, setIsChange] = useState(false);
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
          await AsyncStorage.setItem('refresh', res.data.refresh);
          const infoUser = await axiosClient.get('/user/get-user-info/');
          let userTypeCode = infoUser[0]?.USERTYPE_CODE;
          dispatch(setUserTypeCode(userTypeCode));
          setError2(false);
          setModalSuccess(true);
        }
      } catch (e) {
        console.log(e);
        setError2(true);

        setModalSuccess(true);
      }
    } else {
      setModalSuccess(true);
      setError(true);
    }
  };
  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
  useEffect(() => {
    if (modalSuccess) {
      const countNavigate = setTimeout(() => {
        if (!error2) {
          setModalSuccess(false);
          const resetAction = StackActions.replace('Home');
          navigation.dispatch(resetAction);
        }
      }, 1000);
      return () => clearTimeout(countNavigate);
    }
  }, [modalSuccess]);
  return (
    <TouchableWithoutFeedback onPress={() => {
      // setIsChange(!isChange)
      Keyboard.dismiss()
    }}
    >
      <View
        style={styles.container}
      >
        <KeyboardAvoidingView enabled={true} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.contentLogin}>
            <View style={styles.contentForm}>
              <Image style={styles.imageBg} source={require('../../assets/images/Background_login.png')} />
              <View style={styles.formLogin}>
                {!isChange && (
                  <>
                    <Image style={styles.logo} source={require('../../assets/images/Logo_app.png')} />
                    <Text style={styles.text_header}>Hệ thống Camera AI</Text>
                    <Text style={styles.text_desc}>Giải pháp số hóa công nghệ 4.0</Text>
                  </>
                )}
                <View>
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
                </View>
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
                <View style={{ ...styles.textHeader, ...styles.iconHeader }}>
                  {error2 ? <ErrorIcon /> : <SuccessIcon />}
                </View>
                <Text style={styles.textHeader}>
                  {error2
                    ? 'Đăng nhập không thành công'
                    : 'Đăng nhập thành công'}
                </Text>
                {error2 && (
                  <>
                    <Text style={styles.text_desc_modal}>
                      {error && !isValidatePassword(password) ? (
                        <>
                          {/* <Text style={styles.error_password}> */}
                          Mật khẩu 6-20 ký tự. Ít nhất 1 ký tự viết hoa, 1 ký tự
                          viết thường, 1 ký tự đặc biệt, 1 ký tự số, không chứa
                          khoảng trắng.
                          {/* </Text> */}
                        </>
                      ) : !isValidatorUsername(userName) ? (
                        <Text>
                          Tên người dùng dài từ 6 - 15 ký tự. Chỉ chứa các ký tự
                          viết thường và số.
                        </Text>
                      ) : <>
                        <Text>
                          Không tìm thấy tài khoản
                        </Text></>}
                    </Text>
                    <View style={styles.footer}>
                      <Pressable style={styles.button_footer}>
                        <TouchableHighlight
                          onPress={() => setModalSuccess(!modalSuccess)}
                          style={styles.login}>
                          <View style={styles.button_footer_item}>
                            <Text style={styles.btnText}>Huỷ bỏ</Text>
                          </View>
                        </TouchableHighlight>
                      </Pressable>
                      <Pressable style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'red' : 'white',
                        },
                        styles.button_footer,
                      ]}>
                        <TouchableHighlight
                          onPress={() => setModalSuccess(!modalSuccess)}
                          style={styles.login}>
                          <View style={styles.button_footer_item}>
                            <Text style={{ ...styles.btnText, ...styles.primary }}>Đồng ý</Text>
                          </View>
                        </TouchableHighlight>
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback >
    // </KeyboardAvoidingView>
  );
};
export default Login;
