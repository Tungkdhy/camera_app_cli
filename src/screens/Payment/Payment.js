import {
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';

import { useCallback, useEffect, useState } from 'react';

import { Back, PlayBackDownIcon, BackIcon2 } from '../../components/Icons/Index';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListReport,
  setDayReport,
  setTimeReport,
  setIsFullScreen,
  videoActive,
  servicePackage,
} from '../../redux/actions/reportAction';
import DatePicker from 'react-native-date-picker';
import { formatTimehp, formatDDMMYY2, sorterDateInArr } from '../../utils';
import Modal from './Modal/Modal';
import Orientation from 'react-native-orientation-locker';
import { styles } from './styles';
import axiosClient from '../../services/axiosClient';
export default function Payment({ route, navigation }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const report = useSelector(state => state.reportReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSetShowModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);
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
          console.log('Ok');
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
  const handleOrientation = useCallback(orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      dispatch(setIsFullScreen(true));
      StatusBar.setHidden(true);
    } else {
      dispatch(setIsFullScreen(false));
      StatusBar.setHidden(false);
    }
  }, []);
  const handleFullscreen = () => {
    if (report.isFullScreen) {
      Orientation.lockToPortrait();

      dispatch(setIsFullScreen(false));
    } else {
      Orientation.lockToLandscapeLeft();
      dispatch(setIsFullScreen(true));
    }
  };
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, [handleOrientation]);
  useEffect(() => {
    async function getVideoReport() {
      try {
        if (report.filter.day > report.filter.time) {
          Alert.alert('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
        } else {
          const res = await axiosClient.get('/camAI/get-list-cam-ai/', {
            params: {
              camera_code: route.params.camera.CODE,
              ai_service_code: report.filter.ai_code,
              day_start: formatDDMMYY2(report.filter.day),
              day_end: formatDDMMYY2(report.filter.time),
            },
          });
          const sortData = res?.data?.reverse();
          dispatch(getListReport(sortData));
        }
      } catch (e) { }
    }
    getVideoReport();
  }, [
    route.params.camera.CODE,
    report.filter.day,
    report.filter.time,
    report.filter.timeEnd,
    report.filter.ai_code,
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
      handleFullscreen();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [handleFullscreen]);

  // JSX

  return (
    <View style={styles.container}>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={date => {
          if (date > report.filter.time) {
            Alert.alert('Chọn ngày bắt đầu nhỏ hơn ngày kết thúc');
          } else {
            dispatch(setDayReport(date));
          }
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        mode="date"
        open={open2}
        date={new Date()}
        onConfirm={date => {
          if (date < report.filter.day) {
            Alert.alert('Chọn ngày kết thúc lớn hơn ngày bắt đầu');
          } else {
            dispatch(setTimeReport(date));
          }
          setOpen2(false);
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
      <Modal
        filter={report.filter.ai_code}
        isShow={modalVisible}
        onShowModal={handleSetShowModal}
      />
      {!report.isFullScreen && (
        <>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                dispatch(setDayReport(new Date()));
                dispatch(setTimeReport(new Date()));
                navigation.navigate('Smart');
              }}>
              <Back />
            </Pressable>
            <Text style={styles.text}>{route.params.camera.NAME_CAM}</Text>
            <View style={{ width: 20, height: 20 }} />
          </View>
          <ScrollView style={{ flexGrow: 0 }} horizontal>
            <View style={styles.filter}>
              <Pressable onPress={() => setOpen(true)} style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text style={{ color: '#000' }}>
                    {formatDDMMYY2(report.filter.day)}
                  </Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </Pressable>
              <Pressable
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
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text style={{ color: '#000' }}>{report.filter.name}</Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </>
      )}
      {!report.isFullScreen && (
        <View style={styles.content}>
          <FlatList data={report.reports} renderItem={renderItem} />
        </View>
      )}
      {report.isFullScreen &&
        report.video_active?.length > 0 &&
        report.video_active.map((item, index) => {
          return (
            <View
              key={index}
              style={report.isFullScreen ? styles.contentFull : {}}>
              <View
                style={report.isFullScreen ? styles.activeFull : styles.active}>
                <>
                  <View
                    style={
                      report.isFullScreen
                        ? {
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
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
                  </View>
                </>
              </View>
            </View>
          );
        })}
    </View>
  );
}
