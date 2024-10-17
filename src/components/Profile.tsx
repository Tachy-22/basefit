// pages/profile.tsx
"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

const Profile: FC = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-eastern-blue-500 to-chardonnay-500 text-white py-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-xl">{address}</p>
      </motion.div>

      {/* Fitness Stats */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Fitness Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Total Steps</h3>
            <p className="text-lg">120,000</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Calories Burned</h3>
            <p className="text-lg">45,000 kcal</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Challenges Completed</h3>
            <p className="text-lg">10</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Marathon Finisher</h3>
            <p>Completed a full marathon</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">10,000 Steps Streak</h3>
            <p>Walked 10,000 steps for 30 days straight</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
