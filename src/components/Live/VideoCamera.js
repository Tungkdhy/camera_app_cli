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
import VideoPlayer from 'react-native-video-controls';
import {View, Text, FlatList, Pressable} from 'react-native';
import {styles} from './styles';
const VideoCamera = ({
  navigation,
  cameraActive,
  isFullScreen,
  streamPath,
  getInfo,
  setCamId,
}) => {
  const dispatch = useDispatch();
  console.log(cameraActive);
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
                      uri: `http://42.96.41.91:10711${item.path}`,
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
                            width: 380,
                            height: 200,
                          }
                    }
                    // fullscreen={true}
                    // Can be a URL or a local file.
                  />

                  {/* <Text style={styles.nameCamera}>{title}</Text> */}
                </View>
                <View style={isFullScreen ? styles.infoFull : styles.info}>
                  <View style={styles.cam}>
                    <View>
                      {isFullScreen ? (
                        <Pressable
                          onPress={() => {
                            dispatch(setIsFullScreen());
                          }}>
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
                    <View style={styles.setting}>
                      <View style={styles.iconSetting}>
                        <Text onPress={() => getInfo(item.code)}>
                          <InfoIcon />
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('Setting');
                        }}
                        style={styles.iconSetting}>
                        <Text>
                          <SettingIcon />
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          dispatch(setIsFullScreen('tung'));
                        }}
                        style={styles.iconSetting}>
                        <Text>
                          <FullScreenIcon
                            color={isFullScreen ? '#fff' : 'black'}
                          />
                        </Text>
                      </Pressable>
                    </View>
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
