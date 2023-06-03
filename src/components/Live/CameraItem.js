import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { setReload } from '../../redux/actions/cameraAction';
import { styles } from './styles';
const CameraItem = ({ title, path, setCamId, id, type }) => {
  const dispatch = useDispatch()
  return (
    <Pressable onPress={() => {
      setCamId(id)
      dispatch(setReload(true))
      setTimeout(() => {
        dispatch(setReload(false))
      }, 500)
      if (type === "livestream") {

      }
    }} style={{ paddingBottom: 12, width: '48%', alignItems: 'stretch' }}>
      <View >
        <Video
          source={{
            uri: `http://cameraai.cds.vinorsoft.com/${type}${path}`,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          useNativeControls={true}
          isLooping

          style={{ height: 96, flex: 1 }}

        />
      </View>
      <Text onPress={() => setCamId(id)} style={styles.nameCamera}>{title}</Text>
    </Pressable>
  );
};

export default CameraItem;
