import { useOutlet, useLocation } from "react-router-dom";
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';

import UnAuthorizedHeader from "../components/Headers/UnAuthorizedHeader.jsx";

export default function AuthPage() {
    const { pathname } = useLocation();
    const element = useOutlet();

    const isLogin = pathname === "/login";

    return (
        <div className="min-h-screen h-screen flex flex-col overflow-hidden">
            <UnAuthorizedHeader />
            <div className="flex flex-col mt-18 items-center justify-center bg-main-white h-full overflow-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: isLogin ? 40 : 110 }}
                        animate={{ opacity: 1, y: isLogin ? 0 : 70 }}
                        exit={{ opacity: 0, y: isLogin ? 20 : -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        {element && React.cloneElement(element, { key: pathname })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}