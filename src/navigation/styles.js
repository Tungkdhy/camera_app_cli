import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"#fff",
        justifyContent:"space-around",
        alignItems:"center",
        paddingBottom:12
    },
    item:{
        // flex:1,
        flex:1,
        // backgroundColor:"red",
        paddingTop:14,
        paddingBottom:14,
        alignItems:"center",
        display:"flex",
        marginLeft:12,
        marginRight:12
        
        
    },
    active:{
        borderTopWidth:2,
        borderColor:"#0040FF",
        // backgroundColor:"rgba(20, 30, 210, 0.05)"
    }
})