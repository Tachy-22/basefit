"use client";

import React from "react";
import { FC } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import WalletWrapper from "./WalletWrapper";
import { useAccount } from "wagmi";


const Home: FC = () => {
  const { address, isConnected } = useAccount();



  return (
    <div className="h-full relative overflow-hidden bg-[#083344] ">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center max-w-7xl mx-auto py-20 h-[80vh] px-4 sm:px-6 lg:px-8"
        >
          <div className="glassmorphic p-8 rounded-2xl max-w-3xl w-full">
            <motion.h1
              className="text-4xl lg:text-5xl  font-bold mb-4 text-center bg-gradient-to-r from-coral-300 to-coral-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Welcome to BaseFit
            </motion.h1>
            <p className="text-lg mb-8 text-center text-gray-200">
              Decentralized fitness and charity rewards platform. Track your
              progress, join challenges, and earn real-world rewards while
              making an impact.
            </p>
            <div className="flex justify-center">
              {isConnected ? (
                <Button
                  color="warning"
                  className="min-w-[90px] rounded-full"
                  as="a"
                  href="/dashboard"
                >
                  Go to Dashboard
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              ) : (
                <WalletWrapper
                  className="min-w-[90px]"
                  text="Connect Wallet"
                  withWalletAggregator={true}
                />
              )}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2">
              <img
                src="/pexels-823sl-2294361.jpg"
                alt="How It Works"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-gray-200">
                  Sign up and connect your fitness tracking app.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-gray-200">
                  Join challenges or create your own, verified on-chain.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-gray-200">
                  Earn tokens, track your impact, and redeem rewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Blockchain Verified
              </h3>
              <p className="text-gray-100">
                All activities and challenges are securely recorded on-chain.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Token Rewards
              </h3>
              <p className="text-gray-100">
                Earn FitTokens for completing challenges and reaching
                milestones.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Charity Integration
              </h3>
              <p className="text-gray-100">
                Donate a portion of your earnings to verified charitable causes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Community Challenges
              </h3>
              <p className="text-gray-100">
                Create and participate in group fitness challenges.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            What Our Users Say
          </h2>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#083344] px-4 text-sm text-gray-500">
                Testimonials
              </span>
            </div>
          </div>
          <div className="mt-8 space-y-8">
            <blockquote className="italic border-l-4 border-cyan-500 pl-4 py-2 my-4">
              <p className="text-gray-200 mb-2">
                "FitChain has completely transformed my fitness journey. The
                blockchain integration adds a whole new level of motivation!"
              </p>
              <footer className="text-white font-semibold">- Sarah J.</footer>
            </blockquote>
            <blockquote className="italic border-l-4 border-purple-500 pl-4 py-2 my-4">
              <p className="text-gray-200 mb-2">
                "I love how I can earn rewards while staying fit and even
                contribute to charities. It's a win-win-win situation!"
              </p>
              <footer className="text-white font-semibold">- Mike T.</footer>
            </blockquote>
            <blockquote className="italic border-l-4 border-green-500 pl-4 py-2 my-4">
              <p className="text-gray-200 mb-2">
                "The community challenges keep me engaged and push me to achieve
                more. FitChain is revolutionary!"
              </p>
              <footer className="text-white font-semibold">- Emily R.</footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-12 md:py-20 md:px-12 text-center lg:text-left">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-3/5">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    Ready to Start Your FitChain Journey?
                  </h2>
                  <p className="text-lg md:text-xl text-cyan-100 mb-8">
                    Join now and get 100 FitTokens as a welcome bonus!
                  </p>
                </div>
                <div className="mt-8 md:mt-0 md:w-2/5">
                  <div className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-cyan-50 md:py-4 md:text-lg md:px-10"
                    >
                      Sign Up Now
                      <svg
                        className="ml-2 -mr-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the sections... */}
        {/* Update each section similarly with glassmorphic effects and appropriate text colors */}
      </div>

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.7;
        }
        .blob-1 {
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: rgba(0, 255, 255, 0.3);
          animation: move 30s infinite alternate;
        }
        .blob-2 {
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: rgba(255, 0, 255, 0.3);
          animation: move 40s infinite alternate-reverse;
        }
        .blob-3 {
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 0, 0.3);
          animation: move 35s infinite alternate;
        }
        .blob-4 {
          top: 20%;
          right: 20%;
          width: 250px;
          height: 250px;
          background: rgba(0, 255, 0, 0.3);
          animation: move 45s infinite alternate-reverse;
        }
        @keyframes move {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(100px, 50px) scale(1.1);
          }
        }
        .glassmorphic {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Home;
