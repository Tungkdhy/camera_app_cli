import React, { useState } from 'react';
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
  Pressable,
} from 'react-native';
import { isValidatorEmail } from '../../utils';
import { BackIcon } from '../../components/Icons/Index';
import style from './style';
import { authenticatorAPI } from '../../services/api/authenticator';
import { useDispatch } from 'react-redux';
import { setEmailUser } from '../../redux/actions/getUserAction';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
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
      await authenticatorAPI.forgotPassRequire(data);
      navigation.navigate('CodeVerify', { name: 'Forgot' });
      setLoading(false);
      dispatch(setEmailUser(data.email));
    } catch (e) {
      console.log(e);
      setLoading(false);
      Alert.alert('Mã xác thực gửi về email của bạn');
    }
  };
  return (
    <ImageBackground
      style={style.container}
      source={require('../../assets/images/BgLogin.png')}>
      <View style={style.contentLogin}>
        <View style={style.title}>
          {/* <TouchableHighlight
            onPress={() => navigation.navigate('Login')}
            style={style.icon}>

          </TouchableHighlight> */}
        </View>
        <View style={style.contentForm}>
          <View style={style.formLogin}>
            <Text style={style.header}>Quên mật khẩu</Text>
            <SafeAreaView>
              <Text style={style.label}>Email</Text>
              <TextInput
                style={
                  email.length < 6 && email !== '' && isValidatorEmail(email)
                    ? { ...style.input, ...style.borderError }
                    : style.input
                }
                placeholder="Nhập"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              {email !== '' && !isValidatorEmail(email) ? (
                <Text style={style.error}>Vui lòng nhập đúng email</Text>
              ) : (
                <Text />
              )}
            </SafeAreaView>
            <TouchableHighlight onPress={handleLogin} style={style.login}>
              <View style={style.buttonLogin}>
                <Text style={style.btnText}>Tiếp tục</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};
export default Forgot;
