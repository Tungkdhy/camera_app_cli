import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Back } from '../../components/Icons/Index';
import axiosClient from '../../services/axiosClient';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setCountNotification } from '../../redux/actions/notification';
import { formatDate, formatDateNoSpace, formatTime } from '../../utils';

function Notification({ route, navigation }) {
  const [listNotificationSystem, setListNotificationSystem] = useState([]);
  const [listNotificationSmart, setListNotificationSmart] = useState([]);
  const [reGetData, setReGetData] = useState(false);
  const [smartReport, setSmartReport] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route?.params && route?.params?.isSmart) {
      setSmartReport(route?.params?.isSmart);
    }
  }, [route]);
  const groupNotification = useCallback(data => {
    const arrayFormatDay = data.map(item => {
      return {
        ...item,
        TIME: formatTime(item.TIME),
        DAY: formatDate(item.TIME),
        KEY: formatDateNoSpace(item.TIME),
      };
    });
    const groupBy = (arr, key) => {
      const initialValue = {};
      return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval];
        return acc;
      }, initialValue);
    };
    const res = groupBy(arrayFormatDay, 'KEY');
    let result = Object.keys(res).map(key => [key, res[key]]);
    const dataFormat = result.map(item => {
      return {
        TIME: item[1][0].DAY,
        data: item[1],
      };
    });
    return dataFormat;
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      setLoading(true);
      const res = await axiosClient.get(
        `/notification/get-list-notification/?page=${page}&size=10&type=${smartReport ? 'AI' : 'STATUS'
        }`,
      );
      const data = res.data;
      dispatch(setCountNotification(res.count_not_seen));
      const dataSmartReport = res.data;
      const dataSystemReport = res.data;
      if (res.data.length > 0) {
        if (dataSystemReport.length > 0) {
          const formatData = groupNotification(dataSystemReport);
          if (page > 1) {
            listNotificationSmart.forEach(notification => {
              formatData.forEach(item => {
                if (item.TIME === notification.TIME) {
                  item.data = notification.data.concat(item.data);
                }
              });
            });
            setListNotificationSystem(formatData);
          } else {
            setListNotificationSystem(formatData);
          }
        }
        if (dataSmartReport.length > 0) {
          const formatData = groupNotification(dataSmartReport);
          if (page > 1) {
            listNotificationSmart.forEach(notification => {
              formatData.forEach(item => {
                if (item.TIME === notification.TIME) {
                  item.data = notification.data.concat(item.data);
                }
              });
            });
            setListNotificationSmart(formatData);
          } else {
            setListNotificationSmart(formatData);
          }
        }
      }
      setLoading(false);
    };
    getNotification();
  }, [reGetData, page, smartReport, groupNotification]);

  const seenNotification = async codeItem => {
    const res = await axiosClient.put(
      `notification/put-change-notification-seen/?notification_code=${codeItem}`,
    );
    setReGetData(!reGetData);
    return res;
  };

  const handleCheckNotification = (code, notification) => {
    seenNotification(code);
    if (smartReport) {
      navigation.navigate('Report', {
        camera: {
          CODE: notification.CAMERA_CODE,
          NAME_CAM: notification.NAME_CAM,
        },
      });
    }
  };

  const handleGetMoreNotification = e => {
    setPage(page + 1);
  };
  const navigatePlayBackCamera = notification => { };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Back />
        </Pressable>
        <Text style={styles.text}>Thông báo</Text>
      </View>
      <View style={styles.control}>
        <Pressable
          style={
            !smartReport
              ? { ...styles.button, ...styles.button_active }
              : { ...styles.button }
          }
          onPress={() => {
            setListNotificationSmart([]);
            setSmartReport(false);
            setPage(1);
          }}>
          <Text style={!smartReport ? { color: '#0040FF' } : {}}>
            Thông báo hệ thống
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setListNotificationSystem([]);
            setSmartReport(true);
            setPage(1);
          }}
          style={smartReport ? { color: '#0040FF' } : {s}}>
          <Text
            style={
              smartReport
                ? { ...styles.sub_button, ...styles.sub_button_active }
                : { ...styles.button }
            }>
            Cảnh báo thông minh
          </Text>
        </Pressable>
      </View>
      <View style={styles.content}>
        <ScrollView onScrollEndDrag={handleGetMoreNotification}>
          {smartReport
            ? listNotificationSmart.map((notification, index) => {
              return (
                <Pressable
                  onPress={() => navigatePlayBackCamera(notification)}
                  key={index}>
                  <View style={styles.date_block}>
                    <Text style={styles.time_block}>{notification.TIME}</Text>
                    <View style={styles.list_item}>
                      {notification.data.map(item => {
                        if (item.SEEN === 0) {
                          return (
                            <Pressable
                              key={item.CODE}
                              onPress={() =>
                                handleCheckNotification(item.CODE, item)
                              }>
                              <View style={{ ...styles.item, ...styles.new }}>
                                <Text style={styles.time}>{item.TIME}</Text>
                                <Text style={styles.name}>{item.NAME}</Text>
                                <Text style={styles.title}>
                                  {item.DETAIL}
                                </Text>
                                <View style={styles.tick} />
                              </View>
                            </Pressable>
                          );
                        }
                      })}
                      {notification.data.map(item => {
                        if (item.SEEN === 1) {
                          return (
                            <Pressable
                              key={item.CODE}
                              onPress={() =>
                                handleCheckNotification(item.CODE, item)
                              }>
                              <View style={{ ...styles.item }}>
                                <Text style={styles.time}>{item.TIME}</Text>
                                <Text style={styles.name}>{item.NAME}</Text>
                                <Text style={styles.title}>
                                  {item.DETAIL}
                                </Text>
                              </View>
                            </Pressable>
                          );
                        }
                      })}
                    </View>
                  </View>
                </Pressable>
              );
            })
            : listNotificationSystem.map((notification, index) => {
              return (
                <View style={styles.date_block} key={index}>
                  <Text style={styles.time_block}>{notification.TIME}</Text>
                  <View style={styles.list_item}>
                    {notification.data.map(item => {
                      if (item.SEEN === 0) {
                        return (
                          <TouchableOpacity
                            key={item.CODE}
                            onPress={() =>
                              handleCheckNotification(item.CODE)
                            }>
                            <View style={{ ...styles.item, ...styles.new }}>
                              <Text style={styles.time}>{item.TIME}</Text>
                              <Text style={styles.name}>{item.NAME}</Text>
                              <Text style={styles.title}>{item.DETAIL}</Text>
                              <View style={styles.tick} />
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    })}
                    {notification.data.map(item => {
                      if (item.SEEN === 1) {
                        return (
                          <TouchableOpacity
                            key={item.CODE}
                            onPress={() =>
                              handleCheckNotification(item.CODE)
                            }>
                            <View style={{ ...styles.item }}>
                              <Text style={styles.time}>{item.TIME}</Text>
                              <Text style={styles.name}>{item.NAME}</Text>
                              <Text style={styles.title}>{item.DETAIL}</Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    })}
                  </View>
                </View>
              );
            })}
          {loading && (
            <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default Notification;
