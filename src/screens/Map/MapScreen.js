
import { View } from 'react-native';
import Header from '../../components/Header/Header';
import Filter from '../../components/Filter/Filter';
import { useEffect, useState } from 'react';
import Mapbox, { Camera, MapView, MarkerView } from '@rnmapbox/maps';
import { styles } from './styles';
import ModalInfo from './ModalInfo/ModalInfo';
import MarkerCustom from './MarkerCustom/MarkerCustom';
import axiosClient from '../../services/axiosClient';
import Modal from '../Stream/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getListDistrict, getListProvince } from '../../redux/actions/cameraAction';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken('pk.eyJ1IjoiY2h1bmd2cSIsImEiOiJjbGNzeHNuYWIwZmdlM29zMXp0emw0ZHIyIn0.qrkqLsQwQIkplAoGRYgWrQ');

function MapScreen({ navigation }) {
  const [coordinate, setCoordinate] = useState([105.8342, 21.0278])
  const [showInfo, setShowInfo] = useState(false)
  const [listWareHouse, setListWareHouse] = useState([])
  const [listWareHouseFillStatus, setListWareHouseFillStatus] = useState([])
  const [infoDetail, setInfoDetail] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const [isProvince, setIsProvince] = useState(true);
  const camera = useSelector(state => state.useReducer);
  const dispatch = useDispatch();
  const [listWareHouseRender, setListWareHouseRender] = useState([])

  const handleClickMaker = (code) => {
    if (listWareHouse.length > 0) {
      listWareHouse.forEach((wareHouse) => {
        if (code === wareHouse.CODE) {
          setInfoDetail(wareHouse)
          setShowInfo(!showInfo)
        }
      })
    }
  }

  const handleCloseBox = () => {
    setShowInfo(false)
    setInfoDetail(false)
  }

  const handleSetShowModal = () => {
    setModalVisible(!modalVisible);
  };

  const setIsShowProvince = () => {
    setIsProvince(!isProvince);
  };

  const handleShowFilter = () => {
    setModalVisible(true);
  };


  useEffect(() => {
    const provinceCode = camera?.filter?.province_code;
    const districtCode = camera?.filter?.district_code;
    async function getListWareHouse() {
      try {
        const res = await axiosClient.get('warehouse/get-list-warehouse/', {
          params: {
            province_code: provinceCode.length > 0 ? provinceCode : null,
            district_code: districtCode.length > 0 ? districtCode : null,
          }
        })
        if (res) {
          const data = res.data
          setListWareHouse(data)
          const longitude = data[0].LONGITUDE;
          const latitude = data[0].LATITUDE;
          setCoordinate([longitude, latitude])
        }
        return res.data;
      } catch (error) {
        return error
      }
    }
    getListWareHouse()
  }, [camera?.filter?.province_code, camera?.filter?.district_code])

  useEffect(() => {
    async function getProvince() {
      try {
        const res = await axiosClient.get(
          '/province/get-info-province/?nation_code=VNM',
        );
        const data = res.map(item => {
          return { name: item.PROVINCE_NAME, code: item.PROVINCE_CODE };
        });
        dispatch(getListProvince(data));
      } catch (e) {
        console.log(e);
      }
    }
    getProvince();
  }, []);

  useEffect(() => {
    async function getDistrict() {
      try {
        const res = await axiosClient.get(
          `/district/get-list-district/?province_code=${camera.filter?.province_code}&size=1000&page=1`,
        );
        const data = res.map(item => {
          return { name: item.DISTRICT_NAME, code: item.DISTRICT_CODE };
        });
        dispatch(getListDistrict(data));
      } catch (error) {
        return error;
      }
    }
    getDistrict();
  }, [camera.filter?.province_code]);

  useEffect(() => {
    const statusWareHouse = camera.filter.camera_status;
    if (statusWareHouse === 'On') {
      const listWareHouseFill = listWareHouse.map((wareHouse) => {
        if (wareHouse.COUNT_CAM > 0) {
          return wareHouse
        } else {
          return null
        }
      })
      setListWareHouseFillStatus(listWareHouseFill)
    }
  }, [camera.filter.camera_status, listWareHouse])

  useEffect(() => {
    const statusWareHouse = camera.filter.camera_status;
    if (statusWareHouse === 'On') {
      setListWareHouseRender(listWareHouseFillStatus)
    } else {
      setListWareHouseRender(listWareHouse)
    }
  }, [camera.filter.camera_status, listWareHouseFillStatus, listWareHouse])
  return (
    <>
      <Header title={"Bản đồ"} navigation={navigation} />
      <Filter
        filter={camera.filter.camera_status}
        onClick={handleShowFilter}
      />
      <View style={styles.container}>
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <MapView style={{ flex: 1 }}
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={11}
            centerCoordinate={coordinate}
            rotateEnabled={false}
            pitchEnabled={false}
            logoEnabled={false}
            localizeLabels={true}
          >
            <Camera zoomLevel={11}
              centerCoordinate={coordinate}
            />
            {listWareHouseRender.length > 0 && listWareHouseRender.map((wareHouse) => {
              return (
                <MarkerView
                  key={wareHouse?.CODE}
                  id={'test'}
                  title='Test'
                  coordinate={wareHouse?.LONGITUDE ? [wareHouse.LONGITUDE, wareHouse.LATITUDE] : [105.8342, 21.0278]}
                  style={{ zIndex: 1 }}
                  children={<MarkerCustom onPressMaker={() => { handleClickMaker(wareHouse.CODE) }} />}
                />
              )
            })}
          </MapView>
        </View>
        {/* Info */}
        <ModalInfo
          navigation={navigation}
          data={infoDetail}
          onCloseBoxInfo={handleCloseBox}
          show={showInfo}
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
          animate={'slide'}
        />
      </View >
    </>
  );
}

export default MapScreen;


