import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        textAlign: 'left',
        flex: 1,
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
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#fff'
    },

    name: {
        fontSize: 16,
        lineHeight: 24,
        color: "rgba(0, 0, 0, 0.4)",
    },
    chart: {
        flex: 1,
        backgroundolor: '#fff'
    },
    legend: {
        marginTop: 30,
        width: 170,
        maxHeight: 160,
        // marginRight: 32,
        backgroundColor: '#fff'
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        borderStyle: 'solid',
        paddingBottom: 4,
    },
    legend_color: {
        width: 8,
        height: 8,
        borderRadius: 2,
        marginTop: 7,
    },
    label_legend: {
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        marginLeft: 8,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 400,
        color: '#000000',
        maxWidth: 120
    }
})