import React, { useState, useEffect } from 'react';
import {
  Modal as ModalLocation,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  // CheckBox,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
// import { CheckBox } from '@rneui/themed';
import CheckBox from 'react-native-check-box';
import { Close } from '../../../components/Icons/Index';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { setService } from '../../../redux/actions/cameraAction';
import axiosClient from '../../../services/axiosClient';
import DropdownComponent from '../../../components/Select/Select';
import { styles } from './styles';
import {
  setDistrictCodePlayBack,
  setProvinceCodePlayBack,
  setReload,
  setIsBG,
} from '../../../redux/actions/playBackAction';
const Modal = ({
  screen,
  onShowModal,
  isShow,
  setIsProvince,
  isProvince,
  animate,
}) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const camera = useSelector(state => state.useReducer);
  const wareHouse = useSelector(state => state.playBackReducer);

  const handleResetFilter = () => {
    dispatch(setProvinceCodePlayBack('All'));
    dispatch(setDistrictCodePlayBack('All'));
    dispatch(setReload(!wareHouse.reload));
    dispatch(setIsBG(false));
    onShowModal();
  };

  useEffect(() => {
    async function getPackage() {
      try {
        const res = await axiosClient.get('/service/get-list-services/');
        dispatch(setService(res[0].CODE));
        setServices(res);
      } catch (e) { }
    }
    getPackage();
  }, []);
  return (
    <ModalLocation
      animationType={animate ? animate : 'fade'}
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        onShowModal();
      }}>
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView enabled={true} behavior={'padding'}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.titleHeader}>Bộ lọc</Text>
                <Pressable
                  onPress={() => {
                    onShowModal();
                    if (!isProvince) {
                      setIsProvince();
                    }
                    // dispatch(setFilterDistrict(''));
                  }}
                  style={styles.iconModal}>
                  <Close />
                </Pressable>
              </View>
              <View style={styles.modalContent}>
                <View>
                  <Text style={styles.label}>Tỉnh/Thành phố</Text>
                  <View style={styles.choose_camera}>
                    <RNPickerSelect
                      placeholder={{
                        // label: listCamera ? listCamera?.data[0]?.CAMERA?.NAME_CAM : 'Tất cả',
                        // value: listCamera ? listCamera?.data[0]?.CAMERA?.CODE : 0
                        label: 'Tất cả',
                        value: 'All',
                      }}
                      doneText="Lựa chọn"
                      style={styles}
                      value={wareHouse.filter?.province_code}
                      onValueChange={value => {
                        dispatch(setProvinceCodePlayBack(value));
                      }}
                      // onValueChange={value => handleGetCameraAct(value)}
                      items={
                        camera?.province
                          ? camera.province.map(item => {
                            return {
                              key: item.code,
                              value: item.code,
                              label: item.name,
                            };
                          })
                          : []
                      }
                    />
                  </View>
                  {/* <DropdownComponent
                    data1={[
                      {
                        label: 'Tất cả',
                        value: 'All',
                      },
                      ...camera.province.map(item => {
                        return {
                          // key: item.code,
                          value: item.code,
                          label: item.name,
                        };
                      }),
                    ]}
                    setData={value => {
                      dispatch(setProvinceCodePlayBack(value));
                    }}
                    value={wareHouse.filter?.province_code}
                  /> */}
                </View>
                <View>
                  <Text style={styles.label}>Quận /Huyện</Text>
                  <View style={styles.choose_camera}>
                    <RNPickerSelect
                      placeholder={{
                        label: 'Tất cả',
                        value: 'All',
                      }}
                      doneText="Lựa chọn"
                      style={styles}
                      onValueChange={value => {
                        dispatch(setDistrictCodePlayBack(value));
                        // console.log(screen);
                      }}
                      value={wareHouse.filter?.district_code}
                      items={
                        camera?.district
                          ? camera.district.map(item => {
                            return {
                              key: item.code,
                              value: item.code,
                              label: item.name,
                            };
                          })
                          : []
                      }
                    />
                  </View>
                  {/* <DropdownComponent
                    data1={[
                      {
                        value: 'All',
                        label: 'Tất cả',
                      },
                      ...camera.district.map(item => {
                        return {
                          // key: item.code,
                          value: item.code,
                          label: item.name,
                        };
                      }),
                    ]}
                    setData={value => {
                      dispatch(setDistrictCodePlayBack(value));
                      // console.log(screen);
                    }}
                    value={wareHouse.filter?.district_code}
                    position={'top'}
                  /> */}
                </View>

                <View>
                  <CheckBox
                    style={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                    rightTextStyle={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                    onClick={() => dispatch(setIsBG(!wareHouse?.filter.isBG))}
                    rightText={'Camera có bản ghi'}
                    isChecked={wareHouse?.filter.isBG}
                    checkBoxColor={'#0040FF'}
                  />
                </View>

                <View style={styles.action}>
                  <Pressable
                    onPress={handleResetFilter}
                    style={{ ...styles.btn, ...styles.reset }}>
                    <Text
                      style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 700 }}>
                      Thiết lập lại
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(setReload(!wareHouse.reload));
                      onShowModal();
                    }}
                    style={{ ...styles.btn, ...styles.primary }}>
                    <Text style={{ color: '#fff', fontWeight: 700 }}>
                      Áp dụng
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </ModalLocation>
  );
};

export default Modal;
