import {useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import axiosClient from '../../../services/axiosClient';
import streamingClient from '../../../services/axiosStreaming';
import {styles} from './styles';
import ImageCamOn from '../../../assets/images/online.png';
import ImageCamOff from '../../../assets/images/off.png';
import ImageCam from '../../../assets/images/cam.png';
import ImageEye from '../../../assets/images/eye.png';
import Move from '../../../assets/images/Movement.png';
import Motion from '../../../assets/images/Motion.png';
import Object1 from '../../../assets/images/Object.png';
import Weak from '../../../assets/images/Weak.png';
import DisConnect from '../../../assets/images/DisConnect.png';

function CountCamera() {
  const [countCamera, setCountCamera] = useState({
    COUNT_CAM: 0,
    ACTIVE: 0,
    INACTIVE: 0,
    VIEWS: 0,
    COMPANY_CODE: null,
    MOTION: 0,
    COMMON_OBJECT: 0,
    MOVEMENT: 0,
    NO_CONNECT: 0,
    WEAK: 0,
  });
  const [companyName, setCompanyName] = useState('');
  const getListStatus = async () => {
    try {
      const res = await streamingClient.get(
        '/streamManagement/get-list-state-camera-stream/',
      );
      return res;
    } catch (e) {}
  };
  useEffect(() => {
    const getAndUpDateCountCamera = async () => {
      const getCountCamera = await axiosClient.get(
        '/statCountCam/get-list-stat-count-cam/',
      );
      const status = await getListStatus();
      const noConnect = status.filter(item => item.status === 1);
      const weak = status.filter(item => item.status === 2);
      setCountCamera({
        COUNT_CAM: getCountCamera[0].COUNT_CAM,
        ACTIVE: getCountCamera[0].ACTIVE,
        INACTIVE: getCountCamera[0].INACTIVE,
        NO_CONNECT: noConnect.length,
        WEAK: weak.length,
        VIEWS: getCountCamera[0].VIEWS,
        COMPANY_CODE: getCountCamera[0].COMPANY_CODE,
        MOTION: getCountCamera[0].MOTION,
        COMMON_OBJECT: getCountCamera[0].COMMON_OBJECT,
        MOVEMENT: getCountCamera[0].MOVEMENT,
      });
      const getNameCompany = await axiosClient.get(
        `/company/get-list-company/?company_code=${getCountCamera[0].COMPANY_CODE}`,
      );
      setCompanyName(getNameCompany[0].NAME);
      const upDateCountCamera = await axiosClient.post(
        '/statCountCam/post-add-stat-count-cam/',
      );
      return upDateCountCamera;
    };
    getAndUpDateCountCamera();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Thống kê Camera của công ty {companyName}
      </Text>
      {/* content */}
      <View style={styles.contentHeader}>
        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageCam} />
            <Text style={styles.number}>{countCamera.COUNT_CAM}</Text>
            <Text style={styles.name}>Tổng Camera</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageEye} />
            <Text style={styles.number}>{countCamera.VIEWS}</Text>
            <Text style={styles.name}>Xem trực tiếp</Text>
          </View>
        </View>
        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageCamOn} />
            <Text style={styles.number}>
              {countCamera.ACTIVE - countCamera.WEAK - countCamera.NO_CONNECT}
            </Text>
            <Text style={styles.name}>Đang hoạt động</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageCamOff} />
            <Text style={styles.number}>{countCamera.INACTIVE}</Text>
            <Text style={styles.name}>Không hoạt động</Text>
          </View>
        </View>

        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={Weak} />
            <Text style={styles.number}>{countCamera.WEAK}</Text>
            <Text style={styles.name}>Kết nối yếu</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={DisConnect} />
            <Text style={styles.number}>{countCamera.NO_CONNECT}</Text>
            <Text style={styles.name}>Mất kết nối</Text>
          </View>
        </View>
        <Text style={styles.header}>
          Thống kê Camera sử dụng dịch vụ AI
        </Text>
        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={Motion} />
            <Text style={styles.number}>{countCamera.MOTION}</Text>
            <Text style={styles.name}>Phát hiện chuyển động</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={Object1} />
            <Text style={styles.number}>{countCamera.COMMON_OBJECT}</Text>
            <Text style={styles.name}>Đối tượng phổ biến</Text>
          </View>
        </View>
        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={Move} />
            <Text style={styles.number}>{countCamera.MOVEMENT}</Text>
            <Text style={styles.name}>Camera dịch chuyển</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CountCamera;
