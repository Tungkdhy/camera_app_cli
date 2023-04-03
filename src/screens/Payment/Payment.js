
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";

export default function Payment() {
  return (
    <>
      <Header title={"Cảnh báo thông minh"}/>
      <View style={styles.container}>
        <Text>
          Open up Payment.js to start working on your Payment! hello tran tung
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  auto: {},
});
