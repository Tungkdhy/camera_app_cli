import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
function HeaderLogin() {
    const [name, setName] = useState('');

    useEffect(() => {
        const getUserName = async () => {
            let name = await AsyncStorage.getItem('name');
            setName(name);
        };
        getUserName();
    }, []);
    return (
        <>
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 32,
                }}>
                <Image source={require('../../assets/images/logo_small.png')} />
                <Text style={styles.text_header_small}>Hệ thống Camera AI</Text>
            </View>
            <View
                style={{
                    marginBottom: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../assets/images/Avatar2.png')}
                    style={{ marginBottom: 24 }}
                />
                <Text style={{ textAlign: 'center', ...styles.welcome }}>Xin chào</Text>
                <Text style={{ textAlign: 'center', ...styles.customer_name }}>
                    {name ? name : ''}
                </Text>
            </View>
        </>
    );
}

export default HeaderLogin;
