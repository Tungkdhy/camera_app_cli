import React, { useState } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { AddressIcon, DownIcon } from '../Icons/Index';
import { setRecord, setStatus } from '../../redux/actions/cameraAction';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
//Filter location
const Filter = ({ onClick, address, filter, playback, record }) => {
  const dispatch = useDispatch();
  const camera = useSelector(state => state.useReducer);
  //Change status camera
  const toggleSwitch = () =>
    dispatch(setStatus(filter === 'On' ? 'Off' : 'On'));
  const toggleSwitchRecording = () => dispatch(setRecord(record === 0 ? 1 : 0));
  return (
    <View style={styles.filter}>
      <Pressable onPress={onClick}>
        <View style={styles.location}>
          <View style={{ paddingTop: 4 }}>
            <AddressIcon />
          </View>

          <View style={styles.area}>
            <Text style={{ color: 'rgba(0, 0, 0, 0.4)' }}>Khu vực: </Text>
            <Text numberOfLines={1} style={styles.name_location}>
              {camera?.filter?.district_name
                ? camera?.filter?.district_name + ','
                : ''}
              {camera?.filter?.province_name
                ? camera?.filter?.province_name
                : 'Tất cả'}
            </Text>
            <DownIcon />
          </View>
        </View>
      </Pressable>
      {playback && (
        <View style={styles.status}>
          <Text style={{ color: 'rgba(0, 0, 0, 0.4)' }}>Bản ghi</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#0040FF' }}
            thumbColor={record === 1 ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchRecording}
            value={record === 1 ? true : false}
            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          />
        </View>
      )}
      <View style={styles.status}>
        <Text style={{ color: 'rgba(0, 0, 0, 0.4)' }}>Hoạt động</Text>

        <Switch
          trackColor={{ false: '#767577', true: '#0040FF' }}
          thumbColor={filter === 'On' ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={filter === 'On' ? true : false}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
        />
      </View>
    </View>
  );
};

export default Filter;
