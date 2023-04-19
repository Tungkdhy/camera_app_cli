import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import axiosClient from "../../../services/axiosClient";
import { styles } from './styles';
import { Image } from "react-native-svg";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
const Item = ({ title, active }) => (
    <View style={styles.item}>
        <Text style={active ? { ...styles.title, ...styles.active } : { ...styles.title }}>{title}</Text>
    </View>
);

const dayFill = [
    {
        value: 7,
        label: '7N',
    },
    {
        value: 30,
        label: '30N',
    },
    {
        value: 90,
        label: '90N',
    }
]

function LineChartService({ type }) {
    const [stateValue, setStateValue] = useState(dayFill[0].label)
    const [codeCamera, setCodeCamera] = useState(null)
    const [listCamera, setListCamera] = useState()
    const [dataValue, setDataValue] = useState([0])
    const [dataValueDetectHuman, setDataValueDetectHuman] = useState([0])
    const [dataValueDetectFace, setDataValueDetectFace] = useState([0])
    const [listLabel, setListLabel] = useState(['0', dayFill[0].label])
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        color: () => `rgba(0, 0, 0, 1)`,
        strokeWidth: 2,
        barPercentage: 1,
        useShadowColorFromDataset: true,
        fillShadowGradientFrom: `#141ED2`,
        fillShadowGradientFromOpacity: 0.16,
        fillShadowGradientTo: `#141ED2`,
        fillShadowGradientToOpacity: 0
    };
    let dataChart = type === 'Phát hiện chuyển động' ? dataValue :
        type === 'Nhận diện người' ? dataValueDetectHuman :
            type === 'Nhận diện khuôn mặt' ? dataValueDetectFace : [0]
    const data = {
        labels: listLabel,
        datasets: [
            {
                data: dataChart,
                color: () => `#141ED2`,
                strokeWidth: 2,
            }
        ],
    };


    const getListCamera = async () => {
        try {
            const res = await axiosClient.get('cameraManagement/get-list-camera/')
            setListCamera(res)
        } catch (error) {
            console.log(error);
        }
    }

    const checkValue = (data, array) => {
        let indexData = 0;
        const arrayToSplice = [...array]
        arrayToSplice.forEach((item, index) => {
            if (item.value === data) {
                indexData = index;
            }
        })
        const fill = arrayToSplice.splice(0, indexData + 1)
        const label = fill.map((item) => {
            return item.label
        })
        return label
    }

    const getDataDetectAction = async (duration, code) => {
        try {
            const res = await axiosClient.get('statEventAI/get-list-stat-event-ai/', {
                params: {
                    duration: duration,
                    camera_code: code
                }
            })
            const data = res.map(item => (item.COUNT))
            setDataValue(prev => [...prev, ...data])
            await axiosClient.post('statEventAI/post-add-stat-event-ai/')
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const getDataDetectHuman = async (duration, code) => {

    }
    const getDataDetectFace = async (duration, code) => {

    }

    const handleClickChangeValue = (label, value) => {
        setStateValue(label)
        const newLabel = checkValue(value, dayFill)
        setListLabel(['0', ...newLabel])
        handleGetDateAct(value, type, codeCamera)
    }

    const handleGetDateAct = (date, type, code) => {
        const newDate = `${date} DAYS`;
        switch (type) {
            case 'Phát hiện chuyển động':
                getDataDetectAction(newDate, code)
                break;
            case 'Nhận diện người':
                getDataDetectHuman(newDate, code)
                break;
            case 'Nhận diện khuôn mặt':
                getDataDetectFace(newDate, code)
                break;
            default:
                break;
        }
    }

    const handleGetCameraAct = (code, type) => {
        switch (type) {
            case 'Phát hiện chuyển động':
                setCodeCamera(code)
                getDataDetectAction(null, code)
                break;
            case 'Nhận diện người':
                setCodeCamera(code)
                // getDataDetectAction(null, code)
                break;
            case 'Nhận diện khuôn mặt':
                setCodeCamera(code)
                // getDataDetectAction(null, code)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getListCamera();
        const initTime = '7 DAYS'
        getDataDetectAction(initTime, null)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header_fill}>
                <Text style={styles.header}>{type}</Text>
                <View style={styles.fill}>
                    {dayFill.map(item => {
                        return (
                            <Pressable key={item.value} onPress={e => handleClickChangeValue(item.label, item.value)}>
                                <Item active={stateValue === item.label} title={item.label} />
                            </Pressable>
                        )
                    })}
                </View>
            </View>
            <View style={styles.choose_camera}>
                <Picker
                    selectedValue={codeCamera}
                    style={{ marginTop: -5 }}
                    onValueChange={(itemValue) =>
                        handleGetCameraAct(itemValue, type)
                    }>
                    <Picker.Item label={'Tất cả'} value={'all'} />
                    {listCamera && listCamera.data.map((camera) => {
                        return (
                            <Picker.Item key={camera.CAMERA.CODE} label={camera.CAMERA.NAME_CAM} value={camera.CAMERA.CODE} />
                        )
                    })}
                </Picker>
            </View>
            {/* content */}
            <View style={styles.contentChart}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    style={{ marginRight: 40 }}
                />
            </View>
        </View>
    )
}

export default LineChartService;