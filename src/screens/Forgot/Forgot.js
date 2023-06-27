import React, { useCallback, useState } from 'react';
import {
  View,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { isValidatorEmail } from '../../utils';
import { BackIcon } from '../../components/Icons/Index';
import { styles } from './style';
import { authenticatorAPI } from '../../services/api/authenticator';
import { useDispatch } from 'react-redux';
import { setEmailUser } from '../../redux/actions/getUserAction';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    setSubmit(true);
    try {
      if (isValidatorEmail(email)) {
        let data = {
          email: email,
        };
        await authenticatorAPI.forgotPassRequire(data);
        navigation.navigate('CodeVerify', { name: 'Forgot' });
        dispatch(setEmailUser(data.email));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Email không tồn tại trong hệ thống, vui lòng kiểm tra lại');
    }
  };
  const onPrevious = () => {
    navigation.navigate('Login');
  };

  const handleChangeMail = text => {
    setEmail(text);
    setSubmit(false);
  };

  const MessageError = useCallback(() => {
    if (!isValidatorEmail(email)) {
      if (email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        return (
          <Text style={styles.error}>
            Email không được nhập các ký tự khoảng trắng hoặc ký tự có dấu
          </Text>
        );
      } else {
        return <Text style={styles.error}>Email không hợp lệ</Text>;
      }
    }
  }, [email]);
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/BgLogin.png')}>
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView enabled={true} behavior="padding">
          <View style={styles.contentLogin}>
            <View style={styles.title}>
              <TouchableHighlight onPress={onPrevious} style={styles.icon}>
                <BackIcon />
              </TouchableHighlight>
            </View>
            <View style={styles.box_view}>
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
                      onChangeText={handleChangeMail}
                      maxLength={255}
                    />
                    {submit && <MessageError />}
                  </SafeAreaView>
                  <TouchableHighlight
                    onPress={handleLogin}
                    style={styles.login}>
                    <View style={styles.buttonLogin}>
                      <Text style={styles.btnText}>Tiếp tục</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            {loading && (
              <View style={styles.behavior}>
                <ActivityIndicator size={'large'} />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </ImageBackground>
  );
};
export default Forgot;
