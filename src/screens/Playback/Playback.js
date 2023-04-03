import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, FlatList, Image} from 'react-native';
import {Back, SearchIcon} from '../../components/Icons/Index';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListPlayBack as play,
  setDay,
  setTime,
} from '../../redux/actions/playBackAction';
import axiosClient from '../../services/axiosClient';
import {formatDDMMYY, formatHour, formatTimehp} from '../../utils';
import VideoCamera from '../../components/Live/VideoCamera';
export default function PlayBack({navigation, route}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [cameraActive, setCameraActive] = useState();
  const [camId, setCamId] = useState();
  const playback = useSelector(state => state.playBackReducer);
  const isFullScreen = useSelector(state => state.useReducer.isFullScreen);
  const getInfo = () => {};
  useEffect(() => {
    setCamId(route.params.active);
    async function getListPlayBack() {
      try {
        const data = route.params.cam.map(item => {
          return {
            camera_code: item.CODE,
          };
        });
        const day =
          playback.filter.day === 'All' ? {} : {day: playback.filter.day};
        const time =
          playback.filter.time === 'ALL' ? {} : {time: playback.filter.time};
        const res = await axiosClient.get(
          'camPlayback/get-list-cam-playback/',
          {
            params: {
              list_camera_code: JSON.stringify({data: data}),
              ...day,
              ...time,
            },
          },
        );
        console.log(res.data);
        const playbacks = res.data.map(item => {
          return {
            code: item.camera_code,
            path: item.path,
            time: item.total_time,
            name:
              item.name + '- ' + formatTimehp(item.time_start.split(' ')[1]),
          };
        });

        dispatch(play(playbacks));
      } catch (e) {
        console.log(e);
      }
    }
    getListPlayBack();
  }, [route.params.wareHouse, playback.filter.day, playback.filter.time]);
  useEffect(() => {
    const camActive = playback.playBacks.filter(item => {
      return item.code === camId;
    });
    setCameraActive(camActive);
  }, [playback.playBacks, camId]);
  console.log(cameraActive);
  return (
    <View style={styles.container}>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          dispatch(setDay(formatDDMMYY(date)));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        open={open2}
        date={new Date()}
        onConfirm={date => {
          setOpen2(false);
          console.log(formatHour(date));
          dispatch(setTime(formatHour(date)));
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            dispatch(setDay('All'));
            dispatch(setTime('All'));
            navigation.navigate('Playback', {
              name: 'Playback',
            });
            // dispatch(getPathStream([]));
            // navigation.navigate('Stream');
          }}>
          <Back />
        </Pressable>
        <Text style={styles.text}>{route.params.wareHouse}</Text>
        <View>
          <SearchIcon color={'black'} />
        </View>
      </View>
      <View style={styles.filter}>
        <Pressable onPress={() => setOpen(true)} style={styles.btnFilter}>
          <Text>
            {playback.filter.day === 'All'
              ? 'Tất cả ngày'
              : playback.filter.day}
          </Text>
        </Pressable>
        <Pressable onPress={() => setOpen2(true)} style={styles.btnFilter}>
          <Text>
            {playback.filter.time === 'All'
              ? 'Tất cả thời gian'
              : playback.filter.time}
          </Text>
        </Pressable>
        <Pressable onPress={() => setOpen2(true)} style={styles.btnFilter}>
          <Text>
            {playback.filter.time === 'All'
              ? 'Tất cả thời gian'
              : playback.filter.time}
          </Text>
        </Pressable>
      </View>
      <VideoCamera
        navigation={navigation}
        cameraActive={cameraActive}
        isFullScreen={isFullScreen}
        streamPath={playback.playBacks}
        setCamId={setCamId}
        getInfo={getInfo}
      />
    </View>
  );
}
