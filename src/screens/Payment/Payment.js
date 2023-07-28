import {
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useCallback, useEffect, useState } from 'react';
import {
  Back,
  PlayBackDownIcon,
  BackIcon2,
  Close,
} from '../../components/Icons/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListReport,
  setDayReport,
  setTimeReport,
  setIsFullScreen,
  videoActive,
  servicePackage,
} from '../../redux/actions/reportAction';
import {
  formatTimehp,
  formatDDMMYY2,
  sorterDateInArr,
  formatDateYYYYMMDD,
  convertArrayToJson,
} from '../../utils';
import Orientation from 'react-native-orientation-locker';
import { styles } from './styles';
import axiosClient from '../../services/axiosClient';
export default function Payment({ route, navigation }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const report = useSelector(state => state.reportReducer);
  const [dayActive, setDayActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(false);
  const camera = useSelector(state => state.useReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePressScreen = () => {
    if (report.isFullScreen) {
      setShowName(!showName);
    }
  };
  const handleSetShowModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const handleOrientation = orientation => {
    // console.log(orientation);
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      dispatch(setIsFullScreen(true));
      // StatusBar.setHidden(true);
    } else {
      dispatch(setIsFullScreen(false));
      // StatusBar.setHidden(false);
      // console.log('run log dispat');
    }
  };
  const handleFullscreen = () => {
    // console.log(report.isFullScreen);
    if (report.isFullScreen) {
      Orientation.lockToPortrait();
      // console.log('run full');
      dispatch(setIsFullScreen(false));
    } else {
      Orientation.lockToLandscapeLeft();
      dispatch(setIsFullScreen(true));
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(
            videoActive({
              name: `${route.params.camera.NAME_CAM} - ${formatTimehp(
                item.TIME_START.split(' ')[1],
              )}`,
              path: item.PATH,
            }),
          );
          handleFullscreen();
        }}
        key={index}
        style={styles.item}>
        <View style={styles.image}>
          <Image
            style={{ width: '120%', borderRadius: 4 }}
            source={require('../../assets/images/Video.png')}
          />
        </View>

        <Pressable
          style={styles.detail}
          onPress={() => {
            dispatch(
              videoActive({
                name: `${route.params.camera?.NAME_CAM} - ${formatTimehp(
                  item.TIME_START.split(' ')[1],
                )}`,
                path: item.PATH,
              }),
            );
            handleFullscreen();
          }}>
          <View style={styles.time}>
            <Text style={{ fontSize: 12 }}>
              {' '}
              {formatDDMMYY2(item.TIME_START.split(' ')[0])}
            </Text>
            <Text>{item.time}</Text>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '600',
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 4,
            }}>{`${route.params.camera.NAME_CAM} - ${formatTimehp(
              item.TIME_START.split(' ')[1],
            )}`}</Text>
          <Text style={styles.serviceItem}>{item.SUBJECT_NAME}</Text>
        </Pressable>
      </Pressable>
    );
  };

  useEffect(() => {
    async function getVideoReport() {
      try {
        if (report.filter.day > report.filter.time) {
          Alert.alert('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
        } else {
          setLoading(true);
          const service = report.filter?.ai_code
            ? { ai_service_code: report.filter?.ai_code }
            : {};
          const res = await axiosClient.get('/camAI/get-list-cam-ai/', {
            params: {
              camera_code: route.params.camera.CODE,
              ...service,
              day_start: formatDDMMYY2(report.filter.day),
              day_end: formatDDMMYY2(report.filter.time),
            },
          });

          const sortData = res?.data?.reverse();
          const day = res.AI_day.map(item => item.TIME);
          setLoading(false);

          setDayActive(day);
          dispatch(getListReport(sortData));
        }
      } catch (e) {
        setLoading(false);
      }
    }
    getVideoReport();
  }, [
    route.params.camera.CODE,
    report.filter.day,
    report.filter.time,
    report.filter.timeEnd,
    report.filter?.ai_code,
  ]);
  useEffect(() => {
    async function getPackage() {
      try {
        const res = await axiosClient.get('/service/get-list-services/');
        dispatch(servicePackage(res));
      } catch (e) { }
    }
    getPackage();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (report.isFullScreen) {
        handleFullscreen();
        return true;
      } else {
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [report.isFullScreen]);

  // JSX
  console.log(formatDateYYYYMMDD(report.filter.day));
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
              current={formatDateYYYYMMDD(report.filter.day)}
              onDayPress={day => {
                // console.log(day);
                dispatch(setDayReport(Date.parse(day.dateString)));
              }}
              markedDates={convertArrayToJson(
                [...dayActive, formatDateYYYYMMDD(report.filter.day)],
                formatDateYYYYMMDD(report.filter.day),
              )}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open2}
        onRequestClose={() => {
          setOpen2(!open2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewDate}>
            <View style={styles.modalHeader}>
              <Text style={styles.titleHeader}>Chọn ngày</Text>
              <TouchableOpacity
                onPress={() => setOpen2(false)}
                style={styles.iconModal}>
                <Close />
              </TouchableOpacity>
            </View>
            <Calendar
              current={formatDateYYYYMMDD(report.filter.time)}
              onDayPress={day => {
                dispatch(setTimeReport(Date.parse(day.dateString)));
              }}
              markedDates={convertArrayToJson(
                [...dayActive, formatDateYYYYMMDD(report.filter.time)],
                formatDateYYYYMMDD(report.filter.time),
              )}
            />
          </View>
        </View>
      </Modal>
      {!report.isFullScreen && (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setDayReport(new Date()));
                dispatch(setTimeReport(new Date()));
                navigation.goBack();
              }}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.text}>{route.params.camera.NAME_CAM}</Text>
            <View style={{ width: 20, height: 20 }} />
          </View>
          <ScrollView style={{ flexGrow: 0 }} horizontal>
            <View style={styles.filter}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text style={{ color: '#000' }}>
                    {formatDDMMYY2(report.filter.day)}
                  </Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOpen2(true)}
                style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text style={{ color: '#000' }}>
                    {formatDDMMYY2(report.filter.time)}
                  </Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
      {!report.isFullScreen && (
        <View style={styles.content}>
          {report.reports.length > 0 ? (
            <FlatList data={report.reports} renderItem={renderItem} />
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
                // paddingBottom: 12,
              }}>
              {loading ? <ActivityIndicator /> : <Text>Không có dữ liệu</Text>}
            </View>
          )}
        </View>
      )}
      {report.isFullScreen &&
        report.video_active?.length > 0 &&
        report.video_active.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={report.isFullScreen ? styles.contentFull : {}}
              onPress={handlePressScreen}>
              <View
                style={report.isFullScreen ? styles.activeFull : styles.active}>
                <View
                  style={
                    report.isFullScreen
                      ? {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                      }
                      : {}
                  }>
                  <Video
                    source={{
                      uri: `http://cameraai.cds.vinorsoft.com/event/${item.path}`,
                    }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={true}
                    isLooping
                    controls={true}
                    fullscreen={true}
                    style={
                      report.isFullScreen
                        ? styles.fullScreen
                        : {
                          width: '100%',
                          height: 240,
                        }
                    }
                  />
                </View>
                <View
                  style={report.isFullScreen ? styles.infoFull : styles.info}>
                  {showName && (
                    <View style={styles.cam}>
                      <View>
                        {report.isFullScreen && (
                          <Pressable onPress={handleFullscreen}>
                            <BackIcon2 />
                          </Pressable>
                        )}
                      </View>

                      <Text
                        style={
                          report.isFullScreen
                            ? { fontSize: 14, color: '#fff' }
                            : {}
                        }>
                        {item.name}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
}
