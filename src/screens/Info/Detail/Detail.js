import React, { useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Back, Edit } from '../../../components/Icons/Index';
import { setUserInfo } from '../../../redux/actions/getUserAction';
import axiosClient from '../../../services/axiosClient';
import { formatDate } from '../../../utils';
import { styles } from './styles';

const Detail = ({ navigation }) => {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dateJoined: '',
    editTime: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await axiosClient.get('/user/get-user-info/');
        if (res) {
          const data = res[0];
          setDataUser({
            name: data.NAME,
            email: data.EMAIL,
            phoneNumber: data.PHONE,
            dateJoined: data.DATE_JOINED,
            editTime: data.EDIT_TIME,
          });
          dispatch(setUserInfo(data));
        }
      } catch (error) {
        // Alert.alert('You not permission')
      }
    };
    getDataUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Back />
        </Pressable>
        <Text style={styles.text}>Thông tin cá nhân</Text>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('EditInfo');
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.title}>Tên người dùng</Text>
          <Text style={styles.description}>{dataUser.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.description}>{dataUser.email}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Số điện thoại</Text>
          <Text style={styles.description}>{dataUser.phoneNumber}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Thời gian tạo</Text>
          <Text style={styles.description}>
            {formatDate(dataUser.dateJoined)}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Sửa lần cuối</Text>
          <Text style={styles.description}>
            {formatDate(dataUser.editTime)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Detail;
