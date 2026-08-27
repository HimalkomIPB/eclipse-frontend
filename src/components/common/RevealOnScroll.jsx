import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight reveal-on-scroll component using IntersectionObserver + CSS transitions.
 * Replaces Framer Motion's MotionReveal to reduce JS bundle size.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'fade-up'|'fade-down'|'fade-left'|'fade-right'|'zoom'} props.animation
 * @param {number} props.delay - Delay in seconds before the animation starts
 * @param {number} props.duration - Animation duration in seconds
 * @param {boolean} props.forceVisible - Skip animation, show immediately
 * @param {boolean} props.once - Whether to only animate once (default: true)
 * @param {string} props.className - Additional CSS classes
 */
const RevealOnScroll = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.5,
  forceVisible = false,
  once = true,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) return;

    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: '-50px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [forceVisible, once]);

  const baseStyle = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  // Animation presets — hidden state transforms
  const transforms = {
    'fade-up':    { from: 'translateY(20px)', to: 'translateY(0)' },
    'fade-down':  { from: 'translateY(-20px)', to: 'translateY(0)' },
    'fade-left':  { from: 'translateX(-20px)', to: 'translateX(0)' },
    'fade-right': { from: 'translateX(20px)', to: 'translateX(0)' },
    'zoom':       { from: 'scale(0.95)', to: 'scale(1)' },
  };

  const preset = transforms[animation] || transforms['fade-up'];

  const style = {
    ...baseStyle,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? preset.to : preset.from,
  };

  return (
    <div ref={ref} style={style} className={className} {...props}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
