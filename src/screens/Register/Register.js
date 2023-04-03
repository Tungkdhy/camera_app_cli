import React, {useState} from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {isValidatePassword} from '../../utils';
import {
  Logo,
  BackIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
} from '../../components/Icons/Index';
import {isValidatorName, isValidatorEmail} from '../../utils';
import axiosClient from '../../services/axiosClient';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    passwordRefresh: '',
    username: '',
  });
  const [isShowPass, setIsShowPass] = useState(true);
  const handleLogin = async () => {
    try {
      if (register.password === register.passwordRefresh) {
        const res = await axiosClient.post('/authenticator/register/', {
          name: register.name,
          username: 'sang2001redalffk',
          //  username: "string",
          password: register.password,
          email: register.email,
          company_code: register.company,
          usertype_code: '300920220005',
        });
        if (res) {
          console.log(res);
          await AsyncStorage.setItem('token', res.token);
          Alert.alert('Tạo tài khoản thành công vui lòng xác thực');
          navigation.navigate('CodeVerify', {
            name: 'Register',
          });
        } else {
          Alert.alert('Mật khẩu nhập lại không khớp');
        }
      }
    } catch (e) {
      Alert.alert('Đăng ký không thành công');
    }
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/BgLogin.png')}>
      {/* <KeyboardAvoidingView enabled={true} behavior="padding"> */}
      {/* <ScrollView > */}
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
            <Text style={styles.header}>Đăng ký tài khoản</Text>
            <ScrollView style={{height:560,paddingBottom:12}}>
              <Text style={styles.label}>Tên người dùng</Text>
              <TextInput
                onChangeText={text => setRegister({...register, name: text})}
                style={
                  !isValidatorName(register.name) && register.name !== ''
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                value={register.name}
                placeholder="Nhập"
              />
              {!isValidatorName(register.name) && register.name !== '' ? (
                <Text style={styles.error}>Vui lòng nhập đúng tên</Text>
              ) : (
                <Text></Text>
              )}
              {/* <Text style={styles.label}>Tên đăng nhập</Text> */}
              {/* <TextInput
                  onChangeText={(text) =>
                    setRegister({ ...register, username: text })
                  }
                  style={
                    !isValidatorName(register.username) && register.username !== ""
                      ? { ...styles.input, ...styles.borderError }
                      : styles.input
                  }
                  value={register.username}
                  placeholder="Nhập"
                /> */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={text => setRegister({...register, email: text})}
                style={
                  register.email !== '' && !isValidatorEmail(register.email)
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                value={register.email}
                placeholder="Nhập"
              />
              {!isValidatorEmail(register.email) && register.email !== '' ? (
                <Text style={styles.error}>Vui lòng nhập đúng email</Text>
              ) : (
                <Text></Text>
              )}
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                onChangeText={text => setRegister({...register, phone: text})}
                style={
                  register.phone.length < 6 && register.phone !== ''
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                value={register.phone}
                placeholder="Nhập"
              />
              <Text style={styles.label}>Công ty trực thuộc</Text>
              <TextInput
                onChangeText={text => setRegister({...register, company: text})}
                style={
                  register.company.length < 6 && register.company !== ''
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                value={register.company}
                placeholder="Nhập"
              />
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                onChangeText={text =>
                  setRegister({...register, password: text})
                }
                style={
                  !isValidatePassword(register.password) &&
                  register.password !== ''
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                value={register.password}
                placeholder="Nhập"
              />
              <Text style={styles.validate}>
                Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường và
                cả những kí tự đặc biệt
              </Text>
              <Text style={styles.label}>Nhập lại mật khẩu</Text>
              <TextInput
                style={
                  !isValidatePassword(register.passwordRefresh) &&
                  register.passwordRefresh !== ''
                    ? {...styles.input, ...styles.borderError}
                    : styles.input
                }
                placeholder="Nhập"
                value={register.passwordRefresh}
                onChangeText={text =>
                  setRegister({...register, passwordRefresh: text})
                }
              />
            </ScrollView>

              <TouchableHighlight onPress={handleLogin} style={styles.login}>
                <View style={styles.buttonLogin}>
                  <Text style={styles.btnText}>Tiếp tục</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
export default Register;
