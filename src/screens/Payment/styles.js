import { StyleSheet,Dimensions } from "react-native";
export const styles = StyleSheet.create({
    container:{
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
        backgroundColor:"#fff"

    },
    contentFull:{
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0,
        transform: [{rotateZ: '90deg'}],
        zIndex:1000
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
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position:"absolute",
        top:-360,
        left:-160,
        bottom:0,
        right:100,
        // backgroundColor:"black"
      },
    header:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 44,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
    },
    text:{
        padding: 10,
        paddingLeft: 16,
        fontSize: 18,
        fontWeight: "700",
    },
    content:{
        flex:1,
        backgroundColor:"#fff",
        flexDirection:"column",
        marginTop:12
    },
    item:{
        flexDirection:"row",
        borderBottomWidth:1,
        borderColor:"rgba(0, 0, 0, 0.05)",
        paddingBottom:12,
        paddingTop:12
    },
    image:{
        flex:1
    },
    detail:{
        flex:3,
        paddingLeft:12
    },
    time:{
        flexDirection:"row",
        gap:12,
        paddingBottom:4
    },
    fileName:{
        fontSize:14,
        fontWeight:"700",
        color:"#000",
        paddingBottom:4
    },
    service:{
        flexDirection:"row",
        gap:4
    },
    serviceItem:{
        padding:6,
        backgroundColor:"rgba(0, 0, 0, 0.03)",
        borderRadius:4
    },
    filter:{
        paddingTop:10,
        paddingBottom:16,
        flexDirection:"row",
        justifyContent:"center",
        gap:16,
        justifyContent:"space-between",
        display:"flex",
    },
    btnFilter:{
        padding:6,
        paddingLeft:18,
        paddingRight:18,
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        display:"flex",
        alignItems:"center",
        // flex:1,
        borderColor:"rgba(0, 0, 0, 0.2)",
        borderWidth:1,
        justifyContent:"center",
        // flexDirection:"row"
        
    },
    textContent:{
        display:"flex",
        flexDirection:"row",
        gap:8,
        alignItems:"center"
    },
    fullScreen:{
        // width: Dimensions.get('window').height,
        // height: Dimensions.get('window').width,
        // minWidth: Dimensions.get('window').height,
        // minHeight: Dimensions.get('window').width,
        width: Dimensions.get('screen').height-160,
        height: Dimensions.get('screen').width,
    
        // transform: [{rotate: '90deg'}],
      },
      time:{
        display:"flex",
        flexDirection:"row",
        gap:6
      }
})
