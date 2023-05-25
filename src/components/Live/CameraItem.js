import React from 'react';
import {View, Text,Pressable} from 'react-native';
import Video from 'react-native-video';
import {styles} from './styles';
const CameraItem = ({title, path,setCamId,id,type}) => {
 
  return (
    <Pressable onPress={()=>setCamId(id)}  style={{paddingBottom: 12, width: '48%',alignItems: 'stretch'}}>
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
          
          style={{height: 96, flex: 1}}
        
        />
      </View>
      <Text onPress={()=>setCamId(id)} style={styles.nameCamera}>{title}</Text>
    </Pressable>
  );
};

export default CameraItem;
