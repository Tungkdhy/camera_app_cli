import React from "react";
import { Svg,Circle } from "react-native-svg";
const Status = ({color ="#0040FF"}) => {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle opacity="0.15" cx="8" cy="8" r="8" fill={color} />
      <Circle cx="8" cy="8" r="4" fill={color} />
    </Svg>
  );
};

export default Status;
