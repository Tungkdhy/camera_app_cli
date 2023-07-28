import {
    FlatList,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './styles';
import { useCallback, useEffect, useState } from 'react';
import { notificationsAPI } from '../../../services/api/notifiations';
import { DownIconSolid, UpIconSolid } from '../../../components/Icons/Index';
import NotificationItem from './NotificationItem';
import { ActivityIndicator } from 'react-native';

function NewNotification({ navigation }) {
    const [listNotification, setListNotification] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const getListNotification = useCallback(async () => {
        try {
            setLoading(true);
            let params = {
                page: page,
                size: size,
                type: 'AI',
            };
            const res = await notificationsAPI.getListNotification(params);
            setCount(res?.count_not_seen);
            if (listNotification.length < 50) {
                setListNotification(prev => [...prev, ...res?.data]);
            } else {
                setListNotification(res?.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [page, size]);

    const showMore = () => {
        console.log('tung');
        if (listNotification?.length < 50) {
            if (size === 4) {
                setSize(10);
            }
            setPage(page + 1);
        } else {
            setSize(4);
            setPage(1);
        }
    };

    const onViewMore = e => {
        setSize(4);
        setPage(1);
        navigation.navigate('Notification', { isSmart: 1 });
    };

    useEffect(() => {
        getListNotification();
    }, [getListNotification]);
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
                        <NotificationItem key={index} item={item} navigation={navigation} />
                    )}
                    keyExtractor={(item, index) => index}
                    maxHeight={'100%'}
                />
                <View>{loading && <ActivityIndicator style={{ paddingTop: 8 }} />}</View>
                <View style={styles.buttonMore}>
                    {loading ? (
                        <></>
                    ) : (
                        <TouchableOpacity
                            onPress={showMore}
                            style={{ padding: 16, paddingTop: 8 }}>
                            {listNotification.length < 50 ? (
                                <DownIconSolid />
                            ) : (
                                <UpIconSolid />
                            )}
                        </TouchableOpacity>
                    )}
                    {listNotification.length >= 50 && (
                        <Pressable onPress={onViewMore}>
                            <Text style={{ color: '#0040FF' }}>Xem thêm trong thông báo</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    );
}

export default NewNotification;
