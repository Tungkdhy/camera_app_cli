import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Back } from '../../../components/Icons/Index';
import axiosClient from '../../../services/axiosClient';
import { formatDate } from '../../../utils';
import { styles } from './styles';

const EditInfo = ({ navigation }) => {
    const dataStore = useSelector(state => state.userReducer)
    const [dataUser, setDataUser] = useState({
        name: '',
        address_detail: '',
        email: '',
        commune_code: '',
        district_code: '',
        province_code: '',
        nation_code: 'VNM',
        birthday: '',
        staff_position_code: '',
        company_code: '',
        phone: ''
    })
    const dateJoined = '22/06/2022'
    const editTime = '27/03/2022'
    const userType = dataStore.userInfo.USERTYPE_NAME

    useEffect(() => {
        const data = dataStore.userInfo;
        setDataUser(prev => ({
            ...prev,
            name: data.NAME,
            address_detail: data.ADDRESS_DETAIL,
            email: data.EMAIL,
            company_code: data.COMPANY_CODE,
            birthday: formatDate(data.BIRTHDAY),
            staff_position_code: data.USERTYPE_CODE,
            phone: data.PHONE,
        }))
    }, [dataStore])

    const handleChangeUserName = (value) => {
        setDataUser(prev => ({
            ...prev,
            name: value
        }))
    }
    const handleChangeEmail = (value) => {
        setDataUser(prev => ({
            ...prev,
            email: value
        }))
    }
    const handleChangePhone = (value) => {
        setDataUser(prev => ({
            ...prev,
            phone: value
        }))
    }


    const handleChangeInfo = async () => {
        try {
            const res = await axiosClient.put('/user/put-change-user-info/',
                dataUser,
            )
            Alert.alert('Thay đổi thành công')
            return res;
        } catch (error) {
            Alert.alert('Thay đổi không thành công')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('Detail');
                    }}>

                    <Back />
                </Pressable>
                <Text style={styles.text}>Sửa thông tin</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Tên người dùng</Text>
                        <TextInput
                            value={dataUser.name}
                            onChangeText={(e) => handleChangeUserName(e)}
                            style={styles.input}
                            placeholder={'Nhập'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Email</Text>
                        <TextInput
                            value={dataUser.email}
                            style={styles.input}
                            onChangeText={(e) => handleChangeEmail(e)}
                            placeholder={'Nhập'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Số điện thoại</Text>
                        <TextInput
                            value={dataUser.phone}
                            style={styles.input}
                            onChangeText={(e) => handleChangePhone(e)}
                            placeholder={'Nhập'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Nhóm người dùng</Text>
                        <View style={styles.picker}>
                            <Text></Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Thời gian tạo tài khoản</Text>
                        <TextInput
                            value={dateJoined}
                            editable={false}
                            selectTextOnFocus={false}
                            style={{ ...styles.input, ...styles.disable }}
                            placeholder={'email'}
                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Sửa đổi lần cuối</Text>
                        <TextInput
                            editable={false}
                            selectTextOnFocus={false}
                            value={editTime}
                            style={{ ...styles.input, ...styles.disable }}
                            placeholder={'email'}
                        />
                    </View>
                    <View style={{ ...styles.item, ...styles.labelButton }}>
                        <TouchableHighlight onPress={() => { navigation.navigate('Detail') }} style={styles.login}>
                            <View style={styles.buttonCancel}>
                                <Text style={styles.btnText}>Huỷ bỏ</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => { handleChangeInfo() }} style={styles.login}>
                            <View style={styles.buttonSubmit}>
                                <Text style={styles.btnText}>Lưu cài đặt</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default EditInfo;
