import { View, Text, FlatList, Pressable } from 'react-native';
import { styles } from './styles';
import { cameraManagement } from '../../../services/api/cameraManagementApi';
import { useCallback, useEffect, useState } from 'react';
import streamingClient from '../../../services/axiosStreaming';
import CameraItem from '../../../components/Live/CameraItem';
import {
  DownIconSolid,
  OnlineIcon,
  UpIconSolid,
} from '../../../components/Icons/Index';

function ListCamera({ navigation }) {
  const [listCamera, setListCamera] = useState([]);
  const [listPath, setListPath] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const getListCamera = useCallback(async () => {
    try {
      let param = {
        camera_status: 'On',
        page: page,
        size: 10,
      };
      const res = await cameraManagement.getListCamera(param);
      setCount(res.count);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  const handleChoseCam = (it, title) => {
    navigation.navigate('Live', {
      wareHouse: 'Xem camera',
      active: it,
      cam: listCamera,
    });
  };

  const getListPath = useCallback(
    async data => {
      try {
        let listCode = data?.map(item => {
          return {
            camera_code: item?.CAMERA?.CODE,
          };
        });
        const res = await streamingClient.post(
          '/streamManagement/post-list-path-streaming/',
          {
            list_camera: {
              data: listCode,
            },
          },
        );
        if (listCamera.length < 50) {
          setListPath(prev => [...prev, ...res.stream]);
        } else {
          setListPath(res.stream);
        }
      } catch (error) {
        console.log(error);
        setRefresh(!refresh);
      }
    },
    [refresh],
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const listCam = await getListCamera();
        let listData = listCam?.map(item => {
          return item.CAMERA;
        });
        if (listCamera.length < 50) {
          setListCamera(listData);
        } else {
          setListCamera(prev => [...prev, ...listData]);
        }
        getListPath(listCam);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [getListCamera, getListPath, refresh]);

  const showMore = () => {
    if (listCamera.length < 50) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };
  const onViewMore = () => {
    setPage(1);
    navigation.navigate('Stream');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Camera</Text>
        <View style={styles.number}>
          <Text style={styles.count}>{count} camera hoạt động</Text>
          <View style={styles.icon}>
            <OnlineIcon />
          </View>
        </View>
      </View>
      <View>
        <View>
          <FlatList
            onEndReached={() => {
              return 0;
            }}
            onEndReachedThreshold={0}
            data={listPath}
            renderItem={({ item, index }) => (
              <CameraItem
                key={index}
                id={item.code}
                setCamId={(it, title) => handleChoseCam(it, title)}
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
          <View style={styles.buttonMore}>
            <Pressable onPress={showMore} style={{ height: 12, width: 12 }}>
              {listPath.length < 50 ? <DownIconSolid /> : <UpIconSolid />}
            </Pressable>
            {listPath.length >= 50 && (
              <Pressable onPress={onViewMore}>
                <Text style={{ color: '#0040FF' }}>Đến xem trực tiếp</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default ListCamera;
