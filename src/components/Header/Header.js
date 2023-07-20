import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput } from 'react-native';
import { SearchIcon, BellIcon, Close } from '../Icons/Index';
import { style } from './style';
import { useSelector } from 'react-redux';

const Header = ({
    title,
    navigation,
    search,
    isShowSearch = false,
    setIsShowSearch,
    setSearch,
}) => {
    const debouce = React.useRef();
    const count = useSelector(state => state.notificationReducer);
    const [input, setInput] = useState(search);
    const handleChangeSearch = data => {
        setInput(data);
        if (debouce.current) {
            clearTimeout(debouce.current);
        }
        debouce.current = setTimeout(() => {
            setSearch(data);
        }, 600);
    };
    return (
        <View style={style.container}>
            <View style={style.content}>
                <Text style={style.text}>{title}</Text>
                <View style={style.icons}>
                    {(title === 'Thống kê') | (title === 'Trang chủ') ? (
                        <></>
                    ) : (
                        <Pressable onPress={setIsShowSearch}>
                            <SearchIcon color={'white'} />
                        </Pressable>
                    )}
                    <Pressable
                        onPress={() =>
                            navigation.navigate('Notification', { screen: 'Notification' })
                        }>
                        <View style={style.notification}>
                            <BellIcon />
                            {count > 0 && (
                                <Text style={style.count}>{count < 99 ? count : '99+'}</Text>
                            )}
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Info', { screen: 'Info' })}>
                        <Image
                            style={{ width: 24 }}
                            source={require('../../assets/images/Avatar.png')}
                        />
                    </Pressable>
                </View>
            </View>
            {isShowSearch && (
                <View style={style.search}>
                    <View>
                        <SearchIcon color={'#000'} />
                    </View>
                    <TextInput
                        onChangeText={data => handleChangeSearch(data)}
                        style={style.input}
                        value={input}
                    />
                    <Pressable
                        onPress={() => {
                            setSearch('');
                            setInput('');
                        }}>
                        <Close width={24} height={24} color={'#000'} />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Header;
