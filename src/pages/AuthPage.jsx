import { useOutlet, useLocation } from "react-router-dom";
import React from "react";
import {Outlet} from "react-router-dom";

import { AnimatePresence, motion } from 'framer-motion';

import UnAuthorizedHeader from "../components/Headers/UnAuthorizedHeader.jsx";

export default function AuthPage() {
    // const { pathname } = useLocation();
    // const element = useOutlet();
    //
    // const isLogin = pathname === "/login";

    return (
        <div className="min-h-screen h-screen flex flex-col overflow-hidden">
            <UnAuthorizedHeader />
            <div className="flex flex-col mt-18 flex-grow items-center justify-center bg-main-white overflow-hidden">
                <Outlet />
                {/*<AnimatePresence mode="wait">*/}
                {/*    <motion.div*/}
                {/*        key={pathname}*/}
                {/*        initial={{ opacity: 0, y: 40 }}*/}
                {/*        animate={{ opacity: 1, y: 40 }}*/}
                {/*        exit={{ opacity: 0, y: -20 }}*/}
                {/*        transition={{ duration: 0.4 }}*/}
                {/*        className="w-full flex justify-center"*/}
                {/*    >*/}
                {/*        {element && React.cloneElement(element, { key: pathname })}*/}
                {/*    </motion.div>*/}
                {/*</AnimatePresence>*/}
            </div>
        </div>
    )
}