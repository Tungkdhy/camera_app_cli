import { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import axiosClient from '../../../services/axiosClient';
import { styles } from './styles';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { eventAI } from '../../../services/api/eventAI';
import RNPickerSelect from 'react-native-picker-select';

import { cameraManagement } from '../../../services/api/cameraManagementApi';
const Item = ({ title, active }) => (
    <View style={styles.item}>
        <Text
            style={active ? { ...styles.title, ...styles.active } : { ...styles.title }}>
            {title}
        </Text>
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
    },
];

function LineChartService({ type, codeService }) {
    const [stateValue, setStateValue] = useState({
        label: dayFill[0].label,
        value: dayFill[0].value,
    });
    const [codeCamera, setCodeCamera] = useState(null);
    const [listCamera, setListCamera] = useState();
    const [dataValue, setDataValue] = useState([0]);
    const [listData, setListData] = useState([]);
    const [listLabel, setListLabel] = useState(['0', dayFill[0].label]);
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0,
        color: () => 'rgba(0, 0, 0, 1)',
        strokeWidth: 2,
        barPercentage: 1,
        useShadowColorFromDataset: true,
        fillShadowGradientFrom: '#141ED2',
        fillShadowGradientFromOpacity: 0.16,
        fillShadowGradientTo: '#141ED2',
        fillShadowGradientToOpacity: 0,
    };

    const data = {
        labels: listLabel,
        datasets: [
            {
                data: dataValue,
                color: () => '#141ED2',
                strokeWidth: 2,
            },
        ],
    };

    const getListCamera = useCallback(async () => {
        try {
            const params = {
                ai_service_code: codeService,
                ai_already: 1,
            };
            const res = await cameraManagement.getListCamera(params);
            return res;
        } catch (error) {
            return 0;
        }
    }, []);

    const checkValue = (data, array) => {
        let indexData = 0;
        const arrayToSplice = [...array];
        arrayToSplice.forEach((item, index) => {
            if (item.value === data) {
                indexData = index;
            }
        });
        const fill = arrayToSplice.splice(0, indexData + 1);
        const label = fill.map(item => {
            return item.label;
        });
        return label;
    };

    const getDataDetectAction = useCallback(async service => {
        try {
            const params = {
                ai_service_code: service,
            };
            const res = await eventAI.getStatEvent(params);
            if (res && res?.length > 0) {
                await eventAI.postStatEvent();
                return res;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }, []);

    const handleGetCameraAct = value => {
        setCodeCamera(value);
    };

    const handleClickChangeValue = (label, value) => {
        setStateValue({ label: label, value: value });
        const newLabel = checkValue(value, dayFill);
        setListLabel(['0', ...newLabel]);
    };

    const getCameraData = useCallback((codeCamera, listData) => {
        const data = [...listData];
        const dataCamera = data?.filter(item => item.CAMERA_CODE === codeCamera);
        return dataCamera;
    }, []);

    const getDataFill = useCallback((day, data) => {
        let data7Days = data?.filter(item => item.DURATION === '7 DAYS');
        let data30Days = data?.filter(item => item.DURATION === '30 DAYS');
        let data90Days = data?.filter(item => item.DURATION === '90 DAYS');
        let dataStatistic = [];
        if (day === 7) {
            dataStatistic.push(data7Days[0]);
        } else if (day === 30) {
            dataStatistic.push(data7Days[0]);
            dataStatistic.push(data30Days[0]);
        } else if (day === 90) {
            dataStatistic.push(data7Days[0]);
            dataStatistic.push(data30Days[0]);
            dataStatistic.push(data90Days[0]);
        }
        const values = dataStatistic.map(item => {
            if (item && item?.COUNT) {
                return item.COUNT;
            } else {
                return 0;
            }
        });
        return values;
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const valueDetect = await getDataDetectAction(codeService);
                const valueCamera = await getListCamera();
                setListData(valueDetect);
                setListCamera(valueCamera);
                setCodeCamera(valueCamera?.data[0]?.CAMERA?.CODE);
            } catch (error) {
                Alert.alert('Không có dữ liệu');
            }
        };
        getData();
    }, [getDataDetectAction, getListCamera]);
    useEffect(() => {
        if (codeCamera && listData?.length > 0) {
            const data = getCameraData(codeCamera, listData);
            let day = stateValue.value;
            const analytic = getDataFill(day, data);
            setDataValue([0, ...analytic]);
        }
    }, [codeCamera, listData, getCameraData, stateValue, getDataFill])
    return (
        <View style={styles.container}>
            <View style={styles.header_fill}>
                <Text style={styles.header}>{type}</Text>
                <View style={styles.fill}>
                    {dayFill.map(item => {
                        return (
                            <Pressable
                                key={item.value}
                                style={styles.day}
                                onPress={e => handleClickChangeValue(item.label, item.value)}>
                                <Item
                                    active={stateValue.label === item.label}
                                    title={item.label}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </View>
            {/* <View style={styles.choose_camera}>
                {listCamera && listCamera?.data?.length > 0 && (
                    <Picker
                        selectedValue={codeCamera}
                        style={{ marginTop: -5 }}
                        onValueChange={itemValue => handleGetCameraAct(itemValue)}>
                        {listCamera &&
                            listCamera.data.map(camera => {
                                return (
                                    <Picker.Item
                                        key={camera?.CAMERA?.CODE}
                                        label={camera?.CAMERA?.NAME_CAM}
                                        value={camera?.CAMERA?.CODE}
                                    />
                                );
                            })}
                    </Picker>
                )}
            </View> */}
            <View style={styles.choose_camera}>
                <RNPickerSelect
                    placeholder={{ label: 'Tất cả', value: null }}
                    doneText="Lựa chọn"
                    style={styles}
                    onValueChange={value => handleGetCameraAct(value)}
                    items={
                        listCamera
                            ? listCamera?.data.map((camera, index) => {
                                return {
                                    label: camera?.CAMERA?.NAME_CAM,
                                    value: camera?.CAMERA?.CODE,
                                };
                            })
                            : []
                    }
                />
            </View>
            <View style={styles.contentChart}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    style={{ marginRight: 40 }}
                    withDots={false}
                />
            </View>
        </View>
    );
}

export default LineChartService;
