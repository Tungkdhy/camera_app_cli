import React from "react";
import { G, Svg, Path, Mask, Rect } from "react-native-svg";

const ChartIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Mask id="mask0_4958_8447" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_4958_8447)">
        <Path d="M8.40394 8.39382L7.49434 6.40924L5.50974 5.49964L7.49434 4.59005L8.40394 2.60547L9.31354 4.59005L11.2981 5.49964L9.31354 6.40924L8.40394 8.39382ZM14.9039 11.3938L14.1458 9.75779L12.5097 8.99965L14.1458 8.2415L14.9039 6.60547L15.6621 8.2415L17.2981 8.99965L15.6621 9.75779L14.9039 11.3938ZM3.90394 13.3938L3.14577 11.7578L1.50977 10.9996L3.14577 10.2415L3.90394 8.60547L4.66209 10.2415L6.29812 10.9996L4.66209 11.7578L3.90394 13.3938ZM4.36547 20.1535L3.25012 19.0381L10.4039 11.8843L14.4039 15.8843L21.4462 7.89967L22.5001 8.93427L14.4232 18.1342L10.4039 14.115L4.36547 20.1535Z" fill="#0040FF" fillOpacity="1" />
      </G>
    </Svg>
  );
};

export default ChartIcon;
