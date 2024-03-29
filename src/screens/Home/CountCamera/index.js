import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles';
import ImageCamOn from '../../../assets/images/online.png';
import ImageCamOff from '../../../assets/images/off.png';
import ImageCam from '../../../assets/images/cam.png';
import ImageEye from '../../../assets/images/eye.png';
import Weak from '../../../assets/images/Weak.png';
import DisConnect from '../../../assets/images/DisConnect.png';

function CountCamera({ countCamera, companyName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thống kê camera {companyName}</Text>
      {/* content */}
      <View style={styles.contentHeader}>
        <View style={styles.boxHeader}>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageCam} />
            <Text style={styles.number}>{countCamera.COUNT_CAM}</Text>
            <Text style={styles.name}>Tổng Camera</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={ImageCamOn} />
            <Text style={styles.number}>{countCamera.ACTIVE}</Text>
            <Text style={styles.name}>Đang trực tuyến</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={DisConnect} />
            <Text style={styles.number}>
              {Number(countCamera?.INACTIVE) + Number(countCamera?.WEAK)}
            </Text>
            <Text style={styles.name}>Mất kết nối</Text>
          </View>
          <View style={styles.headerItem}>
            <ImageBackground style={styles.image_camera} source={DisConnect} />
            <Text style={styles.number}>{Number(countCamera?.NO_CONNECT)}</Text>
            <Text style={styles.name}>Sẵn sàng</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CountCamera;
