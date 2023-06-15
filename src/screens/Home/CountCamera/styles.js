import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        // textAlign: 'left',
        flexDirection: 'column',
        // flex: 1,
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
    contentHeader: {
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
    },
    boxHeader: {
        // width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 18,
        flexWrap: 'wrap',
    },
    headerItem: {
        display: 'flex',
        // width: 170,
        width: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
    },
    number: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '700',
        marginBottom: 4,
        color: 'black',
    },
    name: {
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(0, 0, 0, 0.4)',
    },
    image_camera: {
        width: 52,
        height: 52,
        marginBottom: 12,
    },
    icons: {
        flexDirection: 'row',
        display: 'flex',
        gap: 12,
        paddingRight: 16,
    },
});
