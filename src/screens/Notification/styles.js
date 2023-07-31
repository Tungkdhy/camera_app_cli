import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    header: {
        display: 'flex',

        alignItems: "center",
        flexDirection: "row",
        // paddingTop: 36,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#0040FF',
    },
    text: {
        display: 'flex',
        padding: 10,
        fontSize: 18,

        fontWeight: "700",
        color: "#fff",
        textAlign: 'center',
        marginLeft: '30%',
    },
    control: {
        paddingTop: 12,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        borderBottomColor: 'rgba(0,0,0,0.04)',
        borderBottomWidth: 1,
    },
    button: {
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
    },
    button_active: {
        borderBottomColor: '#0040FF',
        borderBottomWidth: 1,
        color: '#0040FF',
    },
    sub_button: {
        // fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: 'rgba(0,0,0,0.4)',
    },
    sub_button_active: {
        color: '#0040FF',
    },
    content: {
        padding: 12,
        height: '85%',
        backgroundColor: '#fff',
    },
    date_block: {
        backgroundColor: 'white',
        paddingBottom: 16,
    },
    time_block: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: 'rgba(0,0,0,0.4)',
        marginBottom: 12,
    },

    list_item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },

    item: {
        padding: 16,
        backgroundColor: 'rgba(20, 30, 210, 0.05)',
        borderRadius: 4,
        position: 'relative',
    },
    new: {
        padding: 16,
        backgroundColor: 'rgba(20, 30, 210, 0.2)',
        borderRadius: 4,
        position: 'relative',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: 'rgba(0,0,0,1)',
        letterSpacing: 0.8,
    },
    time: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: 'rgba(0,0,0,0.4)',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#000',
        marginBottom: 4,
    },
    tick: {
        position: 'absolute',
        height: 8,
        width: 8,
        top: 22,
        right: 22,
        backgroundColor: '#0040FF',
        borderRadius: 4,
    },
});
