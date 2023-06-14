import { View, Pressable, ImageBackground } from 'react-native';
import { styles } from './styles';

const MarkerCustom = ({ onPressMaker }) => {
    return (
        <Pressable onPress={onPressMaker}>
            <View>
                <ImageBackground
                    source={require('../../../assets/images/online.png')}
                    style={styles.image}
                />
            </View>
        </Pressable>
    )
}

export default MarkerCustom;