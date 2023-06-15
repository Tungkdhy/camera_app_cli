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
  Modal
} from 'react-native';
import { BackIcon } from '../Icons/Index';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { authenticatorAPI } from '../../services/api/authenticator';
import Clock from './Clock';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { isValidateToken } from '../../utils';

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
  const [error, setError] = useState(false);
  const handleLogin = async () => {
    setLoading(true)
    try {
      let token = otp.op1 + otp.op2 + otp.op3 + otp.op4 + otp.op5 + otp.op6;
      if (isValidateToken(token)) {
        let data = {
          token: token
        }
        const res = await authenticatorAPI.forgotValidateToken(data)
        setLoading(false)
        if (res) {
          navigation.navigate('ChangePassword', { token: data });
        }
      } else {
        setLoading(false)
        setError(true)
      }
    } catch (e) {
      console.log(e);
      setLoading(false)
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
    navigation.navigate('Forgot');
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
                onPress={onPrevious}
                style={styles.icon}>
                <BackIcon />
              </TouchableHighlight>
            </View>
            <View style={styles.formLogin}>
              <Text style={styles.header}>Xác thực tài khoản</Text>
              {error ? (
                <Text style={{...styles.description, ...styles.error}}>
                 Mã xác nhận chỉ chứa các ký tự là số
                </Text>
              ) : (
                <Text style={styles.description}>
                  Một mã 6 ký tự đã được gửi về địa chỉ email của bạn
                </Text>
              )}
              <SafeAreaView style={styles.formGroup}>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputFirst}
                    onChangeText={text => {
                      setOtp({ ...otp, op1: text });
                      setError(false)
                      text && inputS.current.focus();
                    }}
                    value={otp.op1}
                  />
                </View>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    //   keyboardType="number-pad"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputS}
                    value={otp.op2}
                    onChangeText={text => {
                      setOtp({ ...otp, op2: text });
                      setError(false)
                      text
                        ? inputT.current.focus()
                        : inputFirst.current.focus();
                    }}
                  />
                </View>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    //   keyboardType="number-pad"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputT}
                    value={otp.op3}
                    onChangeText={text => {
                      setOtp({ ...otp, op3: text });
                      setError(false)
                      text ? inputF.current.focus() : inputS.current.focus();
                    }}
                  />
                </View>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    //   keyboardType="number-pad"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputF}
                    value={otp.op4}
                    onChangeText={text => {
                      setOtp({ ...otp, op4: text });
                      setError(false)
                      text
                        ? inputFive.current.focus()
                        : inputT.current.focus();
                    }}
                  />
                </View>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    //   keyboardType="number-pad"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputFive}
                    value={otp.op5}
                    onChangeText={text => {
                      setOtp({ ...otp, op5: text });
                      setError(false)
                      text
                        ? inputSix.current.focus()
                        : inputF.current.focus();
                    }}
                  />
                </View>
                <View style={!error ? {...styles.formControl} : {...styles.formControl, ...styles.error}}>
                  <TextInput
                    placeholder="-"
                    //   keyboardType="number-pad"
                    maxLength={1}
                    style={!error ? { ...styles.otp } : { ...styles.otp, ...styles.error }}
                    ref={inputSix}
                    value={otp.op6}
                    onChangeText={text => {
                      setOtp({ ...otp, op6: text });
                      setError(false)
                      // text && inputFive.current.focus();
                    }}
                  />
                </View>
              </SafeAreaView>
              <View style={styles.hl}>
                {reGetOTP ? (
                  <Pressable onPress={handleReGetOTP}>
                    <Text style={styles.send}>Gửi lại</Text>
                  </Pressable>
                ) : (
                  <Clock minutes={10} getTimeOut={onReGetOTP} isReFresh={reFresh} />
                )}
              </View>
              <TouchableHighlight onPress={handleLogin} style={styles.login}>
                <View style={styles.buttonLogin}>
                  <Text style={styles.btnText}>Xác nhận</Text>
                </View>
              </TouchableHighlight>
            </View>
            {loading && (
              <View style={styles.behavior}>
                <ActivityIndicator size={'large'} />
              </View>
            )}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
};
export default CodeVerify;
