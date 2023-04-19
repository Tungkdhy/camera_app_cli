import {
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import {useEffect, useState} from 'react';
import {
  SearchIcon,
  Back,
  PlayBackDownIcon,
  BackIcon2,
} from '../../components/Icons/Index';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListReport,
  setDayReport,
  setTimeReport,
  setIsFullScreen,
  videoActive,
  servicePackage,
  setAiCode,
} from '../../redux/actions/reportAction';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {formatTimehp, formatDDMMYY} from '../../utils';
import Orientation from 'react-native-orientation-locker';
import {styles} from './styles';
import axiosClient from '../../services/axiosClient';
export default function Payment({route, navigation}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const report = useSelector(state => state.reportReducer);

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.item}>
        <View style={styles.image}>
          <Image source={require('../../assets/images/Video.png')} />
        </View>
        <Pressable
          style={styles.detail}
          onPress={() => {
            dispatch(
              videoActive({
                name: `${route.params.camera.NAME_CAM} - ${formatTimehp(
                  item.TIME_START.split(' ')[1],
                )}`,
                path: item.PATH,
              }),
            );
            handleFullscreen()
          }}>
          <View style={styles.time}>
            <Text>{formatDDMMYY(item.TIME_START.split(' ')[0])}</Text>
            <Text>{item.time}</Text>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '600',
              paddingTop: 2,
              paddingBottom: 4,
            }}>{`${route.params.camera.NAME_CAM} - ${formatTimehp(
            item.TIME_START.split(' ')[1],
          )}`}</Text>
          <Text style={styles.serviceItem}>{item.SUBJECT_NAME}</Text>
        </Pressable>
      </View>
    );
  };
  const handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      dispatch(setIsFullScreen(true));

      StatusBar.setHidden(true);
    } else {
      dispatch(setIsFullScreen(false));

      StatusBar.setHidden(false);
    }
  };
  const handleFullscreen = () => {
    if (report.isFullScreen) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToLandscapeLeft();
    }
  };
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);
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
              day_start: formatDDMMYY(report.filter.day),
              day_end: formatDDMMYY(report.filter.time),
            },
          });
          dispatch(getListReport(res.data));
        }
      } catch (e) {}
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
        console.log(res);
        dispatch(servicePackage(res));
      } catch (e) {
        console.log(e);
      }
    }
    getPackage();
  }, []);
  console.log(
    `http://cameraai.cds.vinorsoft.com/event${report.video_active.path}`,
  );
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
          if (report.filter.day > date) {
            Alert.alert('Chọn ngày bắt đầu nhỏ hơn ngày kết thúc');
          } else {
            dispatch(setTimeReport(date));
          }
          setOpen2(false);
        }}
        onCancel={() => {
          setOpen3(false);
        }}
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
            <View>
              <SearchIcon color={'black'} />
            </View>
          </View>
          <ScrollView style={{flexGrow: 0}} horizontal>
            <View style={styles.filter}>
              <Pressable onPress={() => setOpen(true)} style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text>{formatDDMMYY(report.filter.day)}</Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setOpen2(true)}
                style={styles.btnFilter}>
                <View style={styles.textContent}>
                  <Text>{formatDDMMYY(report.filter.time)}</Text>
                  <View>
                    <PlayBackDownIcon />
                  </View>
                </View>
              </Pressable>
              <View style={styles.input_picker}>
                <Picker
                  selectedValue={report.filter.ai_code}
                  onValueChange={(itemValue, itemIndex) => {
                    dispatch(setAiCode(itemValue));
                  }}>
                  {report.package.length > 0 &&
                    report.package.map(service => {
                      return (
                        <Picker.Item
                          key={service.CODE}
                          label={service.SUBJECT_NAME}
                          value={service.CODE}
                        />
                      );
                    })}
                </Picker>
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {!report.isFullScreen && (
        <View style={styles.content}>
          <FlatList data={report.reports} renderItem={renderItem} />
        </View>
      )}
      {report.isFullScreen && (
        <View style={report.isFullScreen ? styles.contentFull : {}}>
          <View style={report.isFullScreen ? styles.activeFull : styles.active}>
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
                    uri: `http://cameraai.cds.vinorsoft.com/event/${report.video_active.path}`,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={true}
                  isLooping
                  controls={true}
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
              <View style={report.isFullScreen ? styles.infoFull : styles.info}>
                <View style={styles.cam}>
                  <View>
                    {report.isFullScreen && (
                      <Pressable
                        onPress={handleFullscreen}>
                        <BackIcon2 />
                      </Pressable>
                    )}
                  </View>
                  <Text
                    style={
                      report.isFullScreen ? {fontSize: 18, color: '#fff'} : {}
                    }>
                    {report.video_active.name}
                  </Text>
                </View>
              </View>
            </>
          </View>
        </View>
      )}
    </View>
  );
}
