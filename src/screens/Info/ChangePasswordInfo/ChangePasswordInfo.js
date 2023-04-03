import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { Back, EyeIcon } from '../../../components/Icons/Index';
import axiosClient from '../../../services/axiosClient';
import { isValidateConfirm, isValidatePassword } from '../../../utils';
import { styles } from './styles';

const ChangePasswordInfo = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPassword, setIsPassword] = useState(true)
    const [errorInNew, setErrorInNew] = useState(false)
    const [errorInConfirm, setErrorInConfirm] = useState(false)


    const handleChangeOldPassword = (value) => {
        setOldPassword(value)
    }
    const handleChangeNewPassword = (value) => {
        setNewPassword(value)
        setErrorInNew(false)
    }
    const handleChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
        setErrorInConfirm(false)
    }


    const handleChangePassword = async () => {
        if (isValidatePassword(newPassword) && isValidatePassword(confirmPassword) && isValidateConfirm(newPassword, confirmPassword)) {
            changePassword()
        } else if (isValidatePassword(newPassword)) {
            setErrorInConfirm(true)
            Alert.alert('Thay đổi không thành công')
        } else {
            setErrorInNew(true)
            Alert.alert('Thay đổi không thành công')
        }
    }

    const changePassword = async () => {
        try {
            const res = await axiosClient.put('/authenticator/changePassword/', {
                old_password: oldPassword,
                new_password: newPassword,
            })
            Alert.alert('Thay đổi thành công')
            console.log(res);
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
                        navigation.navigate('Info');
                    }}>

                    <Back />
                </Pressable>
                <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Text style={styles.title}>Mật khẩu hiện tại</Text>
                    <TextInput
                        value={oldPassword}
                        onChangeText={(e) => handleChangeOldPassword(e)}
                        style={styles.input}
                        placeholder={'Nhập'}
                        secureTextEntry={isPassword}
                    />
                    <Text
                        onPress={() => setIsPassword(!isPassword)}
                        style={styles.eyeIcon}
                    >
                        <EyeIcon />
                    </Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Mật khẩu mới</Text>
                    <TextInput
                        value={newPassword}
                        style={errorInNew ? { ...styles.input, ...styles.borderError } : { ...styles.input }}
                        onChangeText={(e) => handleChangeNewPassword(e)}
                        placeholder={'Nhập'}
                        secureTextEntry={isPassword}
                    />
                    <Text
                        onPress={() => setIsPassword(!isPassword)}
                        style={{ ...styles.eyeIcon, top: '44%' }}
                    >
                        <EyeIcon />
                    </Text>
                    <Text style={errorInNew ? { ...styles.label, ...styles.borderError } : { ...styles.label }}>Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường và cả những kí tự đặc biệt</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>Nhập lại mật khẩu</Text>
                    <TextInput
                        value={confirmPassword}
                        style={errorInConfirm ? { ...styles.input, ...styles.borderError } : { ...styles.input }}
                        onChangeText={(e) => handleChangeConfirmPassword(e)}
                        placeholder={'Nhập'}
                        secureTextEntry={isPassword}
                    />
                    <Text
                        onPress={() => setIsPassword(!isPassword)}
                        style={styles.eyeIcon}
                    >
                        <EyeIcon />
                    </Text>
                </View>
                {errorInConfirm ? <Text style={{ ...styles.label, ...styles.borderError }}>Mật khẩu nhập lại không khớp</Text> : <></>}

                <View style={{ ...styles.item, ...styles.labelButton }}>
                    <TouchableHighlight onPress={() => { handleChangePassword() }} style={styles.login}>
                        <View style={styles.buttonSubmit}>
                            <Text style={styles.btnText}>Xác nhận</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

export default ChangePasswordInfo;
