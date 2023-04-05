import {Text, View, ScrollView, Alert, FlatList, Pressable} from 'react-native';
import Header from '../../components/Header/Header';
import {useEffect, useState} from 'react';
import Filter from '../../components/Filter/Filter';
import {useSelector, useDispatch} from 'react-redux';
import axiosClient from '../../services/axiosClient';
import {
  getListLocation,
  getListProvince,
  getListDistrict,
  setWareHouseCode,
} from '../../redux/actions/cameraAction';
import {getListWareHouse} from '../../redux/actions/wareHouseAction';
import {
  DownIcon,
  Status,
  ShowIcon,
  MenuIcon,
} from '../../components/Icons/Index';
import Modal from './Modal/Modal';
import {styles} from './style';

export default function Stream({navigation, ...props}) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const wareHouse = useSelector(state => state.wareHouseReducer);
  //Show filter
  const handleShowFilter = () => {
    setModalVisible(true);
  };
  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };
  //Navigate Screen Live
  const liveStream = (it, item) => {
    if (it.STATUS === 'On') {
      dispatch(setWareHouseCode(''));
      navigation.navigate('Live', {
        wareHouse: item.WAREHOUSE_NAME,
        active: it.CODE,
        cam: camera.camera.filter(itt => itt.STATUS === 'On'),
      });
    } else {
      Alert.alert('Camera đang tắt');
    }
  };

  //Navigate Screen PlayBack
  const navigatePlayBackCamera = (it,item) => {
    navigation.navigate("PlayBack",{
      wareHouse: item.WAREHOUSE_NAME,
      active: it.CODE,
      cam:camera.camera ,
    })
  };
  const handleNavigateSmart = (it,item)=>{
    console.log(it);
    navigation.navigate("Report",{
      camera:it
    })
  }
  const handleShowCamera = code => {
    if (code === camera.wareCode) {
      dispatch(setWareHouseCode(''));
    } else {
      dispatch(setWareHouseCode(code));
    }
  };
  const setIsShowProvince = () => {
    setIsProvince(!isProvince);
  };
  const renderItem = ({item,index}) => {
    return (
      <>
        <View key={index} style={styles.border}>
          <View style={styles.cameraItem}>
            <View style={styles.icon}>
              {item.CODE === camera.wareCode ? <DownIcon /> : <ShowIcon />}
            </View>
            <Text
              onPress={() => handleShowCamera(item.CODE)}
              style={styles.name}>
              {item.WAREHOUSE_NAME}
            </Text>
          </View>
          {item.CODE === camera.wareCode && (
            <View style={styles.listCamera}>
              {camera.camera.map((it, index) => {
                return (
                  <View key={index} style={styles.flex}>
                    <View style={styles.cameraName}>
                      <View>
                        {it.STATUS === 'On' ? (
                          <Status />
                        ) : (
                          <Status color="#FF3300" />
                        )}
                      </View>
                      <View style={styles.nameCamera}>
                        <Text
                          onPress={
                            props.route.name === 'Stream'
                              ? () => liveStream(it, item) : props.route.name === 'Smart'?()=>handleNavigateSmart(it,item)
                              : () => navigatePlayBackCamera(it, item)
                          }>
                          {it.NAME_CAM} 
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => {
                        dispatch(setWareHouseCode(''));
                        navigation.navigate('Setting', {
                          camera_code: it.CODE,
                        });
                      }}
                      style={{paddingRight: 12}}>
                      <MenuIcon />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </>
    );
  };
  useEffect(() => {
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
        console.log(e);
      }
    }
    getLocation();
  }, [camera.filter?.province_code, camera.filter?.district_code]);
  useEffect(() => {
    async function getDistrict() {
      const res = await axiosClient.get(
        `/district/get-list-district/?province_code=${camera.filter?.province_code}&size=1000&page=1`,
      );
      const data = res.map(item => {
        return {name: item.DISTRICT_NAME, code: item.DISTRICT_CODE};
      });
      dispatch(getListDistrict(data));
    }
    getDistrict();
  }, [camera.filter?.province_code]);
  useEffect(() => {
    async function getProvince() {
      try {
        const res = await axiosClient.get(
          '/province/get-info-province/?nation_code=VNM',
        );
        const data = res.map(item => {
          return {name: item.PROVINCE_NAME, code: item.PROVINCE_CODE};
        });
        console.log(res);
        dispatch(getListProvince(data));
      } catch (e) {
        console.log(e);
      }
    }
    getProvince();
  }, []);
  useEffect(() => {
    async function getProvince() {
      try {
        const res = await axiosClient.get(
          '/camerainfo/get-list-camera-by-infoCamera/',
          {
            params: {
              warehouse_code: camera.wareCode,
              camera_status: camera.filter.camera_status,
            },
          },
        );
        dispatch(getListLocation(res));
      } catch (e) {
        console.log(e);
      }
    }
    getProvince();
  }, [camera.wareCode, camera.filter.camera_status]);
  return (
    <>
      <Header
        title={
          props.route.name === 'Stream' ?  'Xem trực tiếp'  :  props.route.name === 'Smart'?'Cảnh báo thông minh':'Xem lại Camera'
        }
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
          filter={camera.filter.camera_status}
          onClick={handleShowFilter}
        />
        <ScrollView>
          <View style={styles.camera}>
            <FlatList
              data={wareHouse?.wareHouse}
              renderItem={renderItem}
              keyExtractor={item => item.CODE}
              onEndReachedThreshold={0}
              accessibilityElementsHidden
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
