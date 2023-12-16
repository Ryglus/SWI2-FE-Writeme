
import React from "react";
import FormSpace from './formSpace.js';
import { Outlet } from "react-router-dom";
import Auth from "../../components/auth/Auth.js";

const AuthLayout = () => {

    return (
        <>
            <Auth />
            <FormSpace >
            <Outlet/>
            </FormSpace>
            
        </>
    );

};

export default AuthLayout;
