
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header/Header';

export default function Map() {
  return (
    <>
        <Header title={"Bản đồ"}/>
        <View style={styles.container}>
        <Text>Open up Map.js to start working on your Map! hello tran tung</Text>
        <StatusBar style={styles.auto} />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  auto:{
    
  }
});
