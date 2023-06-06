import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    filter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 4,
        maxWidth: '100%',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    location: {
        display: "flex",
        flexDirection: "row",
    },
    status: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
    },
    area: {
        paddingLeft: 8,
        paddingTop: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    name_location: {
        maxWidth: 160,
        color:"rgba(0, 0, 0, 0.4)",
    }

})