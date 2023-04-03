import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Back, Edit } from '../../../components/Icons/Index';
import { styles } from './styles';

const Detail = ({ navigation }) => {
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
          <Edit />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.title}>Tên người dùng</Text>
          <Text style={styles.description}>Trần Văn Tùng</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.description}>Trantung2001hy@gmail.com</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Số điện thoại</Text>
          <Text style={styles.description}>0979163596</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Thời gian tạo</Text>
          <Text style={styles.description}>08/06/2022</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Sửa lần cuối</Text>
          <Text style={styles.description}>01/01/2023</Text>
        </View>
      </View>
    </View>
  );
};

export default Detail;
