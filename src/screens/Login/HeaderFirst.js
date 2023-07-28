import { Image, Text } from 'react-native';
import { styles } from './styles';
function HeaderFirst() {
    return (
        <>
            <Image
                style={styles.logo}
                source={require('../../assets/images/Logo_app.png')}
            />
            <Text style={styles.text_header}>Hệ thống Camera AI</Text>
        </>
    )
}

export default HeaderFirst;