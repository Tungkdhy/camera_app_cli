import React, { useEffect, useState } from 'react';
import { Back, Close } from '../../../components/Icons/Index';
import {
  getPathStream,
  getInfoCamera,
} from '../../../redux/actions/cameraAction';
import VideoCamera from '../../../components/Live/VideoCamera';
import { useSelector, useDispatch } from 'react-redux';

import {
  View,
  Text,
  Modal,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import streamingClient from '../../../services/axiosStreaming';
import axiosClient from '../../../services/axiosClient';
const Live = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const streamPath = useSelector(state => state.useReducer.pathStream);
  const cameraInfo = useSelector(state => state.useReducer.camera_info);
  const isFullScreen = useSelector(state => state.useReducer.isFullScreen);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraActive, setCameraActive] = useState();
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const [camId, setCamId] = useState();
  const getInfo = async code => {
    try {
      setModalVisible(!modalVisible);
      const res = await axiosClient.get(
        `/cameraManagement/get-camera-info-by-code/?camera_code=${code}`,
      );
      if (res) {
        dispatch(getInfoCamera(res));
      }
    } catch (e) {
      Alert.alert('Lấy thông tin camera không thành công');
    }
  };
  useEffect(() => {
    setCamId(route.params.active);
    async function getPath() {
      try {
        setLoading(true);
        const data = route.params.cam.map(item => {
          return {
            camera_code: item?.CODE,
          };
        });
        const res = await streamingClient.post(
          '/streamManagement/post-list-path-streaming/',
          {
            list_camera: {
              data: data,
            },
          },
        );
        dispatch(getPathStream(res.stream));
        setLoading(false);
      } catch (e) {
        console.log(e);
        Alert.alert('Lấy danh sách đường dẫn ko thành công');
      }
    }
    getPath();
    const getPath1 = setInterval(() => {
      getPath();
    }, 20 * 60000);
    return () => {
      clearInterval(getPath1);
    };
  }, []);
  useEffect(() => {
    const camActive = streamPath.filter(item => {
      return item.code === camId;
    });
    setCameraActive(camActive);
  }, [streamPath, camId]);
  return (
    <View style={!isFullScreen ? styles.container : styles.containerFull}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleHeader}>Thông tin camera</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.iconModal}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Địa chỉ</Text>
                </View>
                <View>
                  <Text style={styles.descriptionInfo}>
                    {cameraInfo.length > 0 && cameraInfo[0]?.COMMUNE_NAME} ,{' '}
                    {cameraInfo.length > 0 && cameraInfo[0]?.DISTRICT_NAME},{' '}
                    {cameraInfo.length > 0 && cameraInfo[0]?.PROVINCE_NAME}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Kho</Text>
                </View>
                <View>
                  <Text style={styles.descriptionInfo}>
                    {cameraInfo.length > 0 && cameraInfo[0]?.WAREHOUSE_NAME}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Nguồn</Text>
                </View>
                <View>
                  <Text style={styles.descriptionInfo}>Chính</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Độ phân giải</Text>
                </View>
                <View>
                  <Text style={styles.descriptionInfo}>
                    {cameraInfo.length > 0 && cameraInfo[0]?.MAIN_SOURCE}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Trạng thái</Text>
                </View>
                <View>
                  <Text style={styles.descriptionInfo}>
                    {cameraInfo.length > 0 && cameraInfo[0]?.STATUS === 'On'
                      ? 'Đang hoạt động'
                      : 'Không hoạt động'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch(getPathStream([]));
            navigation.goBack();
          }}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.text}>
          {route && route.params && route.params.wareHouse
            ? route.params.wareHouse
            : ''}
        </Text>
        <View />
      </View>
      <VideoCamera
        navigation={navigation}
        cameraActive={cameraActive}
        isFullScreen={isFullScreen}
        streamPath={streamPath}
        getInfo={getInfo}
        setCamId={setCamId}
        reload={reload}
        loading={loading}
      />
    </View>
  );
};

export default Live;
