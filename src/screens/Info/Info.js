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
  FadeId,
  Logout,
  NextIcon,
  Pass,
  UploadIcon,
  Website,
} from '../../components/Icons/Index';
const Info = ({ navigation }) => {
  const handleLogout = async () => {
    AsyncStorage.clear();
    console.log('a');
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
          {/* <View style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><FadeId /></Text>
                            <Text style={styles.text}>Đăng nhập bằng FaceID</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><Website /></Text>
                            <Text style={styles.text}>Ngôn ngữ</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><UploadIcon /></Text>
                            <Text style={styles.text}>Cập nhập phiên bản</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </View> */}
          <Pressable
            onPress={async () => {
              navigation.navigate('Login');
              AsyncStorage.clear();
            }}
            style={styles.item}>
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
