import React from "react";
import { Svg, Rect, G, Path, ClipPath, Defs, Mask } from "react-native-svg";

const CompanyIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Mask id="mask0_4974_18709" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <Rect width="24" height="24" fill="#D9D9D9" />
            </Mask>
            <G mask="url(#mask0_4974_18709)">
                <Path d="M2.36523 20.5771V3.07715H11.8652V7.07715H21.6344V20.5771H2.36523ZM3.86518 19.0772H10.3652V16.5771H3.86518V19.0772ZM3.86518 15.0771H10.3652V12.5771H3.86518V15.0771ZM3.86518 11.0771H10.3652V8.57712H3.86518V11.0771ZM3.86518 7.07715H10.3652V4.57712H3.86518V7.07715ZM11.8652 19.0772H20.1344V8.57712H11.8652V19.0772ZM14.0575 12.5771V11.0771H17.7498V12.5771H14.0575ZM14.0575 16.5771V15.0771H17.7498V16.5771H14.0575Z" fill="#0040FF" />
            </G>
        </Svg>
    );
};

export default CompanyIcon;
