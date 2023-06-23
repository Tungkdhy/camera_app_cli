import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        // maxHeight: '100%',
        marginBottom: 8,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    // header 
    title: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
    },
    number: {
        backgroundColor: '#FF3300',
        borderRadius: 30,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 9,
        paddingRight: 9,
        display: 'flex',
        alignItems: 'center',
    },
    count: {
        fontSize: 12,
        color: '#fff',
        marginTop: 1,
    },
    // content
    content: {
        marginTop: 12,
        marginBottom: 17,
        paddingTop: 12,
        maxHeight: '100%'
    },
    item: {
        padding: 16,
        backgroundColor: 'rgba(20, 30, 210, 0.05)',
        borderRadius: 4,
        position: 'relative',
        marginBottom: 8,
    },
    new: {
        padding: 16,
        backgroundColor: 'rgba(20, 30, 210, 0.2)',
        borderRadius: 4,
        position: 'relative'
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
    // bottom
    buttonMore: {
        // width: '100%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 12,
        alignItems: 'center',
        gap: 16
    },
});
