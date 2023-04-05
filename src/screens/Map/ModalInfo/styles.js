import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    // info
    box_info: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 400,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 99999999,
        overflow: 'hidden',
    },
    info_control: {
        padding: 16,
        paddingTop: 6,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    button_control: {
        height: 4,
        width: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.07)',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name_camera: {
        fontSize: 18,
        lineHeight: 28,
        color: '#000',
        fontWeight: 700,
    },
    content: {
        padding: 16,
    },
    info_item: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
        gap: 16
    },
    label: {
        minWidth: 66,
        fontSize: 14,
        color: 'rgba(0,0,0,0.4)',
        fontWeight: 400,
        lineHeight: 20,
    },
    info: {
        width: 261,
        fontSize: 14,
        color: '#000',
        fontWeight: 400,
        lineHeight: 20,
    },
    btnText: {
        color: "#ffffff"
    },
    buttonLogin: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: "#0040FF",
        marginBottom: 25,
    },
});