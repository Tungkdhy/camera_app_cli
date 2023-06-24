import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from './styles'
import { useCallback, useEffect, useState } from "react";
import { notificationsAPI } from "../../../services/api/notifiations";
import { DownIconSolid, UpIconSolid } from "../../../components/Icons/Index";
import NotificationItem from "./NotificationItem";

function NewNotification({ navigation }) {
    const [listNotification, setListNotification] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [count, setCount] = useState(1);
    const getListNotification = useCallback(async () => {
        try {
            let params = {
                page: page,
                size: size,
                type: 'AI',
            }
            const res = await notificationsAPI.getListNotification(params);
            setCount(res?.count_not_seen);
            if (listNotification.length < 50) {
                setListNotification(prev => [...prev, ...res?.data]);
            } else {
                setListNotification(res?.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [page, size])



    const showMore = () => {
        if (listNotification?.length < 50) {
            if (size === 4) {
                setSize(10)
            }
            setPage(page + 1)
        } else {
            setSize(4)
            setPage(1)
        }
    }

    const onViewMore = (e) => {
        setSize(4)
        setPage(1)
        navigation.navigate('Notification', {isSmart: 1})
    }

    useEffect(() => {
        getListNotification()
    }, [getListNotification])
    // console.log(size);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thông báo</Text>
                <View style={styles.number}>
                    <Text style={styles.count}>{count && count !== 0 && count}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    // onEndReached={() => {
                    //     setCount(count + 1);
                    // }}
                    onEndReachedThreshold={0}
                    data={listNotification}
                    scrollEnabled
                    renderItem={({ item, index }) => (
                        <NotificationItem
                            key={index}
                            item={item}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index}
                    maxHeight={'100%'}
                />
                <View style={styles.buttonMore} >
                    <Pressable onPress={showMore} style={{height: 12, width: 12}}>
                        {listNotification.length < 50 ? <DownIconSolid /> : <UpIconSolid />}
                    </Pressable>
                    {listNotification.length >= 50 && (
                        <Pressable onPress={onViewMore}>
                            <Text style={{color: '#0040FF'}} >Xem thêm trong thông báo</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    )
}

export default NewNotification;