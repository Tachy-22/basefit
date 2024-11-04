"use client";

import React, { useRef } from "react";
import { FC } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Button } from "@nextui-org/react";
import WalletWrapper from "./WalletWrapper";
import { useAccount } from "wagmi";

const Home: FC = () => {
  const { address, isConnected } = useAccount();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const horizontalScroll = useTransform(
    scrollYProgress,
    [0.1, 1],
    ["0%", "-400%"]
  );

  const verticalScroll = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    ["0%", "-100%"]
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <>
      <div
        ref={containerRef}
        className="h-full relative overflow-hid scrollbar-hide bg-[#083344]"
      >
        {/* Intense Web3 Animated Background */}
        <div className="fixed inset-0 overflow-hidden perspective-1000">
          {/* Hyper-active grid with intense glow */}
          <div className="absolute w-full h-full">
            <div className="absolute w-full h-full bg-[url('/grid.svg')] opacity-30 animate-[pulse_2s_ease-in-out_infinite]" />
            <motion.div
              className="absolute w-full h-full bg-[url('/grid.svg')] opacity-40"
              animate={{
                scale: [1, 1.5, 1],
                rotateZ: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Intense light rays with color shifts 
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-transparent to-purple-500/40 animate-[pulse_3s_ease-in-out_infinite]" />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-screen w-48 bg-gradient-to-b from-cyan-500/20 via-white/30 to-purple-500/20"
                style={{
                  left: `${i * 15}%`,
                  transform: `rotate(${30 + i * 15}deg)`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  x: [-200, 200, -200],
                  filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
*/}
          {/* Energetic nodes network 
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <div className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-[pulse_1.5s_ease-in-out_infinite]" />
                <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/50 animate-[ping_1.5s_ease-out_infinite]" />
              </motion.div>
            ))}
          </div> */}

          {/* Dynamic matrix rain effect 
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 text-cyan-500 text-xl font-matrix tracking-widest"
                style={{ left: `${i * 5}%` }}
                animate={{
                  y: [-100, window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {[...Array(20)]
                  .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
                  .join("\n")}
              </motion.div>
            ))}
          </div>*/}

          {/* Aggressive 3D Transform on Scroll */}
          <motion.div
            className="absolute inset-0"
            style={{
              rotateX: useTransform(scrollYProgress, [0, 1], [0, 45]),
              rotateY: useTransform(scrollYProgress, [0, 1], [0, -45]),
              scale: useTransform(scrollYProgress, [0, 1], [1, 0.6]),
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 animate-[pulse_4s_ease-in-out_infinite]" />
          </motion.div>

          {/* Enhanced Web3 Symbols
          <div className="absolute inset-0">
            {["₿", "Ξ", "◈", "∞", "⬡", "⟠", "∰", "⨊"].map((symbol, i) => (
              <motion.div
                key={i}
                className="absolute text-5xl font-bold"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + i * 8}%`,
                  textShadow: "0 0 25px rgba(34,211,238,0.8)",
                  color: "rgba(34,211,238,0.5)",
                }}
                animate={{
                  y: [-50, 50, -50],
                  rotateY: [0, 720],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
 */}
          {/* High contrast overlay with vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />

          {/* Enhanced holographic effect
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-purple-500/10"
            style={{
              backgroundSize: "400% 400%",
              filter: "url(#enhanced-holographic)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 200%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />  */}

          {/* Enhanced SVG Filters */}
          <svg className="hidden">
            <defs>
              <filter id="enhanced-holographic">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8"
                />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section with Parallax */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 2 }}
            >
              <div className="absolute w-full h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px w-px bg-cyan-500"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
              className="glassmorphic p-12 rounded-3xl max-w-5xl w-full mx-4 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center">
                  <div className="relative mb-6">
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg blur opacity-75"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <h1 className="relative text-7xl lg:text-8xl font-bold text-center bg-gradient-to-r from-cyan-300 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      BaseFit
                    </h1>
                  </div>
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-transparent"
                  >
                    <motion.path
                      fill="none"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M15 5a10 10 0 1 0 0 20 10 10 0 0 0 0-20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.path
                      fill="none"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M10 15h10M15 10v10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                    />
                    <motion.path
                      fill="none"
                      stroke="url(#logoGradient)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M12 12l6 6M18 12l-6 6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient
                        id="logoGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" style={{ stopColor: "#67e8f9" }} />
                        <stop offset="50%" style={{ stopColor: "#a855f7" }} />
                        <stop offset="100%" style={{ stopColor: "#ec4899" }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <motion.div
                  className="flex gap-4 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {["MOVE", "EARN", "IMPACT"].map((text, i) => (
                    <div
                      key={text}
                      className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                    >
                      {text}
                    </div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-2xl mb-12 text-center text-gray-200 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  The first <span className="text-cyan-400">Web3-powered</span>{" "}
                  fitness platform that rewards your
                  <span className="text-purple-400"> progress</span> and makes a
                  real-world
                  <span className="text-pink-400"> impact</span>.
                </motion.p>

                <motion.div
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  {isConnected ? (
                    <Button
                      color="warning"
                      className="min-w-[200px] h-14 text-lg rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30"
                      as="a"
                      href="/dashboard"
                    >
                      Launch App
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    </Button>
                  ) : (
                    <WalletWrapper
                      className="min-w-[200px] h-14 text-lg shadow-lg shadow-cyan-500/30"
                      text="Connect Wallet"
                      withWalletAggregator={true}
                    />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Horizontal Scroll Section */}
          <div className=" sticky top-[50px] h-[600vh] ">
            <div className="sticky top-[30px] h-screen overflow-hidden">
              <motion.div
                style={{ x: horizontalScroll, y: verticalScroll }}
                className="flex gap-8 absolute h-full items-center"
              >
                {/* Feature Cards */}
                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Track Your Progress
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Monitor your daily activities and progress towards your
                      fitness goals. Get insights into your performance and
                      adjust your routine accordingly.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Monitor your daily activities and progress towards
                          your fitness goals.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Get personalized recommendations for improvement.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Stay motivated with rewards and achievements.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      Join Challenges
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Participate in fitness challenges to push yourself beyond
                      limits. Engage with a community of like-minded individuals
                      to stay motivated.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Participate in fitness challenges to push yourself
                          beyond limits.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Compete with others to stay motivated and engaged.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Win rewards and recognition for your achievements.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500">
                      Nutrition Guide
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Get access to a comprehensive nutrition guide to help you
                      achieve your fitness goals. Learn about the best foods to
                      eat and when to eat them.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Access a comprehensive nutrition guide to help you
                          achieve your fitness goals.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Learn about the best foods to eat and when to eat
                          them.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Get personalized nutrition recommendations.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
                      Personal Trainer
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Get access to a personal trainer who will guide you
                      through your fitness journey. They will create a
                      personalized workout plan and provide support and
                      motivation.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Get access to a personal trainer who will guide you
                          through your fitness journey.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          They will create a personalized workout plan for you.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          They will provide support and motivation.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                      Yoga Classes
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Join our yoga classes to improve your flexibility,
                      strength, and mental well-being. Our experienced
                      instructors will guide you through various poses and
                      breathing techniques.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Join our yoga classes to improve your flexibility,
                          strength, and mental well-being.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Our experienced instructors will guide you through
                          various poses and breathing techniques.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Improve your overall well-being with yoga.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="w-screen h-[80vh] flex items-center justify-center p-8">
                  <div className="glassmorphic min-w-[70vw] min-h-full p-12 rounded-3xl max-w-4xl w-full transform transition-all duration-300">
                    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                      Meditation Sessions
                    </h2>
                    <p className="text-lg text-gray-100 mb-8">
                      Join our meditation sessions to reduce stress, improve
                      focus, and enhance your overall well-being. Our
                      experienced instructors will guide you through various
                      techniques.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Join our meditation sessions to reduce stress, improve
                          focus, and enhance your overall well-being.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Our experienced instructors will guide you through
                          various techniques.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <p className="text-gray-200">
                          Reduce stress and improve your overall well-being with
                          meditation.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* NFT Collection Section */}
          <motion.section
            className="min-h-screen flex items-center justify-center relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="glassmorphic p-12 rounded-3xl max-w-6xl w-full mx-4">
              <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Exclusive NFT Collection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    //   whileHover={{ scale: 1.05 }}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden">
                   
                      <img
                        src={`/NFT${i}.png`}
                        alt={`NFT ${i}`}
                        className="object-cover w-full h-full group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Workout Tracking Section */}
          <motion.section
            className="min-h-screen relative py-20 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Smart Workout Tracking
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Track your workouts with blockchain-verified accuracy. Earn
                    tokens for every milestone achieved.
                  </p>
                  <div className="space-y-4">
                    {[
                      "Heart Rate Monitoring",
                      "GPS Tracking",
                      "Performance Analytics",
                    ].map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-center space-x-3"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="h-2 w-2 bg-cyan-500 rounded-full" />
                        <span className="text-gray-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl transform rotate-3" />
                  <div className="relative glassmorphic rounded-3xl p-8">
                    <img
                      src="/workout-tracking.png"
                      alt="Workout Tracking"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Community Challenges Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Community Challenges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "30-Day Marathon", reward: "1000 BFT" },
                  { title: "Weight Loss Challenge", reward: "2000 BFT" },
                  { title: "Strength Training", reward: "1500 BFT" },
                ].map((challenge, i) => (
                  <motion.div
                    key={challenge.title}
                    className="glassmorphic rounded-2xl p-6"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Reward: {challenge.reward}
                    </p>
                    <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Tokenomics Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Tokenomics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  className="glassmorphic rounded-3xl p-8"
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold mb-6 text-white">
                    Token Distribution
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Community Rewards", value: "40%" },
                      { label: "Development", value: "30%" },
                      { label: "Marketing", value: "20%" },
                      { label: "Team", value: "10%" },
                    ].map((item, i) => (
                      <div key={item.label} className="relative">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-gray-300">{item.value}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: item.value }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ x: 100 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/tokenomics.png"
                    alt="Tokenomics"
                    className="rounded-3xl"
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Leaderboard Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Global Leaderboard
              </h2>
              <div className="glassmorphic rounded-3xl p-8">
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <motion.div
                      key={rank}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: rank * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-emerald-500">
                          #{rank}
                        </span>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                        <span className="text-white">User_{rank}</span>
                      </div>
                      <div className="text-emerald-400 font-bold">
                        {1000 - rank * 100} Points
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Partners Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Our Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {["trustwallet", "metamask", "googlefit", "coinbase"].map(
                  (i, index) => (
                    <motion.div
                      key={i}
                      className="glassmorphic rounded-2xl p-6 flex items-center justify-center"
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      //   whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={`/${i}.svg`}
                        alt={`${i}`}
                        className="h-16 w-16 rounded-full"
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.section>

          {/* Roadmap Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Roadmap
              </h2>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500" />
                {[
                  { phase: "Q1 2024", title: "Platform Launch" },
                  { phase: "Q2 2024", title: "Mobile App Release" },
                  { phase: "Q3 2024", title: "Global Expansion" },
                  { phase: "Q4 2024", title: "Advanced Features" },
                ].map((item, i) => (
                  <motion.div
                    key={item.phase}
                    className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} mb-12`}
                    initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="glassmorphic rounded-2xl p-6 max-w-md relative">
                      <div
                        className={`absolute top-1/2 ${i % 2 === 0 ? "right-0" : "left-0"} transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
                      />
                      <h3 className="text-2xl font-bold mb-2 text-white">
                        {item.phase}
                      </h3>
                      <p className="text-gray-300">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Newsletter Section */}
          <motion.section
            className="min-h-screen relative py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="glassmorphic rounded-3xl p-12 text-center">
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Stay Updated
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                  Subscribe to our newsletter for the latest updates and
                  exclusive offers
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                  <Button
                    color="primary"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer Section */}
          <motion.footer
            className="relative py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    BaseFit
                  </h3>
                  <p className="text-gray-400">
                    Revolutionizing fitness with blockchain technology
                  </p>
                </div>
                {["Products", "Resources", "Company"].map((section) => (
                  <div key={section}>
                    <h4 className="text-lg font-bold mb-4 text-white">
                      {section}
                    </h4>
                    <ul className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {section} Link {i}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
                © 2024 BaseFit. All rights reserved.
              </div>
            </div>
          </motion.footer>
        </div>
      </div>

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          mix-blend-mode: screen;
          animation: float 20s infinite;
          transition: all 0.3s ease;
        }
        .blob-1 {
          top: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: rgba(0, 255, 255, 0.4);
          animation-delay: 0s;
        }
        .blob-2 {
          bottom: -150px;
          right: -150px;
          width: 600px;
          height: 600px;
          background: rgba(255, 0, 255, 0.4);
          animation-delay: -5s;
        }
        .blob-3 {
          top: 50%;
          left: 50%;
          width: 400px;
          height: 400px;
          background: rgba(255, 255, 0, 0.4);
          animation-delay: -10s;
        }
        .blob-4 {
          top: 20%;
          right: 20%;
          width: 350px;
          height: 350px;
          background: rgba(0, 255, 0, 0.4);
          animation-delay: -15s;
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.9) rotate(240deg);
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(360deg);
          }
        }
        .glassmorphic {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
      `}</style>
    </>
  );
};

export default Home;
