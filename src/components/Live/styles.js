import { StyleSheet,Dimensions } from "react-native";
const windowHeight = Dimensions.get('window').width * (9 / 16);
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex:1,
    
    
  },
  containerFull:{
    flex:1,
    backgroundColor:"black",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 44,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  content:{
 
  },
  contentFull:{
    position:"absolute",
    top:0,
    left:0,
    bottom:0,
    right:0,
  },
  text: {
    padding: 10,
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  icons: {
    flexDirection: "row",
    display: "flex",
    gap: 12,
    paddingRight: 16,
  },
  image: {
    width: "100%",
  },
  activeFull: {
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    paddingBottom: 12,
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0
  },
  active:{
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    paddingBottom: 12,
  },
  cam:{
    flexDirection:"row",
    display:"flex",
    alignItems:"center",
    gap:4
  },  
  info: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    // transform: [{rotateZ: '90deg'}],

  },
  infoFull:{
    position:"absolute",
    top:12
    // paddingTop: 8,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // position:"absolute",
    // top:-360,
    // left:-160,
    // bottom:0,
    // right:100,
    // backgroundColor:"black"
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSetting: {
    paddingLeft: 8,
    alignItems: "center",
  },
  list: {
    marginVertical: 20,
  },
  nameCamera: {
    paddingTop: 4,
  },
  imageItem: {
    width: "100%",
  },
  centeredView: {
    backgroundColor: "#00000047",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  modalView: {
    height: 600,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 16,
  },
  modalHeader: {
    paddingTop: 4,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  iconModal: {
    position: "absolute",
    right: 8,
    top: 6,
    zIndex: 100,
    width: 30,
    height: 30,
  },
  modalContent:{
    padding:16
  },
  infoItem: {
    flexDirection: "row",
    paddingBottom:16
  },
  titleInfo:{
    flex:4
  },
  descriptionInfo:{
    flex:11,
    paddingLeft:16
  },
  title:{
    color:" rgba(0, 0, 0, 0.4)"
  },
  fullScreen:{
    // width: Dimensions.get('window').height,
    // height: Dimensions.get('window').width,
    // minWidth: Dimensions.get('window').height,
    // minHeight: Dimensions.get('window').width,
    width: width,
    height: height,

    // transform: [{rotate: '90deg'}],
  },
  noPath:{
    width:"100%",
    height:240,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }
});
