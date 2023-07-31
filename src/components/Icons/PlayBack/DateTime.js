import React from 'react';
import { Svg, Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
const DateTime = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_5121_8130)">
        <Path d="M18 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16 3V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8 3V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M4 11H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10 16H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_5121_8130">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>

  );
};

export default DateTime;
