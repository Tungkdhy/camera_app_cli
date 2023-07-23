import {
  Text,
  View,
  ScrollView,
  Alert,
  FlatList,
  Pressable,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux';
import axiosClient from '../../services/axiosClient';
import {
  getListProvince,
  getListDistrict,
  setWareHouseCode,
  setScreen,
} from '../../redux/actions/cameraAction';
import { getListWareHouse } from '../../redux/actions/wareHouseAction';
import Orientation from 'react-native-orientation-locker';
import { DownIcon, Status, ShowIcon } from '../../components/Icons/Index';
import Modal from './Modal/Modal';
import { styles } from './style';
import { setListCamera, setListCamera2 } from '../../redux/actions/reportAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Smart({ navigation, ...props }) {
  const dispatch = useDispatch();
  // const [screen, setScreen] = useState(props.route.name);
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const report = useSelector(state => state.reportReducer);
  const wareHouse = useSelector(state => state.reportReducer);
  const [search, setSearch] = useState('');
  const [code2, setCode2] = useState('');
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowSearch = () => {
    setIsShowSearch(!isShowSearch);
  };
  //Show filterlog
  // console.log(wareHouse);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleShowFilter = () => {
    setModalVisible(true);
    dispatch(setScreen(props.route.name));
  };

  //Navigate Screen Live
  const liveStream = (it, item) => {
    if (it.STATUS === 'On') {
      dispatch(setWareHouseCode(''));
      navigation.navigate('Live', {
        wareHouse: item.WAREHOUSE_NAME,
        active: it?.CODE,
        cam: item.LIST_CAMERA.filter(itt => itt?.STATUS === 'On'),
      });
    } else {
      Alert.alert('Camera đang tắt');
    }
  };

  //Navigate Screen PlayBack
  const navigatePlayBackCamera = (it, item) => {
    navigation.navigate('PlayBack', {
      wareHouse: item.WAREHOUSE_NAME,
      active: it.CODE,
      activeName: it.NAME_CAM,
      cam: item.LIST_CAMERA,
    });
  };
  //Navigate Screen Smart
  const handleNavigateSmart = (it, item) => {
    navigation.navigate('Report', {
      camera: it,
    });
  };
  //Show menu2 stream
  const handleShowCamera = async code => {
    try {
      setCode2(code);
      if (code === camera.wareCode) {
        dispatch(setWareHouseCode(''));
      } else {
        dispatch(setWareHouseCode(code));
      }
    } catch (e) {
      console.log(e);
      // console.log('ree');
      setLoading(false);
    }
  };
  // Navigate form select district
  const setIsShowProvince = () => {
    setIsProvince(!isProvince);
  };
  // console.log(report.listCamera);
  //Render menu camera
  const renderItem = ({ item, index }) => {
    return (
      <>
        <Pressable onPress={() => handleShowCamera(item.CODE)} key={index}>
          <View style={styles.border}>
            <View style={styles.cameraItem}>
              <View style={styles.icon}>
                {item.CODE === camera.wareCode ? <DownIcon /> : <ShowIcon />}
              </View>
              <Text style={styles.name}>{item?.SUBJECT_NAME}</Text>
            </View>
            {item.CODE === camera.wareCode && (
              <View style={styles.listCamera}>
                {item.CODE === report.listCamera.code &&
                  report.listCamera.camera &&
                  report.listCamera.camera?.length > 0 &&
                  report.listCamera.camera.map((it, index) => {
                    return (
                      <Pressable
                        onPress={
                          props.route.name === 'Stream'
                            ? () => liveStream(it, item)
                            : props.route.name === 'Smart'
                              ? () => handleNavigateSmart(it, item)
                              : () => navigatePlayBackCamera(it, item)
                        }
                        key={index}
                        style={styles.flex}>
                        <View style={styles.cameraName}>
                          <View>
                            {it?.STATUS === 'On' ? (
                              <Status />
                            ) : (
                              <Status color="#FF3300" />
                            )}
                          </View>
                          <View style={styles.nameCamera}>
                            <Text style={{ color: 'black' }}>{it?.NAME_CAM}</Text>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
              </View>
            )}
          </View>
        </Pressable>
      </>
    );
  };
  useEffect(() => {
    //Get warehouse
    async function getLocation() {
      try {
        const province =
          camera.filter?.province_code !== 'All'
            ? {
              province_code: camera.filter?.province_code,
            }
            : {};
        const district =
          camera.filter?.district_code !== 'All'
            ? {
              district_code: camera.filter?.district_code,
            }
            : {};
        const already = {
          ai_already: camera.filter?.isBG ? 1 : 0,
          ai_service_code: camera.filter?.service,
        };

        const res = await axiosClient.get(
          '/warehouse/get-list-warehouse-for-mobile/',
          {
            params: {
              ...province,
              ...district,
              camera_status: camera.filter.camera_status,
              ...already,
              camera_name: search,
            },
          },
        );
        console.log(res);
        dispatch(setListCamera(res));
      } catch (e) {
        console.log(e);
      }
    }
    getLocation();
  }, [camera.refresh, camera.filter.camera_status, search]);
  // console.log(camera.filter?.service);
  useEffect(() => {
    const getListCamera = async () => {
      try {
        const province =
          camera.filter?.province_code !== 'All'
            ? {
              province_code: camera.filter?.province_code,
            }
            : {};
        const district =
          camera.filter?.district_code !== 'All'
            ? {
              district_code: camera.filter?.district_code,
            }
            : {};
        const serviceCode = camera.filter.isBG
          ? {
            ai_service_code: camera.filter?.service,
          }
          : {};

        const already = {
          ...serviceCode,
          ai_already: camera.filter?.isBG ? 1 : 0,
        };
        const camera_name = search
          ? {
            camera_name: search,
          }
          : {};
        const res = await axiosClient.get(
          '/camerainfo/get-list-camera-for-mobile/',
          {
            params: {
              // ...province,
              // ...district,
              camera_status: camera.filter.camera_status,
              ...already,
              ...camera_name,
              warehouse_code: code2,
            },
          },
        );
        dispatch(
          setListCamera2({
            code: code2,
            camera: res,
          }),
        );
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    getListCamera();
  }, [code2, search, camera.filter.camera_status]);
  useEffect(() => {
    async function getDistrict() {
      const prams =
        camera.filter?.province_code === 'All'
          ? {}
          : {
            province_code: camera.filter?.province_code,
          };
      const res = await axiosClient.get(
        `/district/get-list-district/?size=1000&page=1&district_name=${camera.filterLocate?.district}`,
        {
          params: { ...prams },
        },
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
      } catch (e) { }
    }
    getProvince();
  }, [camera.filterLocate?.province]);
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Alert.alert('Đăng xuất?', 'Bạn có muốn đang xuất không', [
      //   { text: 'Không', style: 'cancel', onPress: () => { } },
      //   {
      //     text: 'Có',
      //     style: 'destructive',
      //     // If the user confirmed, then we dispatch the action we blocked earlier
      //     // This will continue the action that had triggered the removal of the screen
      //     onPress: () => navigation.dispatch(e.data.action),
      //   },
      // ]);
      // Prompt the user before leaving the screen
    });
  }, [navigation]);
  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
  return (
    <>
      <Header
        title={
          props.route.name === 'Stream'
            ? 'Xem trực tiếp'
            : props.route.name === 'Smart'
              ? 'Cảnh báo thông minh'
              : 'Xem lại Camera'
        }
        navigation={navigation}
        search={search}
        setIsShowSearch={handleShowSearch}
        isShowSearch={isShowSearch}
        setSearch={setSearch}
      />
      <Modal
        isShow={modalVisible}
        onShowModal={handleSetShowModal}
        isProvince={isProvince}
        setIsProvince={setIsShowProvince}
        screen={props.route.name}
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
          {wareHouse?.camera.length > 0 ? (
            <FlatList
              data={wareHouse?.camera}
              renderItem={renderItem}
              keyExtractor={item => item.CODE}
              onEndReachedThreshold={0}
              accessibilityElementsHidden
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 500,
              }}>
              <Text>Không có dữ liệu</Text>
            </View>
          )}
        </ScrollView>
        {/* </ScrollView> */}
      </View>
    </>
  );
}
