import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { setReload } from '../../redux/actions/cameraAction';
import { styles } from './styles';
const CameraItem = ({ title, path, setCamId, id, type }) => {
  console.log(
    `http://cameraai.cds.vinorsoft.com/${type}/${path.split('/')[1]}/image.jpg`,
  );
  const [thum, setThum] = React.useState('');
  React.useEffect(() => {
    setThum(
      `http://cameraai.cds.vinorsoft.com/${type}/${path.split('/')[1]
      }/image.jpg`,
    );
  }, [path]);
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        setCamId(id);
        dispatch(setReload(true));
        setTimeout(() => {
          dispatch(setReload(false));
        }, 500);
        if (type === 'livestream') {
        }
      }}
      style={{ paddingBottom: 12, width: '48%', alignItems: 'stretch' }}>
      <View>
        <Image
          source={{
            uri: thum,
          }}
          onError={e => {
            if (thum) {
              setThum('https://baconmockup.com/300/200/');
            }
          }}
          // poster={`http://cameraai.cds.vinorsoft.com/${type}${path}`}
          style={{ height: 110, flex: 1, borderRadius: 4 }}
        />
      </View>
      <Text onPress={() => setCamId(id)} style={styles.nameCamera}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CameraItem;
