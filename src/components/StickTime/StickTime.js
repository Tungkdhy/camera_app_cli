import React, {useRef, useState} from 'react';
import {ScrollView, Text, View, Dimensions} from 'react-native';
import {styles} from './styles';
import { useSelector,useDispatch } from 'react-redux';
import { setTimeStick } from '../../redux/actions/playBackAction';
import { convertToSecond,covertWidthToHour } from '../../utils';
const StickTime = () => {
  const [list, setList] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23
  ]);
  const ref = useRef();
  const debouce = useRef()
  const dispatch = useDispatch()
  const screenWidth = Dimensions.get('window').width;
  const stick_time = useSelector((state)=>state.playBackReducer.filter.stick_time)
  const playback = useSelector(state => state.playBackReducer);
  return (
    <View style={{position: 'relative'}}>
      <Text style={styles.time}>{playback.filter.day} {stick_time}</Text>
      <ScrollView
        onScroll={event => {
          const x = event.nativeEvent.contentOffset.x/100
          if (debouce.current) {
            clearTimeout(debouce.current);
          }
          debouce.current = setTimeout(() => {
            dispatch(setTimeStick(covertWidthToHour(x)))
          }, 300);
        
         
        }}
        style={{flexGrow: 0}}
        showsHorizontalScrollIndicator={false}
        horizontal
        // contentOffset={{y:0,x:convertToSecond(stick_time)}}
        ref={ref}
        >
        <View style={styles.container}>
          <View style={{width:screenWidth/2-15,height:40,backgroundColor:"red"}} >
           
          </View>
          {list.map(item => (
            <View style={styles.item} key={item}>
              <Text style={{color:"white"}}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={{width:screenWidth/2-15,height:40,backgroundColor:"red"}}>
           
           </View>
      </ScrollView>
      <View style={styles.vach}></View>
    </View>
  );
};

export default StickTime;
