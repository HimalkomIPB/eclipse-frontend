import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';

/**
 * MotionReveal - Component untuk animasi reveal saat scroll
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Elements to animate
 * @param {string} props.animation - Animation preset ('fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom')
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.duration - Animation duration (in seconds)
 * @param {boolean} props.forceVisible - Force the element to be immediately visible
 * @param {string} props.className - Additional CSS classes
 */
const MotionReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.5,
  forceVisible = false,
  once = true,
  className = '',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: '-50px 0px',
    once,
  });

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    'zoom': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const selectedVariant = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : (variants[animation] || variants['fade-up']);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={forceVisible ? 'visible' : isInView ? 'visible' : 'hidden'}
      transition={{
        duration: prefersReducedMotion ? 0.2 : duration,
        delay,
        ease: 'easeOut'
      }}
      variants={selectedVariant}
      className={`motion-reveal ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
