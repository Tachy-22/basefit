"use client";

// pages/dashboard.tsx
import { FC } from "react";
import { motion } from "framer-motion";
//import Link from "next/link";

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        {/* User Summary */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">Welcome, [User]</h2>
              <p className="text-gray-500">
                Here&apos;s a summary of your recent activity.
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Token Balance: 1200 FCT</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4">
                View Wallet
              </button>
            </div>
          </motion.div>
        </section>

        {/* Progress Overview */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h4 className="text-lg font-bold">Daily Steps</h4>
              <p>8,500 / 10,000 steps</p>
              <progress
                className="w-full h-2 mt-2"
                value="8500"
                max="10000"
              ></progress>
            </motion.div>
            {/* Progress Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h4 className="text-lg font-bold">Running Distance</h4>
              <p>15 km / 20 km</p>
              <progress
                className="w-full h-2 mt-2"
                value="15"
                max="20"
              ></progress>
            </motion.div>
            {/* Progress Card 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h4 className="text-lg font-bold">Gym Workouts</h4>
              <p>3 / 5 sessions</p>
              <progress
                className="w-full h-2 mt-2"
                value="3"
                max="5"
              ></progress>
            </motion.div>
          </div>
        </section>

        {/* Recent Challenges */}
        <section>
          <h3 className="text-xl font-bold mb-4">Recent Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenge Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h4 className="text-lg font-bold">October Step Challenge</h4>
              <p>Current Rank: 5th / 100</p>
              <p>End Date: Oct 31, 2024</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Details
              </button>
            </motion.div>
            {/* Challenge Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h4 className="text-lg font-bold">10K Run Charity Event</h4>
              <p>Status: Registered</p>
              <p>Event Date: Nov 15, 2024</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Event
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
