import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  ScrollView,
  Alert,
  Dimensions,
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
  setTimeEnd,
  setIsFullScreen,
  videoActive,
} from '../../redux/actions/reportAction';
import DatePicker from 'react-native-date-picker';
import {formatTimehp, formatHour, formatDDMMYY} from '../../utils';
import VideoPlayer from 'react-native-video-controls';
import {styles} from './styles';
import axiosClient from '../../services/axiosClient';

export default function Payment({route, navigation}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const report = useSelector(state => state.reportReducer);
 
  const renderItem = ({item, index}) => {
    // console.log(item.PATH);
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
                  item.TIME_START,
                )}`,
                path: item.PATH,
              }),
            );
            dispatch(setIsFullScreen());
          }}>
          <View style={styles.time}>
            <Text>{formatDDMMYY(item.PATH.split('/')[4])}</Text>
            <Text>{item.time}</Text>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '600',
              paddingTop: 6,
            }}>{`${route.params.camera.NAME_CAM} - ${formatTimehp(
            item.TIME_START,
          )}`}</Text>
          <Text style={styles.serviceItem}>Chuyển động</Text>
        </Pressable>
      </View>
    );
  };
  useEffect(() => {
    async function getVideoReport() {
      try {
        if (report.filter.day > report.filter.time) {
          Alert.alert('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
        } else {
          const res = await axiosClient.get('/camAI/get-list-cam-ai/', {
            params: {
              camera_code: route.params.camera.CODE,
              ai_service_code: '20230222000000000001',
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
  ]);
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
      <DatePicker
        modal
        mode="time"
        open={open3}
        date={new Date()}
        onConfirm={date => {
          dispatch(setTimeEnd(formatHour(date)));
          setOpen3(false);
        }}
        onCancel={() => {
          setOpen3(false);
        }}
      />

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
          <Pressable onPress={() => setOpen2(true)} style={styles.btnFilter}>
            <View style={styles.textContent}>
              <Text>{formatDDMMYY(report.filter.time)}</Text>
              <View>
                <PlayBackDownIcon />
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => setOpen3(true)} style={styles.btnFilter}>
            <View style={styles.textContent}>
              <Text>Chuyển động</Text>
              <View>
                <PlayBackDownIcon />
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      {/* <VideoPlayer
        source={{uri: `http://42.96.41.91:10711/data/RECORD/20230322000000000064/2023-04-06/17:31/motion_1.m3u8`}}
        // navigator={this.props.navigator}
      /> */}
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
                    uri: `http://42.96.41.91:10711/data/RECORD/20230322000000000064/2023-04-06/17:31/motion_1.m3u8`,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={true}
                  // useNativeControls={true}
                  isLooping
                  controls={true}
                  style={
                    report.isFullScreen
                      ? styles.fullScreen
                      : {
                    width: 380,
                    height: 200,
                  }}
                />
              </View>
              <View style={report.isFullScreen ? styles.infoFull : styles.info}>
                <View style={styles.cam}>
                  <View>
                    {report.isFullScreen && (
                      <Pressable
                        onPress={() => {
                          dispatch(setIsFullScreen());
                        }}>
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
