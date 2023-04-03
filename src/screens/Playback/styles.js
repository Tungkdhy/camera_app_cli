import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container:{
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
        backgroundColor:"#fff"

    },
    header:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 44,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
        backgroundColor:"#fff",
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
        padding:12,
        flexDirection:"column",
        paddingTop:0
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
        flexDirection:"row",
        backgroundColor:"#fff",
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
    }
})