
import { View } from 'react-native';
import Header from '../../components/Header/Header';
import Filter from '../../components/Filter/Filter';

export default function Map() {
  return (
    <>
      <Header title={"Bản đồ"} />
      <Filter />
      <View style={styles.container}>
        <View style={styles.box_info}>
          This is map box
        </View>
      </View>
    </>
  );
}

