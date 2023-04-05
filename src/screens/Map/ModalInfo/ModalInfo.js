import React from "react";
import { styles } from './styles';
import { Modal, Pressable, View } from "react-native";
import { Text } from "react-native";
import { Close } from "../../../components/Icons/Index";
import { TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { setWareHouseCode } from "../../../redux/actions/cameraAction";

function ModalInfo({ navigation, data, onCloseBoxInfo, show }) {
    const dispatch = useDispatch()
    const handleChooseViewLive = (code) => {
        dispatch(setWareHouseCode(code))
        navigation.navigate('Stream')
        onCloseBoxInfo()
    }
    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
            onRequestClose={() => {
                onCloseBoxInfo();
            }}
        >
            <View style={styles.box_view}>
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
                            {data && data.COUNT_CAM > 0 ? 'Đang hoạt động' : 'Ko hoạt động'}
                        </Text>
                    </View>
                    <View style={styles.info_item}>
                        <Text style={styles.label}>Kho</Text>
                        <Text style={styles.info}>{data ? data.WAREHOUSE_NAME : 'Kho Như Anh'}</Text>
                    </View>
                    <TouchableHighlight style={styles.login} onPress={() => handleChooseViewLive(data.CODE)}>
                        <View style={styles.buttonLogin}>
                            <Text style={styles.btnText}>Xem Camera</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

export default ModalInfo;