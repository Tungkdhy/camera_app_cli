import {
  Text,
  View,
  ScrollView,
  Alert,
  FlatList,
  Pressable,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  AppState,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';

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

export default function Stream({ navigation, ...props }) {
  const dispatch = useDispatch();
  // const ref = React.useRef(AppState.currentState);
  // console.log('ref', ref);
  // const [screen, setScreen] = useState(props.route.name);
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const wareHouse = useSelector(state => state.wareHouseReducer);
  const [search, setSearch] = useState('');
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowSearch = () => {
    setIsShowSearch(!isShowSearch);
  };
  const [stateWareCode, setStateWareHouseCode] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleShowFilter = () => {
    setModalVisible(true);
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
  //Show menu2 stream
  const handleShowCamera = code => {
    if (code === stateWareCode) {
      dispatch(setWareHouseCode(''));
      setStateWareHouseCode('');
    } else {
      dispatch(setWareHouseCode(code));
      setStateWareHouseCode(code);
    }
  };
  // Navigate form select district
  const setIsShowProvince = () => {
    setIsProvince(!isProvince);
  };

  //Render menu camera
  const renderItem = ({ item, index }) => {
    return (
      <>
        {item.LIST_CAMERA && item?.LIST_CAMERA.length > 0 && (
          <Pressable
            onPress={() => handleShowCamera(item.WAREHOUSE_CODE)}
            key={index}>
            <View style={styles.border}>
              <View style={styles.cameraItem}>
                <View style={styles.icon}>
                  {item.WAREHOUSE_CODE === stateWareCode ? (
                    <DownIcon />
                  ) : (
                    <ShowIcon />
                  )}
                </View>
                <Text style={styles.name}>{item.WAREHOUSE_NAME}</Text>
              </View>
              {item.WAREHOUSE_CODE === stateWareCode && (
                <View style={styles.listCamera}>
                  {item.LIST_CAMERA &&
                    item.LIST_CAMERA?.length > 0 &&
                    item.LIST_CAMERA.map((it, index) => {
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
                              {it?.STATUS_ACTIVE === 0 ? (
                                <Status />
                              ) :( it?.STATUS_ACTIVE === 3?
                                <Status color="#FF3300" />:<Status color='#ff8d00'/>
                              )}
                            </View>
                            <View style={styles.nameCamera}>
                              <Text style={{ color: 'black' }}>
                                {it?.NAME_CAM}
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
        )}
      </>
    );
  };
  console.log(camera.filter.camera_status);
  // console.log(props.route.name);
  useEffect(() => {
    //Get warehouse
    setLoading(true)
    async function getLocation() {
      try {
        setLoading(true);
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
        const status_active = camera.filter.camera_status === "All" ? {}:{
          status_active: camera.filter.camera_status === "On" ?`["0"]`:camera.filter.camera_status === "Off" ?`["3"]`:`["1","2"]`
        }

        const res = await axiosClient.get(
          '/camerainfo/get-list-camera-level-by-username-mobile/',
          {
            params: {
              ...province,
              ...district,
              ...status_active,
              camera_name: search,
              // ...already,
            },
          },
        );
        // console.log(res[0].LIST_CAMERA);
        dispatch(getListWareHouse(res));
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    getLocation();
  }, [camera.refresh, search]);
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
    });
  }, [navigation]);
  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
  const handleClickOutSide = () => {
    isShowSearch && setIsShowSearch(false)
  }
  return (
    <View style={{width: '100%', height: '100%'}}>
      <TouchableWithoutFeedback onPress={handleClickOutSide}>
        <View style={{width: '100%', height: '100%'}}>
          <Header
            title={'Xem trực tiếp'}
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
            status={camera.filter.camera_status}
          />
          <View style={styles.container}>
            <Filter
              playback={props.route.name !== 'Stream'}
              filter={camera.filter.camera_status}
              record={camera.filter.record_status}
              onClick={handleShowFilter}
            />
            <ScrollView style={styles.camera}>
              {!loading ? (
                <>
                  {wareHouse?.wareHouse.length > 0 ? (
                    <FlatList
                      data={wareHouse?.wareHouse}
                      renderItem={renderItem}
                      keyExtractor={item => item.CODE}
                      onEndReachedThreshold={0}
                      accessibilityElementsHidden
                    />
                  ) : (
                    <View style={styles.loading}>
                      <ActivityIndicator />
                    </View>
                  )}
                </>
              ) : (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
