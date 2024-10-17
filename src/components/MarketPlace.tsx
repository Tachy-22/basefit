// pages/marketplace.tsx
"use client";
import { FC } from "react";
import { motion } from "framer-motion";

const Marketplace: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Marketplace Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-eastern-blue-500 to-chardonnay-500 text-white py-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
        <p className="text-xl">Redeem your tokens for rewards</p>
      </motion.div>

      {/* Reward Items */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Available Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Running Shoes</h3>
            <p>500 Tokens</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Redeem
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Gym Membership</h3>
            <p>800 Tokens</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Redeem
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Yoga Mat</h3>
            <p>300 Tokens</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Redeem
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
