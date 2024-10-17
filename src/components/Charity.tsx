// pages/charity.tsx
"use client";
import { FC } from "react";
import { motion } from "framer-motion";

const Charity: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Charity Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-eastern-blue-500 to-chardonnay-500 text-white py-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Charity</h1>
        <p className="text-xl">
          Donate your rewards to support causes you care about
        </p>
      </motion.div>

      {/* Charity Events */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Charity Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Run for Health</h3>
            <p>Join a running challenge to raise money for local hospitals.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Donate Tokens
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Walk for Education</h3>
            <p>Support education programs by joining this challenge.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Donate Tokens
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Charity;
