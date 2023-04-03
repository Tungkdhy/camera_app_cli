import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        flex:1
    },
    bgName: {
    // justifyContent:"center",
    // alignItems:"center"
    flexDirection: 'row',
    paddingBottom:8
  },
  image: {
    paddingTop: 60,
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  content: {},
  name: {
    fontWeight: "700",
    fontSize:20,
    color:"#fff",
    paddingTop:12,
  },
  username:{
    color:"rgba(255, 255, 255, 0.7)",
    fontSize:16,
    paddingTop:4
  },
  item:{
    flexDirection:"row",
    display:"flex",
    justifyContent:"space-between",
    paddingLeft:16,
    paddingRight:12,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  title:{
    flexDirection:"row",
    alignItems:"center"
  },
  icon:{
    marginRight:16,
    padding:11,
    backgroundColor:"rgba(0, 0, 0, 0.03)",
    borderRadius:20
  },
  text:{
    fontSize:16,
    color:"#000000",
    
  },
  next:{
    paddingTop:12
  }
});
