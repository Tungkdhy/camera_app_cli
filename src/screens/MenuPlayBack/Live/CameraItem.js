import React from 'react';
import {View, Image, Text} from 'react-native';
import Video from 'react-native-video';
import {styles} from './styles';
const CameraItem = ({title, path,setCamId,id}) => {
  return (
    <View  style={{paddingBottom: 12, width: '48%',alignItems: 'stretch'}}>
      <View >
        <Video
          source={{
            uri: `http://42.96.41.91:10711${path}`,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          useNativeControls={true}
          isLooping
          style={{height: 96, flex: 1}}
        
          // Can be a URL or a local file.
        />
      </View>
      <Text onPress={()=>setCamId(id)} style={styles.nameCamera}>{title}</Text>
    </View>
  );
};

export default CameraItem;
