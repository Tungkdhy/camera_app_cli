import { View, ScrollView, Alert } from 'react-native';
import Header from '../../components/Header/Header';
import { style } from './styles';
import CountCamera from './CountCamera';
import DonutChart from './DonutChart';
import { useCallback, useEffect, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import CountAI from './CountAI';
import axiosClient from '../../services/axiosClient';
import streamingClient from '../../services/axiosStreaming';
import AnalyticAI from './AnalyticAI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [countCamera, setCountCamera] = useState({
    COUNT_CAM: 0,
    ACTIVE: 0,
    INACTIVE: 0,
    VIEWS: 0,
    COMPANY_CODE: null,
    MOTION: 0,
    COMMON_OBJECT: 0,
    MOVEMENT: 0,
    NO_CONNECT: 0,
    WEAK: 0,
  });
  const [companyName, setCompanyName] = useState('');

  const getListStatus = useCallback(async () => {
    try {
      const res = await streamingClient.get(
        '/streamManagement/get-list-state-camera-stream/',
      );
      return res;
    } catch (e) { }
  }, []);

  useEffect(() => {
    const getAndUpDateCountCamera = async () => {
      const getCountCamera = await axiosClient.post(
        '/statCountCam/post-add-stat-count-cam/',
      );
      setCountCamera({

        COUNT_CAM: getCountCamera.data[0]?.COUNT_CAM,
        ACTIVE: getCountCamera.data[0]?.ACTIVE,
        INACTIVE: getCountCamera.data[0]?.INACTIVE,
        NO_CONNECT: getCountCamera.data[0]?.LOST_CONNECT,
        WEAK: getCountCamera.data[0]?.CONNECT_WEAK,
        VIEWS: getCountCamera.data[0]?.VIEWS,
        COMPANY_CODE: getCountCamera.data[0]?.COMPANY_CODE,
        MOTION: getCountCamera.data[0]?.MOTION,
        COMMON_OBJECT: getCountCamera.data[0]?.COMMON_OBJECT,
        MOVEMENT: getCountCamera.data[0]?.MOVEMENT,
      });
      const getNameCompany = await axiosClient.get(
        `/company/get-list-company/?company_code=${getCountCamera[0]?.COMPANY_CODE}`,
      );
      let name = getNameCompany[0]?.NAME ? getNameCompany[0]?.NAME : 'Mặc định';
      setCompanyName(name);
      const upDateCountCamera = await axiosClient.post(
        '/statCountCam/post-add-stat-count-cam/',
      );
      return upDateCountCamera;
    };
    getAndUpDateCountCamera();
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }, []);
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      Alert.alert('Đăng xuất?', 'Bạn có muốn đang xuất không', [
        { text: 'Không', style: 'cancel', onPress: () => { } },
        {
          text: 'Có',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
      // Prompt the user before leaving the screen
    });
  }, [navigation]);
  return (
    <>
      <Header title={'Thống kê'} navigation={navigation} />
      <View style={style.container}>
        <ScrollView>
          <CountCamera companyName={companyName} countCamera={countCamera} />
          <CountAI countCamera={countCamera} />
          <DonutChart title={'Tổng số Camera theo nhóm'} type={'group'} />
          <DonutChart
            title={'Tổng số Camera theo địa điểm'}
            type={'warehouse'}
          />
          <AnalyticAI navigation={navigation} />
        </ScrollView>
      </View>
    </>
  );
}
