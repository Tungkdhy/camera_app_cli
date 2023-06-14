import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        maxHeight: '100%'
    },
    list: {
        marginVertical: 20,
    },
    icon: {
        marginTop: 8,
    }
});
