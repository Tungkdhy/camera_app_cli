import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 4,
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    area: {
        paddingLeft: 8,
        paddingTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name_location: {
        maxWidth: 60,
        color: 'rgba(0, 0, 0, 0.4)',
    },
});
