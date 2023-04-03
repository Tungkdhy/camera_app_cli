import React from "react";
import {Svg,G,Path,Defs,ClipPath,Rect} from "react-native-svg";
const ShowIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_4579_6802)">
        <Path d="M9 17L15 12L9 7L9 17Z" fill="black" fillOpacity="0.4" />
      </G>
      <Defs>
        <ClipPath id="clip0_4579_6802">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 24) rotate(-90)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ShowIcon;
