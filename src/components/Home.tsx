"use client";
import React from "react";
// pages/index.tsx
import { FC } from "react";
import { motion } from "framer-motion";
//import Link from "next/link";

const Home: FC = () => {
  return (
    <div className="h-full text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-20 bg-gradient-to-r  text-white h-[80vh]"
      >
        <div className="h-[80vh] w-full bg-black/40 absolute z-10"></div>

        <h1 className="text-4xl font-bold mb-4 z-20">Welcome to FitChain</h1>
        <p className="text-lg mb-8 text-center max-w-2xl z-20">
          Decentralized fitness and charity rewards platform. Track your
          progress, join challenges, and earn real-world rewards while making an
          impact.
        </p>
        <button className="bg-cyan-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-100 z-20">
          Get Started
        </button>
      </motion.section>

      {/* How It Works Section */}
      <section className="w-full mx-auto py-12 px-6 bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p>Sign up and connect your fitness tracking app.</p>
          </div>
          <div className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <p>Join challenges or create your own, verified on-chain.</p>
          </div>
          <div className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p>Earn tokens, track your impact, and redeem rewards.</p>
          </div>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 text-white py-20 text-center w-full">
        <h2 className="text-3xl font-bold mb-8">Join the FitChain Community</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Become a part of the decentralized fitness revolution. Whether you’re
          looking to stay fit, join challenges, or donate to charity, there’s
          something for everyone.
        </p>
        <div className="flex justify-center space-x-6">
          <button className="bg-cyan-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-coral-100">
            Join Now
          </button>
          <button className="bg-cyan-950 text-white px-6 py-3 rounded-full font-semibold hover:bg-coral-100">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className=" bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 mx-auto py-12 px-6 w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Decentralized Rewards</h3>
            <p>
              Earn tokens for achieving your fitness goals with on-chain
              verification.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Community Challenges</h3>
            <p>
              Join and create challenges, earn rewards, and engage with your
              fitness community.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 rounded-lg shadow-md p-6 text-center"
          >
            <h3 className="text-xl font-bold mb-2">Charity Events</h3>
            <p>
              Participate in charity events, track donations transparently, and
              earn rewards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" rounded-lg  p-6">
            <h3 className="font-bold mb-2">How do I earn tokens?</h3>
            <p>
              Tokens are earned by completing verified fitness challenges and
              tracking progress via the platform.
            </p>
          </div>
          <div className=" rounded-lg  p-6">
            <h3 className="font-bold mb-2">What can I do with my tokens?</h3>
            <p>
              Tokens can be redeemed for rewards such as fitness equipment,
              donations to charity, or even cryptocurrency.
            </p>
          </div>
          <div className=" rounded-lg  p-6">
            <h3 className="font-bold mb-2">How do I join a challenge?</h3>
            <p>
              Simply sign up, browse available challenges, and click
              &quot;Join.&quot; You can also create your own challenges.
            </p>
          </div>
          <div className=" rounded-lg  p-6">
            <h3 className="font-bold mb-2">Is my progress verified?</h3>
            <p>
              Yes, all progress is verified using on-chain data to ensure
              transparency and fairness.
            </p>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="w-full bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Partners & Sponsors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border rounded-lg border-cyan-900 p-6">
            <p>Partner 1</p>
          </div>
          <div className="border rounded-lg border-cyan-900 p-6">
            <p>Partner 2</p>
          </div>
          <div className="border rounded-lg border-cyan-900 p-6">
            <p>Partner 3</p>
          </div>
          <div className="border rounded-lg border-cyan-900 p-6">
            <p>Partner 4</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-gradient-to-b from-cyan-900 to-cyan-900 via-cyan-950 py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
        <p className="text-lg mb-8">
          Have any questions or want to learn more about FitChain? Contact us
          below.
        </p>
        <button className="bg-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-700">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Home;
