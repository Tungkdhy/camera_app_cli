import React, { useCallback, useState } from 'react';
import {
    View,
    Pressable,
    Text,
    TextInput,
    TouchableHighlight,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { Back, EyeIcon } from '../../../components/Icons/Index';
import axiosClient from '../../../services/axiosClient';
import { isValidateConfirm, isValidatePassword } from '../../../utils';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordInfo = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [isPassword1, setIsPassword1] = useState(true);
    const [isPassword2, setIsPassword2] = useState(true);
    const [errorInNew, setErrorInNew] = useState(false);
    const [errorInConfirm, setErrorInConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isChange, setIsChange] = useState(false);

    const handleChangeOldPassword = value => {
        setOldPassword(value);
    };
    const handleChangeNewPassword = value => {
        setNewPassword(value);
        setErrorInNew(false);
    };
    const handleChangeConfirmPassword = value => {
        setConfirmPassword(value);
        setErrorInConfirm(false);
        setIsChange(true);
    };

    const onLogout = useCallback(async () => {
        setLoading(true);
        try {
            const refresh = await AsyncStorage.getItem('refresh');
            await axiosClient.post('/authenticator/logout', {
                refresh: refresh,
            });
            navigation.navigate('Login');
            setLoading(false);
        } catch (error) {
            await AsyncStorage.clear();
            navigation.navigate('Login');
            setLoading(false);
        }
    }, []);

    const handleChangePassword = async () => {
        if (
            isValidatePassword(newPassword) &&
            isValidatePassword(confirmPassword) &&
            isValidateConfirm(newPassword, confirmPassword) &&
            !isValidateConfirm(newPassword, oldPassword)
        ) {
            changePassword();
        } else if (isValidatePassword(newPassword)) {
            setErrorInConfirm(true);
            Alert.alert('Thay đổi không thành công');
        } else if (isValidateConfirm(newPassword, oldPassword)) {
            setErrorInNew(true);
            Alert.alert('Mật khẩu mới không được trùng với mật khẩu hiện tại');
        } else {
            setErrorInNew(true);
            Alert.alert('Thay đổi không thành công');
        }
    };

    const changePassword = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.put('/authenticator/changePassword/', {
                old_password: oldPassword,
                new_password: newPassword,
            });
            setLoading(false);
            Alert.alert('Thay đổi thành công', 'Vui lòng đăng nhập lại', [
                {
                    text: 'Ok',
                    onPress: () => {
                        onLogout();
                    },
                },
            ]);

            return res;
        } catch (error) {
            setLoading(false);
            Alert.alert('Thay đổi không thành công');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.contain}>
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
                            onChangeText={e => handleChangeOldPassword(e)}
                            style={styles.input}
                            placeholder={'Nhập'}
                            secureTextEntry={isPassword}
                        />
                        <Text
                            onPress={() => setIsPassword(!isPassword)}
                            style={styles.eyeIcon}>
                            <EyeIcon />
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Mật khẩu mới</Text>
                        <TextInput
                            value={newPassword}
                            style={
                                errorInNew
                                    ? { ...styles.input, ...styles.borderError }
                                    : { ...styles.input }
                            }
                            onChangeText={e => handleChangeNewPassword(e)}
                            placeholder={'Nhập'}
                            secureTextEntry={isPassword1}
                        />
                        <Text
                            onPress={() => setIsPassword1(!isPassword1)}
                            style={{ ...styles.eyeIcon, top: '44%' }}>
                            <EyeIcon />
                        </Text>
                        <Text
                            style={
                                errorInNew
                                    ? { ...styles.label, ...styles.borderError }
                                    : { ...styles.label }
                            }>
                            Dài trên 11 kí tự, bao gồm cả chữ, số, viết hoa, viết thường và cả
                            những kí tự đặc biệt
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.title}>Nhập lại mật khẩu</Text>
                        <TextInput
                            value={confirmPassword}
                            style={
                                isChange && newPassword !== confirmPassword
                                    ? { ...styles.input, ...styles.borderError }
                                    : { ...styles.input }
                            }
                            onChangeText={e => handleChangeConfirmPassword(e)}
                            placeholder={'Nhập'}
                            secureTextEntry={isPassword2}
                        />
                        <Text
                            onPress={() => setIsPassword2(!isPassword2)}
                            style={styles.eyeIcon}>
                            <EyeIcon />
                        </Text>
                    </View>
                    {isChange && newPassword !== confirmPassword ? (
                        <Text style={{ ...styles.label, ...styles.borderError }}>
                            Mật khẩu nhập lại không khớp
                        </Text>
                    ) : (
                        <></>
                    )}

                    <View style={{ ...styles.item, ...styles.labelButton }}>
                        <TouchableHighlight
                            onPress={() => {
                                handleChangePassword();
                            }}
                            style={styles.login}>
                            <View style={styles.buttonSubmit}>
                                <Text style={styles.btnText}>Xác nhận</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                {loading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size={'large'} />
                    </View>
                )}
            </View>
        </View>
    );
};

export default ChangePasswordInfo;
