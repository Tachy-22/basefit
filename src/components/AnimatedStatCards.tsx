"use client"

import { motion } from "framer-motion";
import { IconType } from "react-icons";

// New component for animated stats card
export const AnimatedStatCard = ({
  EIcon,
  value,
  label,
  delay = 0,
}: {
  EIcon: IconType;
  value?: string;
  label?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="backdrop-blur-lg p-4 rounded-xl border border-coral-100  transition-all"
  >
    <div className="flex flex-col items-center">
      <EIcon className="text-3xl text-coral-100 mb-2" />
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);