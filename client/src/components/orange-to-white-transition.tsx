import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * OrangeToWhiteTransition Component
 * Creates seamless theme transition from orange TextReveal to white ThreeStepsProcess
 * Transitions from orange (#FF5D05) to white background with text color changes
 */
export default function OrangeToWhiteTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Ultra fast transition - instant color change
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 1],
    [
      '#FF5D05',           // Orange start
      '#FF5D05',           // Hold orange very briefly (10%)
      '#ffffff',           // Ultra quick transition to white (20%)
      '#ffffff'            // White locked
    ]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 1],
    [
      'rgb(255, 255, 255)', // White text start
      'rgb(255, 255, 255)', // Hold white very briefly (10%)
      'rgb(31, 41, 55)',    // Ultra quick transition to dark (20%)
      'rgb(31, 41, 55)'     // Dark locked
    ]
  );

  // Update CSS variables for theme synchronization
  useEffect(() => {
    const unsubscribe = backgroundColor.onChange((latest) => {
      document.documentElement.style.setProperty('--transition-bg', latest);
    });
    return unsubscribe;
  }, [backgroundColor]);

  useEffect(() => {
    const unsubscribe = textColor.onChange((latest) => {
      document.documentElement.style.setProperty('--transition-text', latest);
    });
    return unsubscribe;
  }, [textColor]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        backgroundColor,
        color: textColor,
      }}
      className="h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Transition content with words */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center">
          {/* Main words display - visible from start, follows color transition */}
          <motion.div
            className="space-y-4"
            style={{
              opacity: 1
            }}
          >
            {['CREATIVE', 'BOLD', 'DYNAMIC'].map((word, index) => (
              <motion.h2
                key={word}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider"
                style={{
                  // Color follows the exact same transition as textColor
                  color: useTransform(
                    scrollYProgress,
                    [0, 0.1, 0.2, 1],
                    [
                      'rgb(255, 255, 255)', // White on orange background
                      'rgb(255, 255, 255)', // Stay white very briefly
                      'rgb(31, 41, 55)',    // Ultra quick transition to black
                      'rgb(31, 41, 55)'     // Stay black on white background
                    ]
                  ),
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              >
                {word}
              </motion.h2>
            ))}
          </motion.div>

          {/* Separator line that grows and stays */}
          <motion.div
            className="mt-8 flex justify-center"
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1])
            }}
          >
            <motion.div
              className="h-0.5"
              style={{
                width: useTransform(scrollYProgress, [0.5, 0.8, 1], ['0%', '80%', '80%']),
                backgroundColor: useTransform(
                  scrollYProgress,
                  [0, 0.1, 0.2, 1],
                  [
                    'rgb(255, 255, 255)', // White line on orange
                    'rgb(255, 255, 255)', // Stay white very briefly
                    'rgb(31, 41, 55)',    // Ultra quick transition to black
                    'rgb(31, 41, 55)'     // Stay black
                  ]
                ),
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Respectful gradient overlay - activates after TextReveal exits */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.1, 0.2, 1],
            [
              'radial-gradient(circle at center, rgba(255,93,5,0) 0%, rgba(255,93,5,0) 100%)',
              'radial-gradient(circle at center, rgba(255,93,5,0) 0%, rgba(255,93,5,0) 100%)',
              'radial-gradient(circle at center, rgba(255,120,60,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)'
            ]
          )
        }}
      />
    </motion.div>
  );
}