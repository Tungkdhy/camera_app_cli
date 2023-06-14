import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from './styles'
import { useCallback, useEffect, useState } from "react";
import { notificationsAPI } from "../../../services/api/notifiations";
import { DownIconSolid, UpIconSolid } from "../../../components/Icons/Index";

function NewNotification({ navigation }) {
    const [listNotification, setListNotification] = useState([]);
    const [size, setSize] = useState(2);
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const getListNotification = useCallback(async (length) => {
        try {
            let params = {
                page: 1,
                size: length,
                type: 'AI',
            }
            const res = await notificationsAPI.getListNotification(params);
            if (count <= 0) {
                setCount(res?.count_not_seen);
            }
            setListNotification(res?.data)
        } catch (error) {
            console.log(error);
        }
    }, [count])

    const seenNotification = async (codeItem) => {
        try {
            const res = await notificationsAPI.putSeenNotification(codeItem)
            return res;
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckNotification = (code, notification) => {
        seenNotification(code);
        navigation.navigate('Report', {
            camera: {
                CODE: notification.CAMERA_CODE,
                NAME_CAM: notification.NAME_CAM,
            },
        });
    };

    const showMore = () => {
        setShow(!show)
        if (size === 2) {
            setSize(10)
        } else {
            setSize(2)
        }
    }

    const reGet = (e) => {
        if (listNotification.length >= 10) {
            setSize(size + 10)
        }
    }

    useEffect(() => {
        getListNotification(size)
    }, [size])
    console.log(size);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thông báo</Text>
                <View style={styles.number}>
                    <Text style={styles.count}>{count && count !== 0 && count}</Text>
                </View>
            </View>
            <View style={styles.content}>
                {
                    size === 2 ? (
                        <View>
                            {listNotification.map(item => {
                                return (
                                    <Pressable
                                        key={item.CODE}
                                        onPress={() =>
                                            handleCheckNotification(item.CODE, item)
                                        }>
                                        <View
                                            style={
                                                item.SEEN === 0
                                                    ? { ...styles.item, ...styles.new }
                                                    : { ...styles.item }
                                            }>
                                            <Text style={styles.time}>{item.TIME}</Text>
                                            <Text style={styles.name}>{item.NAME}</Text>
                                            <Text style={styles.title}>{item.DETAIL}</Text>
                                            {item.SEEN === 0 && (
                                                <View style={styles.tick} />
                                            )}
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </View>
                    ) : size > 2 ? (
                        <ScrollView onScrollEndDrag={(e) => reGet(e)} style={{ height: '100%' }}>
                            {listNotification.map(item => {
                                return (
                                    <Pressable
                                        key={item.CODE}
                                        onPress={() =>
                                            handleCheckNotification(item.CODE, item)
                                        }>
                                        <View
                                            style={
                                                item.SEEN === 0
                                                    ? { ...styles.item, ...styles.new }
                                                    : { ...styles.item }
                                            }>
                                            <Text style={styles.time}>{item.TIME}</Text>
                                            <Text style={styles.name}>{item.NAME}</Text>
                                            <Text style={styles.title}>{item.DETAIL}</Text>
                                            {item.SEEN === 0 && (
                                                <View style={styles.tick} />
                                            )}
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                    ) : (
                        <View>
                            <Text>no data</Text>
                        </View>
                    )}
            </View>
            {/* {listNotification.length <= 2 && count > 2 ? (
                <View>
                    <View style={styles.buttonMore} >
                        <Pressable onPress={showMore}>
                            <DownIconSolid />
                        </Pressable>
                    </View>

                </View>
            ) : (
                <View>
                    <View style={styles.buttonMore} >
                        <Pressable onPress={showMore}>
                            <UpIconSolid />
                        </Pressable>
                    </View>
                </View>
            )} */}
        </View>
    )
}

export default NewNotification;