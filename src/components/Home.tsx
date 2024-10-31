"use client";

import React from "react";
import { FC } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import WalletWrapper from "./WalletWrapper";
import { useAccount } from "wagmi";
import { useRef } from "react";

const Home: FC = () => {
  const { address, isConnected } = useAccount();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Enhanced parallax effects
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -300]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const featuresX = useTransform(smoothProgress, [0.1, 0.3], [1000, 0]);
  const featuresOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);

  const statsScale = useTransform(smoothProgress, [0.2, 0.4], [0.8, 1.2]);
  const statsRotate = useTransform(smoothProgress, [0.2, 0.4], [45, 0]);

  const roadmapProgress = useTransform(smoothProgress, [0.4, 0.6], [0, 100]);
  
  const tokenomicsScale = useTransform(smoothProgress, [0.5, 0.7], [0.5, 1.2]);

  const partnersY = useTransform(smoothProgress, [0.7, 0.9], [200, 0]);
  const partnersOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);

  // Enhanced text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  // New floating animation
  const floatingAnimation = {
    y: [-20, 20],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // New stagger container animation
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // New hover animation
  const hoverAnimation = {
    scale: 1.05,
    rotate: 3,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  };

  // Background gradient animation
  const gradientAnimation = {
    background: [
      "linear-gradient(45deg, #00c6ff 0%, #0072ff 100%)",
      "linear-gradient(45deg, #0072ff 0%, #00c6ff 100%)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  // Add your existing JSX here, but update animations using the new variants
  // For example:

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden bg-[#0a0f1f]" 
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #00c6ff 0%, #0072ff 100%)",
            "linear-gradient(45deg, #0072ff 0%, #00c6ff 100%)"
          ],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse" as const
          }
        }}
        style={{
          opacity: 0.1,
          filter: "blur(100px)"
        }}
      />

      {/* Your existing sections with enhanced animations */}
      <div className="relative z-10">
        {/* Hero Section with enhanced animations */}
        <motion.section
          className="min-h-screen flex items-center justify-center px-4"
          style={{
            y: heroY,
            scale: heroScale,
            opacity: heroOpacity
          }}
        >
          <motion.div 
            className="max-w-7xl mx-auto text-center"
            variants={containerAnimation}
          >
            <motion.div
              className="mb-8"
              animate={{
                y: [-10, 10],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <motion.img 
                src="https://placehold.co/200x200?text=BaseFit" 
                alt="Logo"
                className="mx-auto"
                whileHover={hoverAnimation}
                drag
                dragConstraints={{
                  top: -50,
                  left: -50,
                  right: 50,
                  bottom: 50,
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6"
              variants={textVariants}
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 8px rgb(0,255,255)"
              }}
            >
              BaseFit Protocol
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-cyan-100 mb-8"
              variants={textVariants}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              Move • Earn • Transform
            </motion.p>

            <motion.div 
              className="flex gap-4 justify-center"
              variants={containerAnimation}
            >
              {isConnected ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    color="primary"
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600"
                  >
                    Launch App
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <WalletWrapper
                    className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    text="Connect Wallet"
                    withWalletAggregator={true}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Continue with other sections, adding similar enhanced animations */}
        {/* Features Section */}
        <motion.section 
          className="py-20 px-4"
          style={{
            x: featuresX,
            opacity: featuresOpacity
          }}
          variants={containerAnimation}
        >
          {/* Add your features content with enhanced animations */}
        </motion.section>

        {/* Add remaining sections with similar animation enhancements */}
        
        {/* New smooth scroll progress indicator */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1 bg-cyan-500"
          style={{
            scaleX: smoothProgress,
            transformOrigin: "0%"
          }}
        />
      </div>
    </motion.div>
  );
};

export default Home;
