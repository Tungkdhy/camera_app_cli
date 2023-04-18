import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axiosClient from "../../../services/axiosClient";
import { styles } from './styles';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const Item = ({ title, color, population }) => (
    <View style={styles.item}>
        <View style={styles.label_legend}>
            <View
                style={{ ...styles.legend_color, backgroundColor: `${color}` }}
            >
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View>
            <Text style={styles.title}>{population}</Text>
        </View>
    </View>
);

let color = [
    '#141ED2',
    '#925FFF',
    '#EC427F',
    '#FFC369',
]

function DonutChart({ title, type }) {
    const [dataChart, setDataChart] = useState()
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0,
        useShadowColorFromDataset: false,
        fillShadowGradient: 'white',
        fillShadowGradientOpacity: 1
    };
    function randomHexColor() {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += Math.floor(Math.random() * 16).toString(16);
        }
        return hexColor;
    }

    const autoCreateNewColor = (dataInfo, dataColor) => {
        let colorNew = [...dataColor];
        for (let i = 0; i < dataInfo.length - dataColor.length; i++) {
            const randomColor = randomHexColor();
            colorNew.push(randomColor);
        }
        return colorNew;
    }

    useEffect(() => {
        const getAndUpDateDataForChart = async () => {
            let arrColor = [...color];
            const getData = await axiosClient.get(`/statPositionCam/get-list-stat-position-cam/?type=${type}`)
            if (type === 'group') {
                if (getData.length > color.length) {
                    arrColor = autoCreateNewColor(getData, color)
                }
                const formatData = getData.map((item, index) => {
                    return ({
                        name: item.GROUP_NAME,
                        population: Number(item.COUNT),
                        color: arrColor[index],
                    })
                })
                setDataChart(formatData);
                const res = await axiosClient.post('/statPositionCam/post-add-stat-position-cam/')
                return res;
            } else if (type === 'warehouse') {
                if (getData.length > color.length) {
                    arrColor = autoCreateNewColor(getData, color)
                }
                const formatData = getData.map((item, index) => {
                    return ({
                        name: item.WAREHOUSE_NAME,
                        population: Number(item.COUNT),
                        color: arrColor[index],
                    })
                })
                setDataChart(formatData);
            }
        }
        getAndUpDateDataForChart()
    }, [type, color])


    return (
        <View style={styles.container}>
            <Text style={styles.header}>{title}</Text>
            {/* content */}
            <View style={{ ...styles.content }}>
                <View style={{ ...styles.chart, backgroundColor: 'white' }}>
                    {dataChart && (
                        <PieChart
                            data={dataChart}
                            width={screenWidth}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={"population"}
                            hasLegend={false}
                            backgroundColor="transparent"
                        />
                    )}
                </View>
                <View style={styles.legend}>
                    <ScrollView style={{ height: 132 }}>
                        {dataChart && dataChart.map((item, index) => {
                            return (
                                <Item key={index} title={item.name} color={item.color} population={item.population} />
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </View >
    )
}

export default DonutChart;