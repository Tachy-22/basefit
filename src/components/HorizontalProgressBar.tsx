"use client";

import { motion, useScroll } from "framer-motion";
import { RefObject, useRef } from "react";

const HorizontalProgressBar = ({
  scrollContainerRef,
}: {
  scrollContainerRef: RefObject<HTMLDivElement>;
}) => {
  const barRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for the target div
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
  });
  return (
    <motion.div
      ref={barRef}
      style={{ scaleX: scrollYProgress }}
      className="h-1 w-full bg-primary rounded-r-xl sticky origin-top-left top-0 left-0 z-50 "
    />
  );
};

export default HorizontalProgressBar;
