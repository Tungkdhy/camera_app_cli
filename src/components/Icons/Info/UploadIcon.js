import React from 'react';
import {Svg, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

const UploadIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_4599_6600)">
        <Path d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M7 9L12 4L17 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M12 4V16" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </G>
        <Defs>
        <ClipPath id="clip0_4599_6600">
        <Rect width="24" height="24" fill="white"/>
        </ClipPath>
        </Defs>
        </Svg>
        
    );
};

export default UploadIcon;