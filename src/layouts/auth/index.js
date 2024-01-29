
import React from "react";
import FormSpace from './formSpace.js';
import { Outlet } from "react-router-dom";

const AuthLayout = () => {

    return (
        <>
            <FormSpace >
            <Outlet/>
            </FormSpace>
        </>
    );

};

export default AuthLayout;
