import React from "react";
import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <motion.div
      className="mb-8 px-4 md:px-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
            <span className="border-l-4 border-primary pl-2">{title}</span>
          </h1>
          {subtitle && (
            <p className="text-base-content/70 mt-1 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div className="mt-4 h-[2px] bg-gradient-to-r from-primary to-accent w-32 rounded-full" />
    </motion.div>
  );
};

export default PageHeader;
