import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { styles } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeStick } from '../../redux/actions/playBackAction';
import { convertTimeToPx, convertToSecond, covertWidthToHour } from '../../utils';
import { playBackApi } from '../../services/api/playBackApi';
const StickTime = ({ code, day, setChange }) => {
  const [list, setList] = useState([
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]);
  const ref = useRef();
  const debouce = useRef();
  const dispatch = useDispatch();
  const [timelines, setTimelines] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const [position, setPosition] = useState();
  useEffect(() => {
    setPosition(convertTimeToPx(stick_time));
  }, []);
  const stick_time = useSelector(
    state => state.playBackReducer.filter.stick_time,
  );

  const playback = useSelector(state => state.playBackReducer);
  const [dis, setDis] = useState([
    {
      start: 100,
      end: 400,
    },
    {
      start: 600,
      end: 800,
    },
  ]);
  useEffect(() => {
    const getTimeLine = async () => {
      const res = await playBackApi.getTimelines({
        list_camera_code: JSON.stringify({
          data: [
            {
              camera_code: code,
            },
          ],
        }),
        day: day,
      });
      if (res.length > 0) {
        setTimelines(res[0].timeline_record);
      }
    };
    getTimeLine();
  }, [code, day]);
  // console.log(convertTimeToPx(stick_time) , '===,', stick_time);
  console.log(stick_time);
  return (
    <View style={{ position: 'relative', paddingRight: 16 }}>
      <Text style={styles.time}>
        {playback.filter.day} {stick_time}
      </Text>
      <ScrollView
        onScrollEndDrag={event => {
          const x = event.nativeEvent.contentOffset.x / 100;
          console.log(x);
          setPosition(event.nativeEvent.contentOffset.x);
          setChange(false);
          if (debouce.current) {
            clearTimeout(debouce.current);
          }
          debouce.current = setTimeout(() => {
            dispatch(setTimeStick(covertWidthToHour(x)));
            setChange(true);
          }, 1000);
        }}
        // scrollEventThrottle={16}
        // style={{ flexGrow: 0, position: 'relative' }}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentOffset={{ y: 0, x: position }}
        ref={ref}>
        <View style={styles.container}>
          {timelines?.length > 0 &&
            timelines.map((item, index) => {
              if (item.TIME_END) {
                return (
                  <View
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left:
                        screenWidth / 2 +
                        convertTimeToPx(item?.TIME_START) -
                        15,
                      right: 2400 - convertTimeToPx(item?.TIME_END),
                      backgroundColor: '#29b1ed',
                      zIndex: 2,
                    }}
                  />
                );
              } else {
                // return <React.Fragment key={index}></React.Fragment>
              }
            })}
          <View
            style={{
              width: screenWidth / 2 - 15,
              height: 40,
              backgroundColor: 'black',
            }}
          />
          {list.map(item => (
            <View style={styles.item} key={item}>
              <Text style={{ color: 'white' }}>{item}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            width: screenWidth / 2 - 15,
            height: 40,
            backgroundColor: 'black',
          }}
        />
      </ScrollView>
      <View style={styles.vach} />
    </View>
  );
};

export default StickTime;
