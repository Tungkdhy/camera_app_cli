import Home from "../screens/Home/Home";
import Wellcome from "../screens/Login/Wellcome";
import Forgot from "../screens/ChangePassWord/ChangePassword";
import Login from "../screens/Login/Login";
import Map from "../screens/Map/Map";

export const screen = [
    {
        name: "Home",
        component: Home,
        layout: true
    },
    {
        name: "Map",
        component: Map,
        layout: true
    },
    {
        name: "Wellcom",
        component: Wellcome,
        layout: false
    },
    {
        name: "Login",
        component: Login,
        layout: false
    },
    {
        name: "Forgot",
        component: Forgot,
        layout: false
    },
]