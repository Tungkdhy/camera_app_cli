import React from 'react';
import { View, ImageBackground, Text, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { CricleUser, FadeId, Logout, NextIcon, Pass, UploadIcon, Website } from '../../components/Icons/Index';
import { ScrollView } from 'react-native-gesture-handler';
const Info = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bgName}>
                <ImageBackground source={require("../../assets/images/BgInfo.png")} resizeMode="cover" style={styles.image}>
                    <Image source={require("../../assets/images/Avatar2.png")} />
                    <Text style={styles.name}>Trần Văn Tùng</Text>
                    <Text style={styles.username}>Tên đăng nhập: tunghy2001</Text>
                </ImageBackground>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <Pressable onPress={() => {
                        navigation.navigate('Detail');
                    }} style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><CricleUser /></Text>
                            <Text style={styles.text}>Thông tin cá nhân</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </Pressable>
                    <View style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><Pass /></Text>
                            <Text style={styles.text}>Đổi mật khẩu</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </View>
                    <View style={styles.item}>
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
                    </View>
                    <View style={styles.item}>
                        <View style={styles.title}>
                            <Text style={styles.icon}><Logout /></Text>
                            <Text style={styles.text}>Đăng xuất</Text>
                        </View>
                        <Pressable style={styles.next}>
                            <NextIcon />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Info;
