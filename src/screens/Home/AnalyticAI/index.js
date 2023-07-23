import { useCallback, useEffect, useState } from 'react';
import { services } from '../../../services/api/services';
import { Alert } from 'react-native';
import LineChartService from '../LineChart';
import { eventAI } from '../../../services/api/eventAI';

function AnalyticAI({ navigation }) {
    const [listService, setListService] = useState([]);
    const [listInfo, setListInfo] = useState();
    const getListService = useCallback(async () => {
        try {
            const res = await services.getListServices();
            setListService(res);
        } catch (error) {
            if (error?.response?.status === 401) {
                Alert.alert('Phiên đăng nhập đã hết hạn vui lòng đăng nhâp lại!');
                navigation.navigate('Login');
            } else if (error?.response?.status === 403) {
                Alert.alert('Bạn không có quyền xem thống kê dịch vụ AI');
            } else {
                Alert.alert('Tải giữ liệu thống kê AI không thành công');
            }
        }
    }, []);

    const getListInfo = useCallback(async () => {
        try {
            const res = await eventAI.getInfoStatEvent();
            console.log(res);
            setListInfo(res);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const getData = async () => {
            await getListService();
            await getListInfo();
        };
        getData();
    }, [getListService, getListInfo]);
    return (
        <>
            {listService &&
                listService.length > 0 &&
                listService?.map(service => {
                    return (
                        <LineChartService
                            key={service?.CODE}
                            type={service?.SUBJECT_NAME}
                            codeService={service?.CODE}
                            listInfo={listInfo}
                        />
                    );
                })}
        </>
    );
}

export default AnalyticAI;
