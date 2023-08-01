import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 48,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        paddingLeft: 12,
        paddingRight: 12,
    },
    text: {
        padding: 10,
        paddingLeft: 16,
        fontSize: 18,
        marginLeft: '25%',
        fontWeight: '700',
        color: '#000000',
    },
    content: {
        padding: 12,
    },
    item: {
        flexDirection: 'column',
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative',
    },
    title: {
        color: 'rgba(0, 0, 0, 0.4)',
        paddingTop: 8,
    },
    description: {
        flex: 2,
        color: '#000000',
        paddingLeft: 12,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        padding: 12,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(0, 0, 0, 0.7)',
    },
    disable: {
        backgroundColor: '#F7F7F7',
    },
    labelButton: {
        display: 'flex',
        width: '100%',
        gap: 4,
        flexDirection: 'row',
    },
    buttonSubmit: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#0040FF',
        height: 48,
    },
    buttonCancel: {
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        height: 48,
        backgroundColor: '#FF3300',
    },
    login: {
        width: '50%',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 24,
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
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontSize: 12,
        ...Platform.select({
            ios: {
                bottom: -8,
            },
            android: {
                top: 68,
            },
        }),
        left: 8,
        position: 'absolute',
        width: '100%',
    },
});
