import React from "react";
import { Svg, Path, Mask, Rect, G } from "react-native-svg";
const YoutubeIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Mask id="mask0_4958_8173" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_4958_8173)">
        <Path d="M3.29785 17.3077V6.69238L11.2593 12L3.29785 17.3077ZM12.7401 17.3077V6.69238L20.7016 12L12.7401 17.3077ZM4.79783 14.5001L8.56323 12L4.79783 9.50001V14.5001ZM14.2401 14.5001L18.0055 12L14.2401 9.50001V14.5001Z" fill="#0040FF" fillOpacity="1" />
      </G>
    </Svg>
  );
};

export default YoutubeIcon;
