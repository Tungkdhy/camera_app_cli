import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { setReload } from '../../redux/actions/cameraAction';
import { styles } from './styles';
import { loseConnect } from '../../utils';
const CameraItem = ({ title, path, setCamId, id, type }) => {
  // console.log(
  //   `http://cameraai.cds.vinorsoft.com/${type}/${path.split('/')[1]}/image.jpg`,
  // );
  const [thum, setThum] = React.useState('');
  React.useEffect(() => {
    if(type === 'livestream') {
      setThum(
        `http://42.96.41.28:30005/${path.split('/')[1]}/image.jpg`,
      );
    } else {
      setThum(
        `http://cameraai.cds.vinorsoft.com/${type}/${path.split('/')[1]
        }/image.jpg`,
      );
    }
  }, [path]);
  const dispatch = useDispatch();
  return (
    <Pressable
      onPress={() => {
        setCamId(id, title);
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
              setThum(loseConnect);
            }
          }}
          style={{ height: 105, flex: 1, borderRadius: 4 }}
        />
      </View>
      <Text onPress={() => setCamId(id)} style={styles.nameCamera}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CameraItem;
