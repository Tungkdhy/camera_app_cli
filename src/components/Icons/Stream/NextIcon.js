import React from "react";
import { Svg, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const NextIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_4117_34264)">
        <Path
          d="M9 18L15 12L9 6"
          stroke="black"
          strokeOpacity="0.7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4117_34264">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(24 24) rotate(-180)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default NextIcon;
