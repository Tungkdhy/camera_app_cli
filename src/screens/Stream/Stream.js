import { Text, View, ScrollView, Alert, FlatList, Pressable } from 'react-native';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../../services/axiosClient';
import {
  getListLocation,
  getListProvince,
  getListDistrict,
  setWareHouseCode,
} from '../../redux/actions/cameraAction';
import { getListWareHouse } from '../../redux/actions/wareHouseAction';
import {
  DownIcon,
  Status,
  ShowIcon,
  MenuIcon,
} from '../../components/Icons/Index';
import Modal from './Modal/Modal';
import { styles } from './style';

export default function Stream({ navigation, ...props }) {
  const dispatch = useDispatch();
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const wareHouse = useSelector(state => state.wareHouseReducer);
  //Show filter
  const [modalVisible, setModalVisible] = useState(false);
  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleShowFilter = () => {
    setModalVisible(true);
  };

  //Navigate Screen Live
  const liveStream = (it, item) => {
    if (it?.CAMERA.STATUS === 'On') {
      dispatch(setWareHouseCode(''));
      navigation.navigate('Live', {
        wareHouse: item.WAREHOUSE_NAME,
        active: it?.CAMERA.CODE,
        cam: camera.camera.filter(itt => itt?.CAMERA.STATUS === 'On'),
      });
    } else {
      Alert.alert('Camera đang tắt');
    }
  };

  //Navigate Screen PlayBack
  const navigatePlayBackCamera = (it, item) => {
    navigation.navigate("PlayBack", {
      wareHouse: item.WAREHOUSE_NAME,
      active: it.CAMERA.CODE,
      activeName: it.CAMERA.NAME_CAM,
      cam: camera.camera,
    })
  };
  //Navigate Screen Smart
  const handleNavigateSmart = (it, item) => {
    navigation.navigate("Report", {
      camera: it.CAMERA
    })
  }
  //Show menu2 stream
  const handleShowCamera = code => {
    if (code === camera.wareCode) {
      dispatch(setWareHouseCode(''));
    } else {
      dispatch(setWareHouseCode(code));
    }
  };
  // Navigate form select district
  const setIsShowProvince = () => {
    setIsProvince(!isProvince);
  };
  //Render menu camera
  const renderItem = ({ item, index }) => {
    return (
      <Pressable onPress={() => handleShowCamera(item.CODE)}
        key={index}>
        <View style={styles.border}>
          <View style={styles.cameraItem}>
            <View style={styles.icon}>
              {item.CODE === camera.wareCode ? <DownIcon /> : <ShowIcon />}
            </View>
            <Text style={styles.name}>
              {item.WAREHOUSE_NAME}
            </Text>
          </View>
          {item.CODE === camera.wareCode && (
            <View style={styles.listCamera}>
              {camera.camera && camera.camera?.length > 0 && camera.camera.map((it, index) => {
                return (
                  <Pressable onPress={
                    props.route.name === 'Stream'
                      ? () => liveStream(it, item) : props.route.name === 'Smart' ? () => handleNavigateSmart(it, item)
                        : () => navigatePlayBackCamera(it, item)
                  } key={index} style={styles.flex}>
                    <View style={styles.cameraName}>
                      <View>
                        {it?.CAMERA.STATUS === 'On' ? (
                          <Status />
                        ) : (
                          <Status color="#FF3300" />
                        )}
                      </View>
                      <View style={styles.nameCamera}>
                        <Text
                          style={{ color: "#000" }}

                          onPress={
                            props.route.name === 'Stream'
                              ? () => liveStream(it, item)
                              : props.route.name === 'Smart'
                                ? () => handleNavigateSmart(it, item)
                                : () => navigatePlayBackCamera(it, item)
                          }>
                          {it?.CAMERA.NAME_CAM}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </Pressable>
    );
  };
  useEffect(() => {
    //Get warehouse
    async function getLocation() {
      try {
        const province = camera.filter?.province_code
          ? {
            province_code: camera.filter?.province_code,
          }
          : {};
        const district = camera.filter?.district_code
          ? {
            district_code: camera.filter?.district_code,
          }
          : {};
        const res = await axiosClient.get(`/warehouse/get-list-warehouse/`, {
          params: {
            ...province,
            ...district,
          },
        });
        dispatch(getListWareHouse(res.data));
      } catch (e) {
      }
    }
    getLocation();
  }, [camera.filter?.province_code, camera.filter?.district_code]);
  useEffect(() => {

    async function getDistrict() {
      const res = await axiosClient.get(
        `/district/get-list-district/?province_code=${camera.filter?.province_code}&size=1000&page=1&district_name=${camera.filterLocate?.district}`,
      );
      const data = res.map(item => {
        return { name: item.DISTRICT_NAME, code: item.DISTRICT_CODE };
      });
      dispatch(getListDistrict(data));
    }
    getDistrict();
  }, [camera.filter?.province_code, camera.filterLocate?.district]);
  useEffect(() => {
    async function getProvince() {
      try {
        const res = await axiosClient.get(
          `/province/get-info-province/?nation_code=VNM&province_name=${camera.filterLocate?.province}`,
        );
        const data = res.map(item => {
          return { name: item.PROVINCE_NAME, code: item.PROVINCE_CODE };
        });
        dispatch(getListProvince(data));
      } catch (e) {
      }
    }
    getProvince();
  }, [camera.filterLocate?.province]);
  useEffect(() => {
    async function getProvince() {
      const params = {
        warehouse_code: camera.wareCode,
        camera_status: camera.filter.camera_status,
        page: 1,
        size: 1000
      }
      if (props.route.name === 'Smart') {
        params.ai_already = camera.filter.record_status
      } else if (props.route.name === 'Playback') {
        params.record_already = camera.filter.record_status
      } 
      try {
        const res = await axiosClient.get(
          'cameraManagement/get-list-camera/',
          {
            params: {
              warehouse_code: camera.wareCode,
              camera_status: camera.filter.camera_status,
              page: 1,
              size: 1000
            },
          },
        );
        dispatch(getListLocation(res.data));
      } catch (e) {
      }
    }
    getProvince();
  }, [camera.wareCode, camera.filter.camera_status, props.route.name, camera.filter.record_status]);
  return (
    <>
      <Header
        title={
          props.route.name === 'Stream' ? 'Xem trực tiếp' : props.route.name === 'Smart' ? 'Cảnh báo thông minh' : 'Xem lại Camera'
        }
        navigation={navigation}
      />
      <Modal
        isShow={modalVisible}
        onShowModal={handleSetShowModal}
        isProvince={isProvince}
        setIsProvince={setIsShowProvince}
        data={isProvince ? camera?.province : camera?.district}
        filter={
          isProvince
            ? camera?.filter?.province_code
            : camera?.filter?.district_code
        }
      />
      <View style={styles.container}>
        <Filter
          playback={props.route.name !== 'Stream'}
          filter={camera.filter.camera_status}
          record={camera.filter.record_status}
          onClick={handleShowFilter}
        />
        {/* <ScrollView> */}
        <ScrollView style={styles.camera}>
          <FlatList
            data={wareHouse?.wareHouse}
            renderItem={renderItem}
            keyExtractor={item => item.CODE}
            onEndReachedThreshold={0}
            accessibilityElementsHidden
          />
        </ScrollView>
        {/* </ScrollView> */}
      </View>
    </>
  );
}
