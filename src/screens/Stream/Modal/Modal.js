import React, { useState } from 'react';
import {
  Modal as ModalLocation,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  Close,
  NextIcon,
  Radio,
  RadioCheck,
  Back,
} from '../../../components/Icons/Index';
import { useDispatch } from 'react-redux';
import {
  setProvinceCode,
  setDistrictCode,
  setFilterProvince,
  setFilterDistrict,
} from '../../../redux/actions/cameraAction';
import { styles } from './styles';
const Modal = ({
  data,
  filter,
  onShowModal,
  isShow,
  setIsProvince,
  isProvince,
  animate,
}) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  const onChangeTextSearch = data => {
    setInput(data);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      if (isProvince) {
        dispatch(setFilterProvince(data));
      } else {
        dispatch(setFilterDistrict(data));
      }
    }, 300);
  };
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
                <Text style={styles.titleHeader}>Khu vực</Text>
                <Pressable
                  onPress={() => {
                    onShowModal();
                    if (!isProvince) {
                      setIsProvince();
                    }
                    dispatch(setFilterDistrict(''));
                    dispatch(setFilterProvince(''));
                    setInput('');
                  }}
                  style={styles.iconModal}>
                  <Close />
                </Pressable>
              </View>
              <View style={styles.modalContent}>
                {isProvince ? (
                  <></>
                ) : (
                  <View style={styles.title}>
                    <Pressable
                      onPress={() => {
                        setIsProvince();
                        setInput('');
                      }}>
                      <Back />
                    </Pressable>
                    <Text style={styles.textDist}>
                      Chọn quận, huyện, thị xã
                    </Text>
                  </View>
                )}

                <View style={styles.search}>
                  <TextInput
                    value={input}
                    onChangeText={data => onChangeTextSearch(data)}
                    style={styles.input}
                    placeholder="Tìm kiếm"
                  />
                </View>

                <ScrollView>
                  <View style={styles.item}>
                    <CheckBox
                      containerStyle={styles.radio}
                      title="Tất cả"
                      checkedIcon={<RadioCheck />}
                      uncheckedIcon={<Radio />}
                      onPress={() => {
                        dispatch(setProvinceCode(''));
                        dispatch(setDistrictCode(''));
                      }}
                      checked={filter === '' ? true : false}
                    />
                    {/* <Pressable onPress={() => setIsProvince()}>
            <NextIcon />
          </Pressable> */}
                  </View>
                  {data.map((item, index) => {
                    return (
                      <Pressable
                        onPress={() => {
                          dispatch(
                            isProvince
                              ? setProvinceCode({
                                code: item.code,
                                name: item.name,
                              })
                              : setDistrictCode({
                                code: item.code,
                                name: item.name,
                              }),
                          );
                          setIsProvince();
                          setInput('');
                        }}
                        key={index}
                        style={styles.item}>
                        <CheckBox
                          containerStyle={styles.radio}
                          title={item.name}
                          key={index}
                          checkedIcon={<RadioCheck />}
                          uncheckedIcon={<Radio />}
                          checked={filter === item.code ? true : false}
                          onPress={() => {
                            dispatch(
                              isProvince
                                ? setProvinceCode({
                                  code: item.code,
                                  name: item.name,
                                })
                                : setDistrictCode({
                                  code: item.code,
                                  name: item.name,
                                }),
                            );
                            setIsProvince();
                            setInput('');
                          }}
                        />
                        {isProvince && (
                          <View>
                            <NextIcon />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </ModalLocation>
  );
};

export default Modal;
