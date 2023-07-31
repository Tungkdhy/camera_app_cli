import { useEffect, useState } from 'react';
import { Text, View, Modal, Alert, TouchableOpacity } from 'react-native';
import { convertArrayToJson, formatDateYYYYMMDD } from '../../utils';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Back, DateTime, Close } from '../../components/Icons/Index';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListPlayBack as play,
  setDay,
  setTime,
  setTimeEnd,
} from '../../redux/actions/playBackAction';
import { getInfoCamera } from '../../redux/actions/cameraAction';
import axiosClient from '../../services/axiosClient';
import { formatDDMMYY2 } from '../../utils';
import StickTime from '../../components/StickTime/StickTime';
import VideoCamera from '../../components/Live/VideoCamera';
export default function PlayBack({ navigation, route }) {
  const dispatch = useDispatch();
  // console.log(convertArrayToJson());
  const [open, setOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState();
  const [camId, setCamId] = useState();
  const [change, setChange] = useState(true);
  const playback = useSelector(state => state.playBackReducer);
  const [dayActive, setDayActive] = useState([]);
  const cameraInfo = useSelector(state => state.useReducer.camera_info);
  const [modalVisible, setModalVisible] = useState(false);
  const isFullScreen = useSelector(state => state.useReducer.isFullScreen);
  const stick_time = useSelector(
    state => state.playBackReducer.filter.stick_time,
  );
  // console.log(stick_time);
  const getInfo = async code => {
    try {
      setModalVisible(!modalVisible);
      const res = await axiosClient.get(
        `/cameraManagement/get-camera-info-by-code/?camera_code=${code}`,
      );
      console.log(res);
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
    // console.log(stick_time);
    async function getListPlayBack() {
      try {
        const day = { day: formatDDMMYY2(playback.filter.day) };
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
        // console.log(res);
        const playbacks = res.time_line.map(item => {
          return {
            code: item.camera_code,
            path: item.path,
            // time: item.total_time,
            name: item.name_cam,
            status: item.status,
          };
        });
        setDayActive(...res.day_playback);
        dispatch(play(playbacks));
      } catch (e) {
        console.log(e);
      }
    }
    getListPlayBack();
  }, [playback.filter.day, route.params.active, stick_time]);
  // console.log(dayActive);
  // useEffect(() => {
  //   const camActive2 = playback.playBacks.filter(item => {
  //     return item.code === camId;
  //   });
  //   setCameraActive(camActive2);
  // }, [playback.playBacks, camId, stick_time]);
  // console.log(cameraActive);
  console.log(cameraInfo[0]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewDate}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleHeader}>Chọn ngày</Text>
              <TouchableOpacity
                onPress={() => setOpen(false)}
                style={styles.iconModal}>
                <Close />
              </TouchableOpacity>
            </View>
            <Calendar
              // current={'2023-07-24'}
              // Callback that gets called when the user selects a day
              onDayPress={day => {
                // console.log(day);
                dispatch(setDay(Date.parse(day.dateString)));
              }}
              // Mark specific dates as marked
              markedDates={convertArrayToJson(
                [...dayActive],
                formatDateYYYYMMDD(playback.filter.day),
              )}
            />
          </View>
        </View>
      </Modal>

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
              {/* <View style={styles.infoItem}>
                <View style={styles.titleInfo}>
                  <Text style={styles.title}>Đướng dẫn RPST</Text>
                </View>
                <View style={styles.descriptionInfo}>
                  <Text>
                    {cameraInfo.length > 0 && cameraInfo[0]?.RTSP_CHINH}
                  </Text>
                </View>
              </View> */}
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
                    {cameraInfo.length > 0 && cameraInfo[0]?.STATUS_ACTIVE === 0
                      ? 'Đang trực tuyến'
                      : cameraInfo[0]?.STATUS_ACTIVE === 3
                        ? 'Sẵn sàng'
                        : 'Mất kết nối'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {!isFullScreen && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setDay(new Date()));
                dispatch(setTime('00:00'));
                dispatch(setTimeEnd('23:59'));
                dispatch(play([]));
                // dispatch(setTimeStick("00:00:00"))
                navigation.navigate('Playback');
              }}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.text}>{route.params?.activeName}</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <DateTime />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
      <VideoCamera
        navigation={navigation}
        cameraActive={playback.playBacks}
        isFullScreen={isFullScreen}
        streamPath={playback.playBacks}
        setCamId={setCamId}
        getInfo={getInfo}
        type="playback/"
        change={change}
      />
      {!isFullScreen && (
        <StickTime
          setChange={setChange}
          day={playback.filter.day}
          code={route.params.active}
        />
      )}
    </View>
  );
}
