import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    content: {
      backgroundColor: '#0040FF',
      alignItems: 'center',
      justifyContent: "space-between",
      flexDirection: 'row',
      color:"#ffffff",
      paddingTop:44
    },
    text:{
      color:"#ffffff",
      padding:10,
      paddingLeft:16,
      fontSize:18,
      fontWeight:"700"

    },
    icons:{
        flexDirection: 'row',
        display:"flex",
        gap:12,
        paddingRight:16
    }
  });