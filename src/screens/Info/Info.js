import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import {
  CricleUser,
  Logout,
  NextIcon,
  Pass,
} from '../../components/Icons/Index';
import axiosClient from '../../services/axiosClient';
const Info = ({ navigation }) => {
  const handleLogout = async () => {
    const refresh = await AsyncStorage.getItem('refresh');
    await axiosClient.post('/authenticator/logout', {
      refresh: refresh
    })
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgName}>
        <ImageBackground
          source={require('../../assets/images/BgInfo.png')}
          resizeMode="cover"
          style={styles.image}>
          <Image source={require('../../assets/images/Avatar2.png')} />
          <Text style={styles.name}>Trần Văn Tùng</Text>
          <Text style={styles.username}>Tên đăng nhập: tunghy2001</Text>
        </ImageBackground>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Pressable
            onPress={() => {
              navigation.navigate('Detail');
            }}
            style={styles.item}>
            <View style={styles.title}>
              <Text style={styles.icon}>
                <CricleUser />
              </Text>
              <Text style={styles.text}>Thông tin cá nhân</Text>
            </View>
            <Pressable style={styles.next}>
              <NextIcon />
            </Pressable>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangePasswordInfo');
            }}
            style={styles.item}>
            <View style={styles.title}>
              <Text style={styles.icon}>
                <Pass />
              </Text>
              <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            <Pressable style={styles.next}>
              <NextIcon />
            </Pressable>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={styles.item}>
            <View style={styles.title}>
              <Text style={styles.icon}>
                <Logout />
              </Text>
              <Text style={styles.text}>Đăng xuất</Text>
            </View>
            <Pressable style={styles.next}>
              <NextIcon />
            </Pressable>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Info;
