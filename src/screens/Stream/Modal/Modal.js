import React, {useState} from 'react';
import {
  Modal as ModalLocation,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Close, NextIcon,Radio,RadioCheck} from '../../../components/Icons/Index';
import {useDispatch} from 'react-redux';
import {
  setProvinceCode,
  setDistrictCode,
} from '../../../redux/actions/cameraAction';
import {styles} from './styles';
const Modal = ({
  data,
  filter,
  onShowModal,
  isShow,
  setIsProvince,
  isProvince,
}) => {
  const dispatch = useDispatch();
  return (
    <ModalLocation
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        onShowModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.titleHeader}>Khu vực</Text>
            <Pressable onPress={() =>{
               onShowModal()
               if(!isProvince){
                  setIsProvince()
               }
            }} style={styles.iconModal}>
              <Close />
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.search}>
              <TextInput style={styles.input} placeholder="Tìm kiếm" />
            </View>
            <ScrollView>
              <View style={styles.item}>
                <CheckBox
                  containerStyle={styles.radio}
                  title="Tất cả"
                  checkedIcon={<RadioCheck/>}
                  uncheckedIcon={<Radio/>}
                  onPress={() => {
                    dispatch(setProvinceCode(''));
                    dispatch(setDistrictCode(''));
                  }}
                  checked={filter === '' ? true : false}
                />
                <Pressable onPress={() => setIsProvince()}>
                  <NextIcon />
                </Pressable>
              </View>
              {data.map((item, index) => {
                return (
                  <View key={index} style={styles.item}>
                    <CheckBox
                      containerStyle={styles.radio}
                      title={item.name}
                      key={index}
                      checkedIcon={<RadioCheck/>}
                      uncheckedIcon={<Radio/>}
                      onPress={() =>
                        dispatch(
                          isProvince
                            ? setProvinceCode(item.code)
                            : setDistrictCode(item.code),
                        )
                      }
                      checked={filter === item.code ? true : false}
                    />
                    <Pressable onPress={() => setIsProvince()}>
                      <NextIcon />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </ModalLocation>
  );
};

export default Modal;
