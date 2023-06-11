import React, { useState, useRef } from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import { BackIcon } from '../Icons/Index';
import axios from 'axios';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { Modal } from 'react-native';
import { authenticatorAPI } from '../../services/api/authenticator';
import Clock from './Clock';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';

const CodeVerify = ({ route, navigation }) => {
  const inputFirst = useRef();
  const inputS = useRef();
  const inputT = useRef();
  const inputF = useRef();
  const inputFive = useRef();
  const inputSix = useRef();
  const [otp, setOtp] = useState({
    op1: '',
    op2: '',
    op3: '',
    op4: '',
    op5: '',
    op6: '',
  });
  const [reGetOTP, setReGetOTP] = useState(false);
  const [reFresh, setReFresh] = useState(false);
  const { email } = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (route.params?.name === 'Forgot') {
        const token = await AsyncStorage.getItem('token');
        const res = await axiosClient.post(
          '/authenticator/password-reset/validate-token',
          {
            token: otp.op1 + otp.op2 + otp.op3 + otp.op4 + otp.op5 + otp.op6,
          },
        );
        if (res) {
          navigation.navigate('ChangePassword');
        }
      } else {
        const token = await AsyncStorage.getItem('token');
        const res = await axiosClient.post('/authenticator/verifyAccount/', {
          code: otp.op1 + otp.op2 + otp.op3 + otp.op4 + otp.op5 + otp.op6,
          token,
        });
        if (res) {
          navigation.navigate('Success');
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert('Xác thực không thành công');
    }
  };

  const onReGetOTP = data => {
    setReGetOTP(data);
  };

  const handleReGetOTP = async () => {
    setLoading(true);
    try {
      let data = {
        email: email,
      };
      await authenticatorAPI.forgotPassRequire(data);
      setReFresh(!reFresh);
      setReGetOTP(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Lấy lại không thành công');
    }
  };

  const onPrevious = () => {
    navigation.navigate('Wellcom');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          style={styles.container}
          source={require('../../assets/images/BgLogin.png')}>
          <View style={styles.contentLogin}>
            <View style={styles.title}>
              <TouchableHighlight
                onPress={() => navigation.navigate('Wellcom')}
                style={styles.icon}>
                <BackIcon />
              </TouchableHighlight>
            </View>
            <View style={styles.contentForm} />
            {loading && (
              <View style={styles.behavior}>
                <ActivityIndicator size={'large'} />
              </View>
            )}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default CodeVerify;
