import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        flex:1
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 44,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
        paddingLeft:12,
        paddingRight:12,
      },
      text: {
        padding: 10,
        paddingLeft: 16,
        fontSize: 18,
        fontWeight: "700",
        color:"#000000"
      },
      content:{
        padding:12
      },
      item:{
        flexDirection:"row",
        display:"flex",
        paddingTop:10,
        paddingBottom:10
      },
      title:{
        flex:1,
        color:"rgba(0, 0, 0, 0.4)",
      },
      description:{
        flex:2,
        color:"#000000",
        paddingLeft:12
      }
})