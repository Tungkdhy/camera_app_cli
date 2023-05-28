import {StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    backgroundColor:"black"
  },
  item: {
    width: 100,
    height: 40,
    // backgroundColor: 'black',
    flex: 1,
    display: 'flex',
    position:"relative",
    zIndex:3
  },
  vach: {
    position: 'absolute',
    left: screenWidth / 2 - 15,
    width: 4,
    height: 40,
    bottom: 0,
    backgroundColor: 'green',
  },
  time:{
    textAlign:"center",
    paddingBottom:8,
    paddingTop:8
  }
});
