import React from "react";
import { View } from "react-native";
import Header from "../components/Header/Header";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <View>
      <Header />
      <View>{children}</View>
      <Navigation />
    </View>
  );
};

export default Layout;
