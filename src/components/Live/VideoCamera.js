import React, { useCallback, useEffect, useRef } from 'react';

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
  Platform,
  BackHandler,
} from 'react-native';
import { styles } from './styles';
import { convertToSecond } from '../../utils';
import { videoActive } from '../../redux/actions/reportAction';
const VideoCamera = ({
  navigation,
  cameraActive,
  isFullScreen,
  streamPath,
  getInfo,
  setCamId,
  type = 'livestream',
  change,
}) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const stick_time = useSelector(
    state => state.playBackReducer.filter.stick_time,
  );
  const reload = useSelector(state => state.useReducer.reload);
  const handleOrientation = (orientation) => {
    console.log(orientation);
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      dispatch(setIsFullScreen(true));
      // Orientation.lockToLandscapeLeft();

      StatusBar.setHidden(true);
    } else {
      dispatch(setIsFullScreen(false));

      StatusBar.setHidden(false);
    }
  };
  console.log(isFullScreen);
  const handleFullscreen = useCallback(() => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
      dispatch(setIsFullScreen(false));
      // disable navigate to prev screen on click to back button hardware
      return true;
    } else {
      Orientation.lockToLandscapeLeft();
      dispatch(setIsFullScreen(true));
    }
  }, [isFullScreen])
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);
  useEffect(() => {
    if (type !== 'livestream' && cameraActive?.length > 0) {
      if (cameraActive[0]?.path?.TIME_START) {
        ref.current.seek(
          Number(convertToSecond(stick_time)) -
          Number(
            convertToSecond(cameraActive[0]?.path?.TIME_START.split(' ')[1]),
          ),
        );
      }
    }
  }, [cameraActive]);
  useEffect(() => {
    if (isFullScreen) {
      const backAction = BackHandler.addEventListener('hardwareBackPress', handleFullscreen)
      return () => backAction.remove()
    }
  }, [isFullScreen, handleFullscreen, BackHandler])

  return (
    <View style={isFullScreen ? styles.contentFull : {}}>
      {
        <View style={isFullScreen ? styles.activeFull : styles.active}>
          {cameraActive &&
            cameraActive.map((item, index) => {
              return (
                <>
                  <View
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
                    }>
                    {item.path === 'no-path' ? (
                      <View style={styles.noPath}>
                        <Text style={{ color: '#fff' }}>Không có video</Text>
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
                        shouldPlay={true}
                        useNativeControls={true}
                        isLooping
                        controls={type === 'playback/' ? change : false}
                        style={
                          isFullScreen
                            ? styles.fullScreen
                            : {
                              width: '100%',
                              height: 240,
                            }
                        }
                      />
                    )}
                  </View>
                  <View style={isFullScreen ? styles.infoFull : styles.info}>
                    <View style={styles.cam}>
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
                          <Status color="#FF3300" />
                        )}
                      </View>
                      <Text
                        style={
                          isFullScreen
                            ? { fontSize: 18, color: '#fff', paddingLeft: 12 }
                            : { color: '#000' }
                        }>
                        {item.name}
                      </Text>
                    </View>

                    {!isFullScreen && item.path !== 'no-path' && (
                      <>
                        <View style={styles.setting}>
                          <View style={styles.iconSetting}>
                            <Text onPress={() => getInfo(item.code)}>
                              <InfoIcon />
                            </Text>
                          </View>

                          <Pressable
                            onPress={handleFullscreen}
                            style={styles.iconSetting}>
                            <Text>
                              <FullScreenIcon
                                color={isFullScreen ? '#fff' : 'black'}
                              />
                            </Text>
                          </Pressable>
                        </View>
                      </>
                    )}
                  </View>
                </>
              );
            })}
        </View>
      }
      {!isFullScreen && type !== 'playback/' && (
        <View>
          <FlatList
            data={streamPath}
            //   scrollEnabled
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
          // maxHeight={500}
          />
        </View>
      )}
    </View>
  );
};

export default VideoCamera;
