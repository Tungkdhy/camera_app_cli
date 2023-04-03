import React from 'react';
import Svg,{ G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const DownIcon = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_4614_6467)">
        <Path d="M7 9L12 15L17 9H7Z" fill="black" />
      </G>
      <Defs>
        <ClipPath id="clip0_4614_6467">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DownIcon;
