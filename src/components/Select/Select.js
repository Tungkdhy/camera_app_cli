import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = ({ data1 = [], position = 'auto', setData, value }) => {
    const [value2, setValue2] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            ss;
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };
    useEffect(() => {
        setValue2(value);
    }, [value]);
    return (
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data1}
                search
                maxHeight={180}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Lựa chọn' : '...'}
                searchPlaceholder="Search..."
                value={value2}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue2(item.value);
                    setData(item.value);
                    setIsFocus(false);
                }}
                dropdownPosition={position}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // padding: 16,
        paddingBottom: 16,
    },
    dropdown: {
        height: 48,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
    },
});
