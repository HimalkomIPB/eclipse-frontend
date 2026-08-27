import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import logoHimalkom from '@/assets/logo-himalkom.svg';

const MarqueeItem = ({ item }) => {
  const content = (
    <>
      <img
        src={item.imageUrl}
        alt={item.name || 'Project'}
        width="240"
        height="128"
        loading="lazy"
        decoding="async"
        className="h-24 w-44 rounded-2xl object-cover sm:h-28 sm:w-52 md:h-32 md:w-60"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = logoHimalkom;
        }}
      />
      <div className="marquee-tooltip">
        <p className="text-xs font-semibold text-white">{item.name}</p>
        {item.subtitle && (
          <p className="text-[10px] text-white/70">{item.subtitle}</p>
        )}
      </div>
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="marquee-item group"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.href} className="marquee-item group">
      {content}
    </Link>
  );
};

const GalleryMarquee = ({ items }) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Pause marquee animation when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!items?.length) return null;

  // Render seamless duplicate loop for smooth scrolling
  const loopItems = [...items, ...items];
  const offset = items.length ? Math.floor(items.length / 2) : 0;
  const bottomBase = offset ? [...items.slice(offset), ...items.slice(0, offset)] : [...items];
  const bottomLoop = [...bottomBase, ...bottomBase];

  return (
    <RevealOnScroll animation="fade-up" delay={0.15}>
      <div
        ref={containerRef}
        className={`gallery-marquee space-y-4 py-4 ${!isInView ? 'marquee-paused' : ''}`}
      >
        <div className="marquee-row marquee-left">
          <div className="marquee-track">
            {loopItems.map((item, index) => (
              <MarqueeItem
                key={`${item.id || item.name || 'item'}-top-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
        {/* On mobile screens, hide the 2nd row to cut DOM nodes in half */}
        <div className="marquee-row marquee-right hidden sm:block">
          <div className="marquee-track">
            {bottomLoop.map((item, index) => (
              <MarqueeItem
                key={`${item.id || item.name || 'item'}-bottom-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default GalleryMarquee;
