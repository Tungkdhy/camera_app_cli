import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, Alert } from 'react-native';

import {
  Back,
  DateTime,
  Close
} from '../../components/Icons/Index';
import { styles } from './styles';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListPlayBack as play,
  setDay,
  setTime,
  setTimeEnd,
  setTimeStick,
} from '../../redux/actions/playBackAction';
import { getInfoCamera } from '../../redux/actions/cameraAction';
import axiosClient from '../../services/axiosClient';
import {
  formatDDMMYY,
  formatHour,
  formatDDMMYY2,
  formatTimehp,
} from '../../utils';
import StickTime from '../../components/StickTime/StickTime';
import VideoCamera from '../../components/Live/VideoCamera';
export default function PlayBack({ navigation, route }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState();
  const [camId, setCamId] = useState();
  const [change, setChange] = useState(true)
  const playback = useSelector(state => state.playBackReducer);
  const cameraInfo = useSelector(state => state.useReducer.camera_info);
  const [modalVisible, setModalVisible] = useState(false);
  const isFullScreen = useSelector(state => state.useReducer.isFullScreen);
  const stick_time = useSelector(
    state => state.playBackReducer.filter.stick_time,
  );
  const getInfo = async (code) => {
    try {
      setModalVisible(!modalVisible);
      const res = await axiosClient.get(
        `/cameraManagement/get-camera-info-by-code/?camera_code=${code}`,
      );
      if (res) {
        dispatch(getInfoCamera(res));
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Lấy thông tin camera không thành công');
    }
  };
  useEffect(() => {
    setCamId(route.params.active);
    async function getListPlayBack() {
      try {
        const day = { day: playback.filter.day };
        const res = await axiosClient.get(
          '/camPlayback/get-list-path-timeline/',
          {
            params: {
              list_camera_code: JSON.stringify({
                data: [{ camera_code: route.params.active }],
              }),
              ...day,
              time_line: stick_time,
              // time_end: playback.filter.timeEnd,
            },
          },
        );
        const playbacks = res.time_line.map(item => {
          return {
            code: item.camera_code,
            path: item.path,
            // time: item.total_time,
            name: item.name_cam,
            status: item.status
          };
        });
        dispatch(play(playbacks));
      } catch (e) {
        console.log(e);
      }
    }
    getListPlayBack();
  }, [playback.filter.day, route.params.active, stick_time]);
  useEffect(() => {
    const camActive = playback.playBacks.filter(item => {
      return item.code === camId;
    });
    setCameraActive(camActive);
  }, [playback.playBacks, camId]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleHeader}>Thông tin camera</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.iconModal}>
                <Close />
              </Pressable>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Địa chỉ</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>
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
                <View style={styles.descriptionInfo}>
                  <Text>
                    {cameraInfo.length > 0 && cameraInfo[0]?.WAREHOUSE_NAME}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Đướng dẫn RPST</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>
                    {cameraInfo.length > 0 && cameraInfo[0]?.RTSP_CHINH}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Nguồn</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>Chính</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Độ phân giải</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>
                    {cameraInfo.length > 0 && cameraInfo[0]?.MAIN_SOURCE}
                  </Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Trạng thái</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>
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
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          dispatch(setDay(formatDDMMYY2(date)));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {!isFullScreen && (
        <>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                dispatch(setDay(formatDDMMYY2(new Date())));
                dispatch(setTime('00:00'));
                dispatch(setTimeEnd('23:59'));
                dispatch(play([]));
                dispatch(setTimeStick("00:00:00"))
                navigation.navigate('Playback');
              }}>
              <Back />
            </Pressable>
            <Text style={styles.text}>{route.params?.activeName}</Text>
            <Pressable onPress={() => setOpen(true)}>
              <View>
                <DateTime />
              </View>
            </Pressable>
          </View>
        </>
      )}
      <VideoCamera
        navigation={navigation}
        cameraActive={cameraActive}
        isFullScreen={isFullScreen}
        streamPath={playback.playBacks}
        setCamId={setCamId}
        getInfo={getInfo}
        type="playback/"
        change={change}
      />
      {!isFullScreen && <StickTime setChange={setChange} day={playback.filter.day} code={route.params.active} />}
    </View>
  );
}
