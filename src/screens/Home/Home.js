
import { View, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';
import { style } from './styles';
import CountCamera from './CountCamera';
import DonutChart from './DonutChart';
import { useCallback, useEffect, useState } from 'react';
import CountAI from './CountAI';
import axiosClient from '../../services/axiosClient';
import streamingClient from '../../services/axiosStreaming';
import AnalyticAI from './AnalyticAI';

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
      const getCountCamera = await axiosClient.get(
        '/statCountCam/get-list-stat-count-cam/',
      );
      setCountCamera({
        COUNT_CAM: getCountCamera[0]?.COUNT_CAM,
        ACTIVE: getCountCamera[0]?.ACTIVE,
        INACTIVE: getCountCamera[0]?.INACTIVE,
        NO_CONNECT: getCountCamera[0]?.LOST_CONNECT,
        WEAK: getCountCamera[0]?.CONNECT_WEAK,
        COMPANY_CODE: getCountCamera[0]?.COMPANY_CODE,
        MOTION: getCountCamera[0]?.MOTION,
        COMMON_OBJECT: getCountCamera[0]?.COMMON_OBJECT,
        MOVEMENT: getCountCamera[0]?.MOVEMENT,
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
  console.log(countCamera);
  return (
    <>
      <Header title={"Thống kê"} navigation={navigation} />
      <View style={style.container}>
        <ScrollView>
          <CountCamera companyName={companyName} countCamera={countCamera} />
          <CountAI countCamera={countCamera} />
          <DonutChart title={'Tổng số Camera theo nhóm'} type={'group'} />
          <DonutChart title={'Tổng số Camera theo địa điểm'} type={'warehouse'} />
          <AnalyticAI navigation={navigation} />
        </ScrollView>
      </View>
    </>
  );
}

