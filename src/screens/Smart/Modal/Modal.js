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
import DropdownComponent from '../../../components/Select/Select';
import {
  setFilterProvince,
  setFilterDistrict,
  setRefresh,
  // setCheckBGReport,
} from '../../../redux/actions/cameraAction';
import {
  setProvinceCodeReport,
  setDistrictCodeReport,
  setCheckBGReport,
  setServiceCode,
} from '../../../redux/actions/reportAction';
import axiosClient from '../../../services/axiosClient';
import { styles } from './styles';
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
  const report = useSelector(state => state.reportReducer);
  const handleResetFilter = () => {
    dispatch(setProvinceCodeReport('All'));
    dispatch(setDistrictCodeReport('All'));
    dispatch(setRefresh(!camera.refresh));
    dispatch(setCheckBGReport(true));
    dispatch(setServiceCode('20230222000000000001'));
    onShowModal();
  };
  const handleSetProvince = data => {
    dispatch(setProvinceCodeReport(data));
  };
  const handleSetDistrict = data => {
    dispatch(setDistrictCodeReport(data));
  };
  useEffect(() => {
    async function getPackage() {
      try {
        const res = await axiosClient.get('/service/get-list-services/');
        dispatch(setServiceCode(res[0].CODE));
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
                    dispatch(setFilterDistrict(''));
                  }}
                  style={styles.iconModal}>
                  <Close />
                </Pressable>
              </View>
              {/* <DropdownComponent /> */}
              <View style={styles.modalContent}>
                <View>
                  <Text style={styles.label}>Tỉnh/Thành phố</Text>
                  <DropdownComponent
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
                    setData={handleSetProvince}
                    value={report.filter?.province_code}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Quận /Huyện</Text>
                  {/* <View style={styles.choose_camera}> */}
                  {/* <RNPickerSelect
                      placeholder={{
                        label: 'Tất cả',
                        value: 'All',
                      }}
                      doneText="Lựa chọn"
                      style={styles}
                      onValueChange={value => {
                        dispatch(setDistrictCodeReport(value));
                      }}
                      value={report.filter?.district_code}
                      items={
                        camera?.district
                          ? camera.district.map(item => {
                            return {
                              // key: item.code,
                              value: item.code,
                              label: item.name,
                            };
                          })
                          : []
                      }
                    /> */}
                  <DropdownComponent
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
                    setData={handleSetDistrict}
                    value={report.filter?.district_code}
                    position={report?.filter.isBG ? 'auto' : 'top'}
                  />
                  {/* </View> */}
                </View>

                {report?.filter.isBG && (
                  <View>
                    <Text style={styles.label}>Sự kiện</Text>
                    <View style={styles.choose_camera}>
                      <RNPickerSelect
                        doneText='Lựa chọn'
                        placeholder={ {}}
                        style={styles}
                        onValueChange={value => {
                          dispatch(setServiceCode(value));
                        }}
                        value={report.filter?.ai_code}
                        items={
                          services
                            ? services.filter((item) => item.CODE !== '20230222000000000002').map(item => {
                              if(item.CODE !== '20230222000000000002') {
                                return {
                                  key: item.CODE,
                                  value: item.CODE,
                                  label: item.SUBJECT_NAME,
                                };
                              } else {
                                return <></>
                              }
                            })
                            : []
                        }
                      />
                    </View>
                  </View>
                )}
                {/* <DropdownComponent /> */}
                <View>
                  <CheckBox
                    style={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                    rightTextStyle={{
                      color: 'rgba(0, 0, 0, 0.4)',
                    }}
                    onClick={() =>
                      dispatch(setCheckBGReport(!report.filter.isBG))
                    }
                    rightText={'Camera có bản ghi'}
                    isChecked={report.filter.isBG}
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
                      dispatch(setRefresh(!camera.refresh));
                      onShowModal();
                    }}
                    style={{ ...styles.btn, ...styles.primary }}>
                    <Text style={{ color: '#fff', fontWeight: 700 }}>
                      Áp dụng
                    </Text>
                  </Pressable>
                </View>
                {/* <DropdownComponent /> */}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </ModalLocation>
  );
};

export default Modal;
