import { useEffect, useState } from 'react';
import { Pressable, View, Text, ScrollView } from 'react-native';
import { Back } from '../../components/Icons/Index';
import axiosClient from '../../services/axiosClient';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setCountNotification } from '../../redux/actions/notification';

function Notification({ navigation }) {
  const [listNotificationSystem, setListNotificationSystem] = useState([]);
  const [listNotificationSmart, setListNotificationSmart] = useState([]);
  const [reGetData, setReGetData] = useState(false);
  const [smartReport, setSmartReport] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const formatDateNoSpace = date => {
    const dateA = new Date(date);
    const year = dateA.getFullYear();
    const month = dateA.getMonth() + 1;
    const day = dateA.getDate();
    return (
      (day <= 9 ? '0' + day : day) + (month <= 9 ? '0' + month : month) + year
    );
  };

  const formatTime = date => {
    const dateA = new Date(date);
    const hour = dateA.getHours();
    const minute = dateA.getMinutes();
    const seconds = dateA.getSeconds();
    const dateToTime =
      (hour <= 9 ? '0' + hour : hour) +
      ':' +
      (minute <= 9 ? '0' + minute : minute) +
      ':' +
      (seconds <= 9 ? '0' + seconds : seconds);
    return dateToTime;
  };

  const formatDate = date => {
    const dateA = new Date(date);
    const year = dateA.getFullYear();
    const month = dateA.getMonth() + 1;
    const day = dateA.getDate();
    return (
      (day <= 9 ? '0' + day : day) +
      '/' +
      (month <= 9 ? '0' + month : month) +
      '/' +
      year
    );
  };

  const groupNotification = data => {
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
  };

  useEffect(() => {
    const getNotification = async () => {
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
    };
    getNotification();
  }, [reGetData, page, smartReport]);

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

  const handleGetMoreNotification = () => {
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
          onPress={() => setSmartReport(false)}>
          <Text
            style={
              !smartReport
                ? { ...styles.sub_button, ...styles.sub_button_active }
                : { ...styles.button }
            }>
            Thông báo hệ thống
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSmartReport(true)}
          style={
            smartReport
              ? { ...styles.button, ...styles.button_active }
              : { ...styles.button }
          }>
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
          {smartReport ? (
            <>
              {listNotificationSmart.length > 0 &&
                listNotificationSmart.map((notification, index) => {
                  console.log(notification);
                  return (
                    <Pressable
                      onPress={() => navigatePlayBackCamera(notification)}
                      key={index}>
                      <View style={styles.date_block}>
                        <Text style={styles.time_block}>
                          {notification.TIME}
                        </Text>
                        <View style={styles.list_item}>
                          {notification.data.map(item => {
                            return (
                              <Pressable
                                key={item.CODE}
                                onPress={() =>
                                  handleCheckNotification(item.CODE, item)
                                }>
                                <View
                                  style={
                                    item.SEEN === 0
                                      ? { ...styles.item, ...styles.new }
                                      : { ...styles.item }
                                  }>
                                  <Text style={styles.time}>{item.TIME}</Text>
                                  <Text style={styles.name}>{item.NAME}</Text>
                                  <Text style={styles.title}>
                                    {item.DETAIL}
                                  </Text>
                                  {item.SEEN === 0 && (
                                    <View style={styles.tick} />
                                  )}
                                </View>
                              </Pressable>
                            );
                          })}
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
            </>
          ) : (
            <>
              {listNotificationSystem.length > 0 &&
                listNotificationSystem.map((notification, index) => {
                  return (
                    <View style={styles.date_block} key={index}>
                      <Text style={styles.time_block}>{notification.TIME}</Text>
                      <View style={styles.list_item}>
                        {notification.data.map(item => {
                          return (
                            <Pressable
                              key={item.CODE}
                              onPress={() =>
                                handleCheckNotification(item.CODE)
                              }>
                              <View
                                style={
                                  item.SEEN === 0
                                    ? { ...styles.item, ...styles.new }
                                    : { ...styles.item }
                                }>
                                <Text style={styles.time}>{item.TIME}</Text>
                                <Text style={styles.name}>{item.NAME}</Text>
                                <Text style={styles.title}>{item.DETAIL}</Text>
                                {item.SEEN === 0 && (
                                  <View style={styles.tick} />
                                )}
                              </View>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default Notification;
