import { Pressable, View, Text } from 'react-native';
import { styles } from './styles'
import { notificationsAPI } from '../../../services/api/notifiations';


const NotificationItem = ({item, navigation}) => {
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
}

export default NotificationItem;