import React from 'react';
import { View,Text,Image } from 'react-native';
import { ChartIcon,MapIcon,SearchIcon,BellIcon } from '../Icons/Index';
import { style } from './style';

const Header = ({title}) => {
    return (
        <View style={style.content}>
            <Text style={style.text}>{title}</Text>
            <View style={style.icons}>
                <SearchIcon color={"white"}/>
                <BellIcon/>
                <Image style={{width:24}} source={require('../../assets/images/Avatar.png')}/>
            </View>
        </View>
    );
};

export default Header;