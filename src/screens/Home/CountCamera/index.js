import { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import axiosClient from "../../../services/axiosClient";
import { styles } from './styles';
import ImageCamOn from '../../../assets/images/online.png';
import ImageCamOff from '../../../assets/images/off.png';
import ImageCam from '../../../assets/images/cam.png';
import ImageEye from '../../../assets/images/eye.png';

function CountCamera() {
    const [countCamera, setCountCamera] = useState({ COUNT_CAM: 0, ACTIVE: 0, INACTIVE: 0, VIEWS: 0, COMPANY_CODE: null })
    const [companyName, setCompanyName] = useState('')
    useEffect(() => {
        const getAndUpDateCountCamera = async () => {
            const getCountCamera = await axiosClient.get('/statCountCam/get-list-stat-count-cam/')
            setCountCamera({
                COUNT_CAM: getCountCamera[0].COUNT_CAM,
                ACTIVE: getCountCamera[0].ACTIVE,
                INACTIVE: getCountCamera[0].INACTIVE,
                VIEWS: getCountCamera[0].VIEWS,
                COMPANY_CODE: getCountCamera[0].COMPANY_CODE,
            })
            const getNameCompany = await axiosClient.get(`/company/get-list-company/?company_code=${getCountCamera[0].COMPANY_CODE}`)
            setCompanyName(getNameCompany[0].NAME)
            const upDateCountCamera = await axiosClient.post('/statCountCam/post-add-stat-count-cam/')
            return upDateCountCamera;
        }
        getAndUpDateCountCamera()
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thống kê Camera của công ty {companyName}</Text>
            {/* content */}
            <View style={styles.contentHeader}>
                <View style={styles.boxHeader}>
                    <View style={styles.headerItem} >
                        <ImageBackground
                            style={styles.image_camera}
                            source={ImageCam}
                        />
                        <Text style={styles.number}>{countCamera.COUNT_CAM}</Text>
                        <Text style={styles.name}>Tổng Camera</Text>
                    </View>
                    <View style={styles.headerItem}>
                        <ImageBackground
                            style={styles.image_camera}
                            source={ImageEye}
                        />
                        <Text style={styles.number}>{countCamera.VIEWS}</Text>
                        <Text style={styles.name}>Xem trực tiếp</Text>
                    </View>
                </View>
                <View style={styles.boxHeader}>
                    <View style={styles.headerItem}>
                        <ImageBackground
                            style={styles.image_camera}
                            source={ImageCamOn}
                        />
                        <Text style={styles.number}>{countCamera.ACTIVE}</Text>
                        <Text style={styles.name}>Đang hoạt động</Text>
                    </View>
                    <View style={styles.headerItem}>
                        <ImageBackground
                            style={styles.image_camera}
                            source={ImageCamOff}
                        />
                        <Text style={styles.number}>{countCamera.INACTIVE}</Text>
                        <Text style={styles.name}>Không hoạt động</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CountCamera;