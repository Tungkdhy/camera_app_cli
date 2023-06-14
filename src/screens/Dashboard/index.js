import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Header from "../../components/Header/Header";
import NewNotification from "./NewNotification";
import ListCamera from "./ListCamera";
import ListReport from "./ListReport";

function Dashboard({ navigation }) {
    return (
        <View>
            <Header title={'Trang chủ'} navigation={navigation} />
            <SafeAreaView>
                <View style={{marginBottom: 48}}>
                    <ScrollView>
                        <NewNotification navigation={navigation} />
                        <ListCamera navigation={navigation} />
                        {/* <ListReport/> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Dashboard;