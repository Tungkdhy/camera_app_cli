import { View, Text, FlatList } from "react-native"
import { styles } from "./styles";
import { cameraManagement } from "../../../services/api/cameraManagementApi";
import { useCallback, useEffect, useState } from "react";
import streamingClient from "../../../services/axiosStreaming";
import CameraItem from "../../../components/Live/CameraItem";
import { OnlineIcon } from "../../../components/Icons/Index";
function ListCamera({navigation}) {
    const [listCamera, setListCamera] = useState([]);
    const [listPath, setListPath] = useState([]);
    const [count, setCount] = useState(0);

    const getListCamera = useCallback(async () => {
        try {
            let param = {
                camera_status: 'On',
                page: 1,
                size: 10,
            }
            const res = await cameraManagement.getListCamera(param);
            setCount(res.count);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleChoseCam = (it) => {
        console.log(it);
        navigation.navigate('Live', {
            wareHouse: 'name',
            active: it,
            cam: listCamera,
        });
    }

    const getListPath = useCallback(async (data) => {
        try {
            let listCode = data?.map(item => {
                return {
                    camera_code: item?.CAMERA?.CODE
                }
            })
            const res = await streamingClient.post(
                '/streamManagement/post-list-path-streaming/',
                {
                    list_camera: {
                        data: listCode,
                    },
                },
            );
            setListPath(res.stream)
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const listCam = await getListCamera();
                let listData = listCam?.map(item => {
                    return  item.CAMERA
                });
                setListCamera(listData);
                getListPath(listCam);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [getListCamera, getListPath])
    console.log(listCamera);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Camera</Text>
                <View style={styles.number}>
                    <Text style={styles.count}>{count} camera hoạt động</Text>
                    <View style={styles.icon}><OnlineIcon /></View>
                </View>
            </View>
            <View style={styles.content}>
                <View>
                    <FlatList
                        onEndReached={() => {
                            return 0
                        }}
                        onEndReachedThreshold={0}
                        data={listPath}
                        renderItem={({ item, index }) => (
                            <CameraItem
                                key={index}
                                id={item.code}
                                setCamId={handleChoseCam}
                                title={item?.name}
                                path={item?.data[0]?.PATH}
                                type={'livestream'}
                            />
                        )}
                        numColumns={2}
                        style={styles.list}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                        }}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        </View>
    )
}

export default ListCamera;