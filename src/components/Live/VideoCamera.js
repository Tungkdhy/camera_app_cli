import React, {useEffect, useState} from 'react';
import {
  InfoIcon,
  SettingIcon,
  FullScreenIcon,
  Status,
  BackIcon2,
} from '../../components/Icons/Index';
import {setIsFullScreen} from '../../redux/actions/cameraAction';
import {useDispatch} from 'react-redux';
import CameraItem from './CameraItem';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {View, Text, FlatList, Pressable, StatusBar} from 'react-native';
import {styles} from './styles';
const VideoCamera = ({
  navigation,
  cameraActive,
  isFullScreen,
  streamPath,
  getInfo,
  setCamId,
  type = 'livestream',
}) => {
  const dispatch = useDispatch();
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
    if (isFullScreen) {
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
  return (
    <View style={isFullScreen ? styles.contentFull : {}}>
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
                  <Video
                    source={{
                      uri: `http://cameraai.cds.vinorsoft.com/${type}${item.path}`,
                    }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={true}
                    useNativeControls={true}
                    isLooping
                    controls={true}
                    style={
                      isFullScreen
                        ? styles.fullScreen
                        : {
                            width: '100%',
                            height: 240,
                          }
                    }
                  />
                </View>
                <View style={isFullScreen ? styles.infoFull : styles.info}>
                  <View style={styles.cam}>
                    <View>
                      {isFullScreen ? (
                        <Pressable onPress={handleFullscreen}>
                          <BackIcon2 />
                        </Pressable>
                      ) : item.status === 'On' ? (
                        <Status />
                      ) : (
                        <Status color="#FF3300" />
                      )}
                    </View>
                    <Text
                      style={isFullScreen ? {fontSize: 18, color: '#fff'} : {}}>
                      {item.name}
                    </Text>
                  </View>

                  {!isFullScreen && (
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
      {!isFullScreen && (
        <View>
          <FlatList
            data={streamPath}
            //   scrollEnabled
            renderItem={({item, index}) => (
              <CameraItem
                key={index}
                id={item.code}
                setCamId={setCamId}
                title={item?.name}
                path={item?.path}
                type={type}
              />
            )}
            numColumns={2}
            style={styles.list}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            keyExtractor={(item, index) => index}
            maxHeight={500}
          />
        </View>
      )}
    </View>
  );
};

export default VideoCamera;
