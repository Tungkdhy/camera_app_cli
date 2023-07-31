import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles';
import Move from '../../../assets/images/Movement.png';
import Motion from '../../../assets/images/Motion.png';
import Object1 from '../../../assets/images/Object.png';

function CountAI({ countCamera, companyName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Thống kê AI {companyName}
      </Text>
      <View style={styles.boxHeader}>
        <View style={styles.headerItem}>
          <ImageBackground style={styles.image_camera} source={Motion} />
          <Text style={styles.number}>{countCamera.MOTION}</Text>
          <Text style={styles.name}>Phát hiện chuyển động</Text>
        </View>
        {/* <View style={styles.headerItem}>
          <ImageBackground style={styles.image_camera} source={Object1} />
          <Text style={styles.number}>{countCamera.COMMON_OBJECT}</Text>
          <Text style={styles.name}>Đối tượng phổ biến</Text>
        </View> */}
        <View style={styles.headerItem}>
          <ImageBackground style={styles.image_camera} source={Move} />
          <Text style={styles.number}>{countCamera.MOVEMENT}</Text>
          <Text style={styles.name}>Camera dịch chuyển</Text>
        </View>
      </View>
      {/* <View style={styles.boxHeader}>
      </View> */}
    </View>
  );
}

export default CountAI;
