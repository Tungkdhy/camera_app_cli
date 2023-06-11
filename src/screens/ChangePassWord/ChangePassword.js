import React, { useState } from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  TouchableNativeFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
} from '../../components/Icons/Index';
import { isValidatePassword } from '../../utils';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const handleLogin = async () => {
    try {
      if (password === newPassword && password && newPassword) {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.post(
          'http://42.96.41.91:10710/vinorsoft/aicamera/v1.0/authenticator/password-reset/confirm',
          {
            password,
            token,
          },
        );
        if (res.status === 200) {
          navigation.navigate('Success');
        }
      }
    } catch (e) {
      Alert.alert('Đổi mật khẩu không thành công');
    }
  };
  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
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
            </View>
            <View style={styles.contentForm}>
              <View style={styles.formLogin}>
                <Text style={styles.header}>Đổi mật khẩu</Text>
                <SafeAreaView>
                  <Text style={styles.label}>Mật khẩu</Text>
                  <TextInput
                    onChangeText={text => setPassword(text)}
                    style={
                      password !== '' && !isValidatePassword(password)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    value={password}
                    placeholder="Nhập"
                    secureTextEntry={true}
                  />
                  <Text style={styles.validate}>
                    Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường
                    và cả những kí tự đặc biệt
                  </Text>
                  <Text style={styles.label}>Nhập lại mật khẩu</Text>
                  <TextInput
                    style={
                      newPassword.length < 6 &&
                        newPassword !== '' &&
                        !isValidatePassword(newPassword)
                        ? { ...styles.input, ...styles.borderError }
                        : styles.input
                    }
                    placeholder="Nhập"
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    secureTextEntry={true}
                  />
                  {newPassword.length < 6 &&
                    newPassword !== '' &&
                    !isValidatePassword(newPassword) ? (
                    <Text style={styles.error}>
                      Vui lòng nhập đúng định dạng
                    </Text>
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
      </ImageBackground>
    </TouchableNativeFeedback>
  );
};
export default ChangePassword;
