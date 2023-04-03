import React from 'react';
import {Svg, Rect, G, Path, Defs, ClipPath} from 'react-native-svg';
const PlusIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clip-path="url(#clip0_4136_39640)">
    <Path d="M10 4.16699V15.8337" stroke="#0040FF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M4.16675 10H15.8334" stroke="#0040FF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
    </G>
    <Defs>
    <ClipPath id="clip0_4136_39640">
    <Rect width="20" height="20" fill="white"/>
    </ClipPath>
    </Defs>
    </Svg>
    
  );
};

export default PlusIcon;
