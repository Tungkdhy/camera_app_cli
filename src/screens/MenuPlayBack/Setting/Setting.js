import React, {useState, useEffect} from 'react';
import {Back} from '../../../components/Icons/Index';
import {View, Pressable, Text, Switch, Alert} from 'react-native';
import PlusIcon from '../../../components/Icons/Stream/PlusIcon';
import axiosClient from '../../../services/axiosClient';
import streamingClient from '../../../services/axiosStreaming';
// import { cameraManagement } from '../../../services/api/cameraManagementApi';
import {getInfoCamera} from '../../../redux/actions/cameraAction';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
const Setting = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [watting, setWaitting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const cameraInfo = useSelector(state => state.useReducer.camera_info);
  const handleChangeStream = async () => {
    try {
      if (isEnabled) {
        const data = JSON.stringify({
          camera_code: cameraInfo[0].CODE,
          rtsp: cameraInfo[0].RTSP_CHINH,
          quality: [
            cameraInfo[0].MAIN_SOURCE,
            cameraInfo[0].MAIN_SOURCE,
            cameraInfo[0].MAIN_SOURCE,
          ],
        });
        await streamingClient.post(
          'streamingManagement/post-start-streaming-process/',
          data,
        );
        const res2 = await axiosClient.put(
          `/cameraManagement/put-change-info-camera/?camera_code=${cameraInfo[0].CODE}`,
          {camera_status: 'On'},
        );
        // console.log(res2);
        if (res2.result) {
          Alert.alert('Bật camera thành công');
          setWaitting(!watting);
        }
      } else {
        await streamingClient.post('streamingManagement/post-stop-streaming/', {
          camera_code: cameraInfo[0].CODE,
        });
        const res2 = await axiosClient.put(
          `/cameraManagement/put-change-info-camera/?camera_code=${cameraInfo[0].CODE}`,
          {camera_status: 'Off'},
        );
        if (res2.result) {
          Alert.alert('Tắt camera thành công');
          // setCheck(boolean);
        }
      }
    } catch (e) {
      Alert.alert('Cập nhập không thành công');
    }
  };
  useEffect(() => {
    async function getInfoCameraApi() {
      try {
        const res = await axiosClient.get(
          `/cameraManagement/get-camera-info-by-code/?camera_code=${route.params.camera_code}`,
        );

        if (res) {
          dispatch(getInfoCamera(res));
        }
      } catch (e) {
        // Alert.alert('Lấy thông tin camera không thành công');
      }
    }
    getInfoCameraApi();
  }, [route.params.camera_code, watting]);
  useEffect(() => {
    if (cameraInfo.length > 0) {
      setIsEnabled(cameraInfo[0]?.STATUS === 'On' ? true : false);
    }
  }, [cameraInfo]);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.navigate('Stream');
            }}>
            <View style={styles.back}>
              <Back />
            </View>
          </Pressable>
          <Text style={styles.text}>
            {cameraInfo.length > 0 && cameraInfo[0]?.NAME_CAM}
          </Text>
        </View>
        <View style={styles.service}>
          <Pressable style={styles.itemActive}>
            <Text style={styles.textItemActive}>Cài đặt chung</Text>
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.textItem}>Chuyển động</Text>
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.textItem}>Phát hiện người</Text>
          </Pressable>
        </View>
        <View style={styles.space}></View>
        <View style={styles.content}>
          <View style={styles.contentItem}>
            <View style={styles.title}>
              <Text style={styles.title}>Trạng thái camera</Text>
            </View>
            <View style={styles.select}>
              <Switch
                trackColor={{false: '#767577', true: '#0040FF'}}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
              />
            </View>
          </View>
          {/* <View style={styles.contentItem}>
          <View style={styles.title}>
            <Text  style={styles.title}>Thời gian lưu trữ</Text>
          </View>
          <View style={styles.select}>
            <Text  style={styles.title}>1 ngày</Text>
          </View>
        </View>
        <View style={styles.contentItem}>
          <View style={styles.title}>
            <Text style={styles.title}>Khung giờ cho phép</Text>
          </View>
          <View style={styles.select}>
             <Pressable style={styles.btn}>
                <Text style={styles.primary}>Thêm</Text>
                <Text><PlusIcon/></Text>
             </Pressable>
          </View>
        </View> */}
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            navigation.navigate('Stream');
          }}
          style={{...styles.button, ...styles.cancel}}>
          <Text style={{color: '#fff'}}>Hủy bỏ</Text>
        </Pressable>
        <Pressable style={{...styles.button, ...styles.save}}>
          <Text onPress={handleChangeStream} style={{color: '#fff'}}>
            Lưu cài đặt
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Setting;
