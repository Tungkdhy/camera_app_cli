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
  TouchableOpacity,
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
import { isValidatePassword } from '../../utils';
import HeaderLogin from './HeaderLogin';

const LoginFirst = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const handleLogin = async () => {
    let useName = await AsyncStorage.getItem('userName');
    let taxCode = await AsyncStorage.getItem('companyCode');
    if (isValidatePassword(password)) {
      try {
        const res = await axios.post(
          'http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/login/',
          {
            tax_code: taxCode,
            username: useName,
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
          const resetAction = StackActions.replace('Home');
          navigation.dispatch(resetAction);
        }
      } catch (e) {
        console.log(e);
        setError2(true);
        setModalSuccess(true);
      }
    } else {
      setModalSuccess(true);
      setError2(true);
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
        }
      }, 1000);
      return () => clearTimeout(countNavigate);
    }
  }, [modalSuccess]);

  const handleLogout = async () => {
    navigation.navigate('Login');
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
          await AsyncStorage.clear();
        }
        if (Platform.OS === 'ios') {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }
    } catch (e) {
      console.log('Error');
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.contentLogin}>
          <View style={styles.contentForm}>
            <Image
              style={styles.imageBg}
              source={require('../../assets/images/Background_login.png')}
            />
            <View style={styles.formLogin}>
              <HeaderLogin />
              <View>
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
                <Text
                  onPress={handleLogout}
                  style={{ ...styles.forgot, ...styles.other_account }}>
                  Đăng nhập bằng tài khoản khác
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
                {error2 ? 'Đăng nhập không thành công' : 'Đăng nhập thành công'}
              </Text>
              {error2 && (
                <>
                  <Text style={styles.text_desc_modal}>
                    {error2 && !isValidatePassword(password) ? (
                      <>Sai thông tin đăng nhập</>
                    ) : (
                      <>
                        <Text>Sai thông tin đăng nhập</Text>
                      </>
                    )}
                  </Text>
                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={() => setModalSuccess(!modalSuccess)}
                      style={styles.login_item}>
                      <View style={styles.button_footer_item}>
                        <Text style={styles.btnText}>Huỷ bỏ</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setModalSuccess(!modalSuccess)}
                      style={styles.login_item}>
                      <View style={styles.button_footer_item}>
                        <Text style={{ ...styles.btnText, ...styles.primary }}>
                          Đồng ý
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginFirst;
