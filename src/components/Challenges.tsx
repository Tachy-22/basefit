// pages/challenges.tsx
"use client";
import { FC } from "react";
import { motion } from "framer-motion";

const Challenges: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Challenges Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-eastern-blue-500 to-chardonnay-500 text-white py-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Challenges</h1>
        <p className="text-xl">Join a challenge and earn rewards</p>
      </motion.div>

      {/* Ongoing Challenges */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Ongoing Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Step Challenge</h3>
            <p>Walk 10,000 steps a day for 7 days.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Join Now
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Run for Charity</h3>
            <p>Run 5km a day to raise money for charity.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Challenges */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upcoming Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Cycling Challenge</h3>
            <p>Cycle 100km in a week.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Learn More
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Push-Up Challenge</h3>
            <p>Complete 100 push-ups in a day.</p>
            <button className="mt-4 bg-eastern-blue-500 text-white px-4 py-2 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Challenges;
