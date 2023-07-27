import React from 'react';
import {
    Svg,
    Rect,
    G,
    Path,
    ClipPath,
    Defs,
    LinearGradient,
    Stop,
} from 'react-native-svg';

const ErrorIcon = () => {
    return (
        <Svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="56" height="56" rx="28" fill="#F25B60" fillOpacity="0.1" />
            <Rect x="8" y="8" width="40" height="40" rx="20" fill="#FF3300" />
            <Path d="M35.5099 21.85L29.5699 18.42C28.5999 17.86 27.3999 17.86 26.4199 18.42L20.4899 21.85C19.5199 22.41 18.9199 23.45 18.9199 24.58V31.42C18.9199 32.54 19.5199 33.58 20.4899 34.15L26.4299 37.58C27.3999 38.14 28.5999 38.14 29.5799 37.58L35.5199 34.15C36.4899 33.59 37.0899 32.55 37.0899 31.42V24.58C37.0799 23.45 36.4799 22.42 35.5099 21.85ZM27.2499 23.75C27.2499 23.34 27.5899 23 27.9999 23C28.4099 23 28.7499 23.34 28.7499 23.75V29C28.7499 29.41 28.4099 29.75 27.9999 29.75C27.5899 29.75 27.2499 29.41 27.2499 29V23.75ZM28.9199 32.63C28.8699 32.75 28.7999 32.86 28.7099 32.96C28.5199 33.15 28.2699 33.25 27.9999 33.25C27.8699 33.25 27.7399 33.22 27.6199 33.17C27.4899 33.12 27.3899 33.05 27.2899 32.96C27.1999 32.86 27.1299 32.75 27.0699 32.63C27.0199 32.51 26.9999 32.38 26.9999 32.25C26.9999 31.99 27.0999 31.73 27.2899 31.54C27.3899 31.45 27.4899 31.38 27.6199 31.33C27.9899 31.17 28.4299 31.26 28.7099 31.54C28.7999 31.64 28.8699 31.74 28.9199 31.87C28.9699 31.99 28.9999 32.12 28.9999 32.25C28.9999 32.38 28.9699 32.51 28.9199 32.63Z" fill="white" />
        </Svg>
    );
};

export default ErrorIcon;
