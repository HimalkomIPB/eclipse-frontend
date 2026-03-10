import React from 'react';
import { Link } from 'react-router-dom';
import MotionReveal from '@/components/common/MotionReveal';

const isExternalUrl = (value = '') => /^https?:\/\//i.test(value);

const MarqueeItem = ({ item }) => {
  const content = (
    <>
      <img
        src={item.imageUrl}
        alt={item.name || 'Project'}
        className="h-24 w-44 rounded-2xl object-cover sm:h-28 sm:w-52 md:h-32 md:w-60"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder-news.jpg';
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
  if (!items?.length) return null;

  const loopItems = [...items, ...items];
  const offset = items.length ? Math.floor(items.length / 2) : 0;
  const bottomBase = offset ? [...items.slice(offset), ...items.slice(0, offset)] : [...items];
  const bottomLoop = [...bottomBase, ...bottomBase];

  return (
    <MotionReveal animation="fade-up" delay={0.2}>
      <div className="gallery-marquee space-y-4 py-4">
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
        <div className="marquee-row marquee-right">
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
    </MotionReveal>
  );
};

export default GalleryMarquee;
