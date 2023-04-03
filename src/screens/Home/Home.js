
import { View, ScrollView } from 'react-native';
import Header from '../../components/Header/Header';
import { style } from './styles';
import CountCamera from './CountCamera';
import DonutChart from './DonutChart';
import LineChartService from './LineChart';


export default function Home({ navigation }) {

  return (
    <>
      <Header title={"Thống kê"} navigation={navigation} />
      <View style={style.container}>
        <ScrollView>
          <CountCamera />
          <DonutChart title={'Tổng số Camera theo nhóm'} type={'group'} />
          <DonutChart title={'Tổng số Camera theo địa điểm'} type={'warehouse'} />
          <LineChartService type={'Phát hiện chuyển động'} />
          <LineChartService type={'Nhận diện người'} />
          <LineChartService type={'Nhận diện khuôn mặt'} />
        </ScrollView>
      </View>
    </>
  );
}


