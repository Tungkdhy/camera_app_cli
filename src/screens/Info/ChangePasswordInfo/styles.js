import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 44,
        borderBottomWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
        paddingLeft: 12,
        paddingRight: 12,
    },
    text: {
        padding: 10,
        paddingLeft: 16,
        fontSize: 18,
        marginLeft: '25%',
        fontWeight: "700",
        color: "#000000",
    },
    content: {
        padding: 12
    },
    item: {
        position: 'relative',
        flexDirection: "column",
        display: "flex",
        paddingTop: 10,
        paddingBottom: 10
    },
    title: {
        color: "rgba(0, 0, 0, 0.7)",
    },

    label: {
        color: "rgba(0, 0, 0, 0.4)",
        marginTop: 8,
        letterSpacing: 0.9,
    },
    description: {
        flex: 2,
        color: "#000000",
        paddingLeft: 12
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        padding: 12,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(0, 0, 0, 0.7)',
    },
    disable: {
        backgroundColor: '#F7F7F7'
    },
    labelButton: {
        width: '100%',
    },
    buttonSubmit: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: "#0040FF",
        height: 48,
        width: '100%'
    },
    btnText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 24,
        width: '100%',
        textAlign: 'center'
    },
    picker: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderStyle: 'solid',
        borderRadius: 4,
        backgroundColor: '#F7F7F7',
        marginTop: 10,
        display: 'flex',
    },
    eyeIcon: {
        position: "absolute",
        top: 54,
        right: 12,
        zIndex: 10
    },
    borderError: {
        borderColor: "red",
        color: "red"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    contain: {
        position:'relative',
        height: '100%',
    }
})