import React from "react";
import { styles } from './styles';
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { Close } from "../../../components/Icons/Index";
import { TouchableHighlight } from "react-native";
function ModalInfo({ navigation, data, onCloseBoxInfo }) {
    const handleChooseViewLive = () => {
        navigation.navigate('Live')
    }
    return (
        <View style={styles.box_info}>
            <View style={styles.info_control}>
                <View style={styles.button_control}>
                </View>
                <View style={styles.header}>
                    <Text style={styles.name_camera}>{data ? data.WAREHOUSE_NAME : 'Kho Như Anh'}</Text>
                    <Pressable onPress={onCloseBoxInfo}><Close /></Pressable>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.info_item}>
                    <Text style={styles.label}>Địa chỉ</Text>
                    <Text style={styles.info}>{data ? data.COMMUNE_NAME + ', ' + data.DISTRICT_NAME + ', ' + data.PROVINCE_NAME : 'Số 176, đường Phạm Văn Đồng, Quận 7, Hồ Chí Minh'}</Text>
                </View>
                <View style={styles.info_item}>
                    <Text style={styles.label}>Trạng thái</Text>
                    <Text style={{ ...styles.info, color: '#0040FF' }}>
                        {data.COUNT_CAM > 0 ? 'Đang hoạt động' : 'Ko hoạt động'}
                    </Text>
                </View>
                <View style={styles.info_item}>
                    <Text style={styles.label}>Kho</Text>
                    <Text style={styles.info}>{data ? data.WAREHOUSE_NAME : 'Kho Như Anh'}</Text>
                </View>
                <TouchableHighlight style={styles.login} onPress={handleChooseViewLive}>
                    <View style={styles.buttonLogin}>
                        <Text style={styles.btnText}>Xem Camera</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default ModalInfo;