import React, {useState} from 'react';
import {
  Modal as ModalLocation,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Close, Radio, RadioCheck, Back} from '../../../components/Icons/Index';
import {useDispatch, useSelector} from 'react-redux';
import {setAiCode,setNameAI} from '../../../redux/actions/reportAction';
import {styles} from './styles';
const Modal = ({filter, onShowModal, isShow, animate}) => {
  const report = useSelector(state => state.reportReducer);
  const dispatch = useDispatch();
  return (
    <ModalLocation
      animationType={animate ? animate : 'fade'}
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        onShowModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.titleHeader}>Dịch vụ</Text>
            <Pressable
              onPress={() => {
                onShowModal();
              }}
              style={styles.iconModal}>
              <Close />
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <ScrollView>
              {/* <View style={styles.item}>
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
                <Pressable onPress={() => setIsProvince()}>
                  <NextIcon />
                </Pressable>
              </View> */}
              {report.package.map((item, index) => {
                return (
                  <View key={index} style={styles.item}>
                    <CheckBox
                      containerStyle={styles.radio}
                      key={index}
                      checkedIcon={<RadioCheck />}
                      uncheckedIcon={<Radio />}
                      title={item.SUBJECT_NAME}
                      onPress={() => {
                        dispatch(setAiCode(item.CODE));
                        dispatch(setNameAI(item.SUBJECT_NAME));
                      }}
                      checked={filter === item.CODE ? true : false}
                    />
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
