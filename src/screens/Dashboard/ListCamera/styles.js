import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingBottom: 64,
        paddingTop: 0,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
    },
    // header
    title: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
    },
    number: {
        paddingLeft: 9,
        paddingRight: 9,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    count: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.4)',
        marginTop: 1,
    },
    content: {
        marginTop: 12,
        marginBottom: 17,
        maxHeight: '100%',
    },
    list: {
        // marginVertical: 20,
        // marginBottom: 30,
        // ...Platform.select({
        //     ios: {
        //         marginBottom: 30,
        //     },
        // }),
    },
    icon: {
        marginTop: 8,
    },
    buttonMore: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                marginBottom: 70,
            },
        }),
    },
});
