
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from '../../components/Header/Header';
import { ChartIcon,SearchIcon } from '../../components/Icons/Index';
import Navigation from '../../navigation/Navigation';
import { useSelector,useDispatch } from 'react-redux';
import { setNameCamera } from '../../redux/actions/cameraAction';
import { style } from './styles';

export default function Home({navigation}) {
  const camera = useSelector(state=>state.useReducer)
  const dispatch = useDispatch()
  console.log(camera);
  return (
   <>
     <Header title={"Thống kê"}/>
     <View style={style.container}>
      <TextInput
        placeholder='Nhập'
        value={camera.name}
        onChangeText={(text)=> dispatch(setNameCamera(text))}
      />
      
      <Text>{camera.name} Open up Home.js to start working on your Home! hello tran tung</Text>
      {/* <StatusBar style={style.auto} /> */}
      <ChartIcon/>
    </View>
    {/* <Navigation navigation={navigation}/> */}
   </>
  );
}


