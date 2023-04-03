import React from 'react';
import {Svg, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

const Logout = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_4136_52281)">
        <Path d="M10 16L10 18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20L19 20C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18L21 6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4L12 4C11.4696 4 10.9609 4.21071 10.5858 4.58579C10.2107 4.96086 10 5.46957 10 6L10 8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M17 12L3 12M3 12L6 15M3 12L6 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </G>
        <Defs>
        <ClipPath id="clip0_4136_52281">
        <Rect width="24" height="24" fill="white" transform="translate(24 24) rotate(-180)"/>
        </ClipPath>
        </Defs>
        </Svg>
        
    );
};

export default Logout;