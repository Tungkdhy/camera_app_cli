import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SearchIcon, BellIcon } from '../Icons/Index';
import { style } from './style';
import { useSelector } from 'react-redux';

const Header = ({ title, navigation }) => {
    const count = useSelector(state => state.notificationReducer)
    console.log(title);
    return (
        <View style={style.content}>
            <Text style={style.text}>{title}</Text>
            <View style={style.icons}>
                {title === "Thống kê" ? <></>: <SearchIcon color={"white"} />}
                <Pressable onPress={() => (navigation.navigate('Notification', { screen: 'Notification' }))}>
                    <View style={style.notification}>
                        <BellIcon />
                        {count > 0 && <Text style={style.count}>{count < 99 ? count : '99+'}</Text>}
                    </View>
                </Pressable>
                <Pressable onPress={() => (navigation.navigate('Info', { screen: 'Info' }))}>
                    <Image style={{ width: 24 }} source={require('../../assets/images/Avatar.png')} />
                </Pressable>

            </View>
        </View>
    );
};

export default Header;