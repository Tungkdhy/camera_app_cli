import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../services/axiosClient';
import { isValidatorEmail } from '../../utils';
import { BackIcon } from '../../components/Icons/Index';
import { styles } from './style';

const Forgot = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const handleLogin = async () => {
    try {
      const token = await axios.post(
        'http://cameraai.cds.vinorsoft.com/camera/vinorsoft/aicamera/v1.0/authenticator/password-reset/require',
        {
          email: email,
        },
      );
      await AsyncStorage.setItem('email', email);
      if (token.data.status) {
        // await AsyncStorage.setItem("token", token.data.token);
        navigation.navigate('CodeVerify', { name: 'Forgot' });
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Mã xác thực gửi về email của bạn');
    }
  };
  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/BgLogin.png')}>
        {/* <KeyboardAvoidingView enabled={true} behavior="padding"> */}
        <KeyboardAvoidingView enabled={true} behavior="padding">
          <View style={styles.contentLogin}>
            <View style={styles.title}>
              <TouchableHighlight
                onPress={() => navigation.navigate('Wellcom')}
                style={styles.icon}>
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
                      email.length < 6 &&
                        email !== '' &&
                        isValidatorEmail(email)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Nhập"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                  {email !== '' && !isValidatorEmail(email) ? (
                    <Text style={styles.error}>Vui lòng nhập đúng email</Text>
                  ) : (
                    <Text />
                  )}
                </SafeAreaView>
                <TouchableHighlight onPress={handleLogin} style={styles.login}>
                  <View style={styles.buttonLogin}>
                    <Text style={styles.btnText}>Tiếp tục</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </TouchableNativeFeedback>
  );
};
export default Forgot;
