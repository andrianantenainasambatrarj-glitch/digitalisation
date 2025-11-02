import React from "react";
import { motion } from "framer-motion";

const Hero = ({ title, subtitle, image }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lg border border-base-300 mb-8">
      <motion.img
        src={image}
        alt="Bannière service"
        className="w-full h-52 md:h-64 object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-accent/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center md:justify-end px-8 py-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold drop-shadow-lg"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-lg opacity-90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Hero;
