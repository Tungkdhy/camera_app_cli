import React, { useState } from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { AddressIcon, DownIcon } from "../Icons/Index";
import { setStatus } from "../../redux/actions/cameraAction";
import { useDispatch } from "react-redux";
import { styles } from "./styles";
//Filter location
const Filter = ({ onClick, address,filter }) => {
  const dispatch = useDispatch()
  //Change status camera
  const toggleSwitch = () =>dispatch(setStatus(filter ==="On"?"Off":"On"));
  return (
    <View style={styles.filter}>
      <Pressable onPress={onClick}>
        <View style={styles.location}>
          <View style={{ paddingTop: 4 }}>
            <AddressIcon />
          </View>

          <View style={styles.area}>
            <Text style={{ color: "rgba(0, 0, 0, 0.4)" }}>Khu vực: </Text>
            <Text>Đống Đa,Hà Nội</Text>
            <DownIcon />
          </View>
        </View>
      </Pressable>
      <View style={styles.status}>
        <Text style={{}}>Hoạt động</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#0040FF" }}
          thumbColor={filter === "On" ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={filter === "On"?true:false}
          style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
        />
      </View>
    </View>
  );
};

export default Filter;
