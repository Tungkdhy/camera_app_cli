import React from 'react';
import {Svg,Circle, Rect} from 'react-native-svg';
const RadioCheck = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect x="4" y="4" width="16" height="16" rx="8" fill="#0040FF" />
      <Circle cx="12" cy="12" r="3" fill="white" />
    </Svg>
  );
};

export default RadioCheck;
