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
import { setListCameraPlayBack } from '../../redux/actions/playBackAction';
import { ActivityIndicator } from 'react-native';

export default function MenuPlayBack({ navigation, ...props }) {
  const dispatch = useDispatch();
  // const [screen, setScreen] = useState(props.route.name);
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const wareHouse = useSelector(state => state.playBackReducer);
  const [search, setSearch] = useState('');
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowSearch = () => {
    setIsShowSearch(!isShowSearch);
  };
  // console.log(wareHouse);
  //Show filterlog
  const [modalVisible, setModalVisible] = useState(false);
  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleShowFilter = () => {
    setModalVisible(true);
    // dispatch(setScreen(props.route.name));
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
      <>
        {item.LIST_CAMERA && item?.LIST_CAMERA.length > 0 && (
          <Pressable
            onPress={() => handleShowCamera(item.WAREHOUSE_CODE)}
            key={index}>
            <View style={styles.border}>
              <View style={styles.cameraItem}>
                <View style={styles.icon}>
                  {item.WAREHOUSE_CODE === camera.wareCode ? (
                    <DownIcon />
                  ) : (
                    <ShowIcon />
                  )}
                </View>
                <Text style={styles.name}>{item.WAREHOUSE_NAME}</Text>
              </View>
              {item.WAREHOUSE_CODE === camera.wareCode && (
                <View style={styles.listCamera}>
                  {item.LIST_CAMERA &&
                    item.LIST_CAMERA?.length > 0 &&
                    item.LIST_CAMERA.map((it, index) => {
                      return (
                        <Pressable
                          onPress={() => navigatePlayBackCamera(it, item)}
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
  useEffect(() => {
    //Get warehouse
    async function getLocation() {
      try {
        setLoading(true);
        const province =
          wareHouse.filter?.province_code !== 'All'
            ? {
              province_code: wareHouse.filter?.province_code,
            }
            : {};
        const district =
          wareHouse.filter?.district_code !== 'All'
            ? {
              district_code: wareHouse.filter?.district_code,
            }
            : {};
        const already = {
          record_already: wareHouse.filter?.isBG ? 1 : 0,
        };

        const res = await axiosClient.get(
          '/camerainfo/get-list-camera-level-by-username-mobile/',
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
        // console.log(already);

        dispatch(setListCameraPlayBack(res));
        setLoading(false);
      } catch (e) {
        setLoading(false);

        console.log(e);
      }
    }
    getLocation();
  }, [wareHouse.reload, camera.filter.camera_status, search]);
  useEffect(() => {
    async function getDistrict() {
      const prams =
        wareHouse.filter?.province_code === 'All'
          ? {}
          : {
            province_code: wareHouse.filter?.province_code,
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
      console.log(data);
      dispatch(getListDistrict(data));
    }
    getDistrict();
  }, [wareHouse.filter?.province_code, camera.filterLocate?.district]);
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
        title={'Xem lại Camera'}
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
      <Pressable
        onPress={() => {
          setIsShowSearch(false);
        }}
        style={styles.container}>
        <Filter
          playback={props.route.name !== 'Stream'}
          filter={camera.filter.camera_status}
          record={camera.filter.record_status}
          onClick={handleShowFilter}
        />
        {/* <ScrollView> */}
        {loading ? (
          <View style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView style={styles.camera}>
            {wareHouse?.cameras.length > 0 ? (
              <FlatList
                data={wareHouse?.cameras}
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
        )}
        {/* </ScrollView> */}
      </Pressable>
    </>
  );
}
