import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  InfoIcon,
  FullScreenIcon,
  Status,
  BackIcon2,
} from '../../components/Icons/Index';

import { setIsFullScreen } from '../../redux/actions/cameraAction';
import { useDispatch, useSelector } from 'react-redux';
import CameraItem from './CameraItem';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

import {
  View,
  Text,
  FlatList,
  Pressable,
  StatusBar,
  Dimensions,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { convertToSecond, formatTime } from '../../utils';
import { setNameAI, videoActive } from '../../redux/actions/reportAction';
import { SafeAreaView } from 'react-native-safe-area-context';
const VideoCamera = ({
  navigation,
  cameraActive,
  isFullScreen,
  streamPath,
  getInfo,
  setCamId,
  type = 'livestream',
  loading = false,
  change,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const stick_time = useSelector(
    state => state.playBackReducer.filter.stick_time,
  );
  const [count, setCount] = useState(1);
  const [listPath, setListPath] = useState([]);
  const [seekVideo, setSeekVideo] = useState(false);
  const [onAndroid, setOnAndroid] = useState(false);
  const reload = useSelector(state => state.useReducer.reload);
  const [showName, setShowName] = useState(true);
  const [data, setData] = useState([]);
  const handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      dispatch(setIsFullScreen(true));
      // Orientation.lockToLandscapeLeft();

      StatusBar.setHidden(true);
    } else {
      dispatch(setIsFullScreen(false));

      StatusBar.setHidden(false);
    }
  };
  const handleFullscreen = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
      dispatch(setIsFullScreen(false));

      // dispatch(setIsFullScreen(false));
    } else {
      Orientation.lockToLandscapeLeft();
      dispatch(setIsFullScreen(true));

      // dispatch(setIsFullScreen(true));
    }
  };
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);
  useEffect(() => {
    if (type !== 'livestream' && data?.length > 0) {
      if (Platform.OS === 'ios') {
        if (cameraActive[0]?.path?.TIME_START) {
          ref.current.seek(
            Number(convertToSecond(stick_time)) -
            Number(
              convertToSecond(
                cameraActive[0]?.path?.TIME_START.split(' ')[1],
              ),
            ),
          );
        }
      }
      if (Platform.OS === 'android') {
        const setTime = setTimeout(() => {
          if (cameraActive[0]?.path?.TIME_START) {
            ref.current.seek(
              Number(convertToSecond(stick_time)) -
              Number(
                convertToSecond(
                  cameraActive[0]?.path?.TIME_START.split(' ')[1],
                ),
              ),
            );
          }
        }, 5000);
        return () => {
          clearTimeout(setTime);
        };
      }
    }
    if (type === 'livestream' && data?.length > 0) {
      setSeekVideo(!seekVideo);
    }
  }, [data]);
  useEffect(() => {
    if (
      type === 'livestream' &&
      data?.length > 0 &&
      Platform.OS === 'android'
    ) {
      if (ref.current) {
        const data1 = setTimeout(() => {
          ref.current?.seek(
            Number(convertToSecond(formatTime(new Date()))) -
            Number(
              convertToSecond(
                cameraActive[0]?.data[0]?.LAST_EDIT_PATH?.split(' ')[1],
              ),
            ),
          );
        }, 5000);
        return () => {
          clearTimeout(data1);
        };
      }
    }
  }, [seekVideo]);
  useEffect(() => {
    if (type !== 'livestream' && cameraActive?.length > 0) {
      setData([]);
      const setTime = setTimeout(() => {
        setData(cameraActive);
      }, 400);

      // if (
      //   data.length > 0 &&
      //   data[0]?.path?.PATH === cameraActive[0]?.path?.PATH
      // ) {
      //   setData(cameraActive);
      // }
      return () => {
        clearTimeout(setTime);
      };
    }
    if (type === 'livestream') {
      setData(cameraActive);
    }
  }, [cameraActive]);
  // console.log(cameraActive);
  useEffect(() => {
    const data = streamPath.filter(
      (item, index) => index >= (count - 1) * 6 && index < count * 6,
    );
    setListPath([...listPath, ...data]);
  }, [streamPath, count]);
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        Orientation.lockToPortrait();
        dispatch(setIsFullScreen(false));
        navigation.dispatch(e.data.action);
      }),
    [navigation],
  );
  useEffect(() => {
    if (Platform?.OS === 'android') {
      setOnAndroid(true);
    }
  }, []);

  const handlePressScreen = () => {
    if (isFullScreen) {
      setShowName(!showName);
    }
  };

  useEffect(() => {
    if (isFullScreen && Platform?.OS === 'android' && showName) {
      let timeOut = setTimeout(() => {
        setShowName(!showName);
      }, 4000);
      return () => clearTimeout(timeOut);
    }
  }, [isFullScreen, showName]);

  return (
    <View style={isFullScreen ? styles.contentFull : {}}>
      {
        <View style={isFullScreen ? styles.activeFull : styles.active}>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <>
                  <Pressable
                    style={
                      isFullScreen
                        ? {
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                        }
                        : {}
                    }
                    onPress={handlePressScreen}>
                    {item.path === 'no-path' ? (
                      <View style={styles.noPath}>
                        <Text style={{ color: '#fff' }}>Không có video</Text>
                      </View>
                    ) : type === 'livestream' &&
                      item?.data[0]?.PATH === 'no-path' ? (
                      <View style={styles.noPath}>
                        <Text style={{ color: '#fff' }}>Mất kết nối</Text>
                      </View>
                    ) : (
                      <Video
                        source={{
                          uri: `http://cameraai.cds.vinorsoft.com/${type}${type === 'playback/'
                              ? item?.path.PATH
                              : item?.data[0]?.PATH
                            }`,
                        }}
                        ref={ref}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        // shouldPlay={true}
                        // useNativeControls={true}
                        isLooping
                        poster={
                          type === 'playback/'
                            ? ''
                            : `http://cameraai.cds.vinorsoft.com/${type}/${item?.data[0]?.PATH.split('/')[1]
                            }/image.jpg`
                        }
                        controls={type === 'playback/' ? true : false}
                        style={
                          isFullScreen
                            ? styles.fullScreen
                            : {
                              width: '100%',
                              height: 200,
                            }
                        }
                      />
                    )}
                  </Pressable>
                  <View style={isFullScreen ? styles.infoFull : styles.info}>
                    {showName && (
                      <View style={isFullScreen ? styles.camFull : styles.cam}>
                        <View>
                          {isFullScreen ? (
                            <Pressable onPress={handleFullscreen}>
                              <BackIcon2 />
                            </Pressable>
                          ) : (
                            type === 'playback/'
                              ? item.status === 'On'
                              : item.data[0].STATUS === 'On'
                          ) ? (
                            <Status />
                          ) : (
                            <Status color="#ff8d00" />
                          )}
                        </View>
                        <View>
                          <Text
                            style={
                              isFullScreen
                                ? { fontSize: 14, color: '#fff', paddingLeft: 8 }
                                : { color: '#000' }
                            }>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    )}

                    {!isFullScreen && item.path !== 'no-path' && (
                      <>
                        <View style={styles.setting}>
                          <View style={styles.iconSetting}>
                            <TouchableOpacity
                              onPress={() => getInfo(item.code)}>
                              <InfoIcon />
                            </TouchableOpacity>
                          </View>

                          {(type === 'livestream' || onAndroid) && (
                            <TouchableOpacity
                              onPress={handleFullscreen}
                              style={styles.iconSetting}>
                              <FullScreenIcon
                                color={isFullScreen ? '#fff' : 'black'}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </>
                    )}
                  </View>
                </>
              );
            })
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      }
      {!isFullScreen && type !== 'playback/' && (
        <SafeAreaView style={{ paddingBottom: 50 }}>
          <View style={!onAndroid ? { height: '100%' } : { height: '68%' }}>
            <FlatList
              onEndReached={() => {
                setCount(count + 1);
              }}
              onEndReachedThreshold={0}
              data={streamPath}
              scrollEnabled
              renderItem={({ item, index }) => (
                <CameraItem
                  key={index}
                  id={item.code}
                  setCamId={setCamId}
                  title={item?.name}
                  path={item?.data[0]?.PATH}
                  type={type}
                />
              )}
              numColumns={2}
              style={styles.list}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              keyExtractor={(item, index) => index}
            // maxHeight={400}
            />
          </View>
          <View style={{ height: 48 }} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default VideoCamera;
