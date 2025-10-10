import { useOutlet, useLocation } from "react-router-dom";
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';

import Header from "../components/Auth/Header.jsx";

export default function AuthPage() {
    const { pathname } = useLocation();
    const element = useOutlet();

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center p-12 bg-main-white">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.5 }}
                    >
                        {element && React.cloneElement(element, { key: pathname })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}