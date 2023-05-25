import {StyleSheet, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  item: {
    width: 100,
    height: 40,
    backgroundColor: 'red',
    flex: 1,
    display: 'flex',
  },
  vach: {
    position: 'absolute',
    left: screenWidth / 2 - 15,
    width: 2,
    height: 40,
    bottom: 0,
    backgroundColor: 'white',
  },
  time:{
    textAlign:"center",
    paddingBottom:8,
    paddingTop:8
  }
});
