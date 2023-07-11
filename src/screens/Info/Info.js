import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationAction } from '@react-navigation/native';
import axiosClient from '../../services/axiosClient';
import { styles } from './styles';
import { CricleUser, Logout, NextIcon, Pass } from '../../components/Icons/Index';

const Info = ({ navigation, route }) => {
  const [userData, setUserData] = React.useState({
    name: '',
    userName: '',
  });
  const handleLogout = async () => {
    // const refresh = await AsyncStorage.getItem('refresh');
    // await axiosClient.post('/authenticator/logout', {
    //   refresh: refresh,
    // });
    await AsyncStorage.clear();
    navigation.dispatch(StackActions.replace('Login'));
  };
  React.useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await axiosClient.get('/user/get-user-info/');
        if (res) {
          const data = res[0];
          setUserData({
            name: data.NAME,
            email: data.EMAIL,
            phoneNumber: data.PHONE,
            dateJoined: data.DATE_JOINED,
            editTime: data.EDIT_TIME,
            userName: data.USERNAME,
          });
          // console.log(data);
        }
      } catch (error) {
        // Alert.alert('You not permission')
      }
    };
    getDataUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.bgName}>
        <ImageBackground
          source={require('../../assets/images/BgInfo.png')}
          resizeMode="cover"
          style={styles.image}>
          <Image source={require('../../assets/images/Avatar2.png')} />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>
            Tên đăng nhập: {userData.userName}
          </Text>
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
              <View style={styles.icon}>
                <CricleUser />
              </View>
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
              <View style={styles.icon}>
                <Pass />
              </View>
              <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            <Pressable style={styles.next}>
              <NextIcon />
            </Pressable>
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.item}>
            <View style={styles.title}>
              <View style={styles.icon}>
                <Logout />
              </View>
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
