"use client";
import React from "react";
import Header from "./_components/Header";
import logo from "../../public/logo.svg";
import { createContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/40"
        >
          <Header logo={logo} />
        </motion.div>

        <motion.main 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="rounded-2xl bg-card/30 backdrop-blur-sm shadow-lg border border-border/40 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
              {children}
            </WebCamContext.Provider>
          </motion.div>
        </motion.main>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashboardLayout;
