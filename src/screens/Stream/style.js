import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
        paddingLeft:16,
        paddingRight:16
      
    },
    address:{
        flexDirection:"row",
        display:"flex",
        justifyContent:"space-between",
        
    },
    flex:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",

    },
    textActive:{
        width:"50%",
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:16,
        padding:12,
        paddingBottom:10,
        color:"#0040FF",
        borderBottomColor:"#0040FF",
        borderBottomWidth:2,
    },
    text:{
        padding:12,
        width:"50%",
        textAlign:"center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:16,
        padding:6,
    },
    active:{
        color:"#0040FF",
    },
    cameraItem:{
        display:"flex",
        flexDirection:"row",
        paddingTop:12,
        paddingBottom:12,
        alignItems:"center"
    },
    camera:{
        height:600
    },
    name:{
        // lineHeight:2,
        fontSize:14,
        fontWeight:"600"
    },
    icon:{
        paddingTop:0,
        marginTop:4
    },
    listCamera:{
        paddingLeft:24
    },
    cameraName:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:6
    },
    nameCamera:{
        paddingBottom:8,
        paddingTop:8
    },
    status:{
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:"#0040FF",
        // borderWidth:4,
        // borderColor:"rgba(0, 64, 255, 0.15)"
        // elevation:6,
        shadowOffset: { width: 0, height: 0 },
        color:"#0040FF",
        marginRight:8,
       
    },
    border:{
        borderBottomWidth:1,
        borderColor:"rgba(0, 0, 0, 0.05)"
    },
    centeredView:{
        backgroundColor:"#00000047",
        height:"100%",
        display:"flex",
        justifyContent:"flex-end",    
    },
    modalView:{
        height:600,
        backgroundColor:"#fff",
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        paddingTop:16,
       
    },
    modalHeader:{
        paddingTop:4,
        paddingBottom:20,
        borderBottomWidth:1,
        borderColor:"rgba(0, 0, 0, 0.05)",
        paddingLeft:16,
        paddingRight:16
    },
    titleHeader:{
        fontSize:18,
        fontWeight:"700",
        textAlign:"center"
    },
    input:{
        marginTop:16,
        padding:16,
        borderRadius:4,
        paddingLeft:42,
        paddingRight:40,
      
        backgroundColor:"#F8F8F8"
      },
      modalContent:{
        paddingLeft:16,
        paddingRight:16,
    },
    radio:{
       
        backgroundColor:"#fff",
        borderWidth:0,
        paddingLeft:0
        
    },
    item: {
        flexDirection:"row",
        justifyContent:"space-between",
        borderColor:"rgba(0, 0, 0, 0.05)",
        alignItems:"center",
        borderBottomWidth:1,
    },
    iconModal:{
        position:"absolute",
        right:-20,
        top:6,
        zIndex:100,
        width:60,
        height:30
    }
  });