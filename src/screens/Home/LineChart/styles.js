import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        textAlign: 'left',
        flex:1,
        marginTop: 0,
        padding: 16,
        marginBottom: 8,
    },
    header: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
    },
    boxHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
    },
    headerItem: {
        display: 'flex',
        width: 187,
        flexDirection: 'column',
        alignItems: "center",
    },
    number: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        lineHeight: 24,
        color: "rgba(0, 0, 0, 0.4)",
    },
    image: {
        width: 24,
        marginBottom: 12,
    },
    header_fill: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    fill: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        marginRight: 40,
    },
    choose_camera: {
        display: 'flex',
        marginRight: 40,
        height: 48,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderStyle: 'solid',
        borderRadius: 4,
        marginBottom: 16,
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 20,
    },
    active: {
        color: '#0040FF'
    }
})