import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Pressable, FlatList, Image} from 'react-native';
import {Back, SearchIcon, PlayBackDownIcon} from '../../components/Icons/Index';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListPlayBack as play,
  setDay,
  setTime,
  setTimeEnd,
} from '../../redux/actions/playBackAction';
import axiosClient from '../../services/axiosClient';
import {formatDDMMYY, formatHour, formatTimehp} from '../../utils';
import VideoCamera from '../../components/Live/VideoCamera';
export default function PlayBack({navigation, route}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [cameraActive, setCameraActive] = useState();
  const [camId, setCamId] = useState();
  const playback = useSelector(state => state.playBackReducer);
  console.log(playback);
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
        const day = {day: playback.filter.day};
        const time = {time: playback.filter.time};
        const res = await axiosClient.get(
          'camPlayback/get-list-cam-playback/',
          {
            params: {
              list_camera_code: JSON.stringify({data: data}),
              ...day,
              time_start:playback.filter.time,
              time_end:playback.filter.timeEnd,
            },
          },
        );
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
  }, [route.params.wareHouse, playback.filter.day, playback.filter.time,playback.filter.timeEnd]);
  useEffect(() => {
    const camActive = playback.playBacks.filter(item => {
      return item.code === camId;
    });
    setCameraActive(camActive);
  }, [playback.playBacks, camId]);
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
          dispatch(setTime(formatHour(date)));
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
          setOpen3(false);
          dispatch(setTimeEnd(formatHour(date)));
        }}
        onCancel={() => {
          setOpen3(false);
        }}
      />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            dispatch(setDay(formatDDMMYY(new Date())));
            dispatch(setTime('00:00'));
            dispatch(setTimeEnd('23:59'));
            dispatch(play([]))
            navigation.navigate('Playback');
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
          <View style={styles.textContent}>
            <Text>{playback.filter.day}</Text>
            <View>
              <PlayBackDownIcon />
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => setOpen2(true)} style={styles.btnFilter}>
          <View style={styles.textContent}>
            <Text>{playback.filter.time}</Text>
            <View>
              <PlayBackDownIcon />
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => setOpen3(true)} style={styles.btnFilter}>
          <View style={styles.textContent}>
            <Text>{playback.filter.timeEnd}</Text>
            <View>
              <PlayBackDownIcon />
            </View>
          </View>
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
