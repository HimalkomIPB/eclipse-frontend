import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchData } from '../../hooks/useAPI';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const MobileMenu = ({ onCloseMenu }) => {
  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    community: false,
    informasi: false
  });

  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData('divisions', baseUrl);
  const { data: communitiesData } = useFetchData('communities', baseUrl);

  const divisions = divisionsData?.divisions || [];
  const communities = communitiesData?.communities || [];

  const menuItemClass = (isActive) => `
    block rounded-xl px-3 py-2.5 text-white transition-all duration-300
    ${animateItems ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
    ${isActive ? 'bg-white/14 font-semibold' : 'hover:bg-white/10'}
  `;

  return (
    <div className="fixed right-0 top-0 z-50 w-full rounded-[1.75rem] border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl">
      <div className="flex max-h-[min(70vh,34rem)] flex-col overflow-y-auto px-3 py-3 sm:px-4">
        <div className="border-b border-white/10 px-1 pb-2">
          <NavLink
            to="/home"
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
            style={{ transitionDelay: '100ms' }}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
            style={{ transitionDelay: '120ms' }}
          >
            Explore
          </NavLink>
        </div>

        <div className="border-b border-white/10 px-1 py-2">
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-white transition hover:bg-white/10"
            onClick={() => toggleSection('profile')}
          >
            <span>Profil</span>
            <svg
              className={`h-4 w-4 transition-transform ${expandedSections.profile ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {expandedSections.profile && (
            <div className="ml-3 my-1 border-l-2 border-white/20 pl-3">
              <NavLink
                to="/himalkom"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Himalkom
              </NavLink>

              <div className="mb-2 mt-1">
                <h4 className="px-3 py-1 text-sm font-medium text-white/70">Departemen:</h4>
                <div className="pl-2">
                  {divisions.length > 0 ? (
                    divisions.map((division, index) => (
                      <NavLink
                        key={division.id || division.slug}
                        to={`/division/${division.slug}`}
                        className={({isActive}) => menuItemClass(isActive)}
                        onClick={onCloseMenu}
                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                      >
                        {division.abbreviation || division.name}
                      </NavLink>
                    ))
                  ) : (
                    <p className="px-3 py-1 text-sm italic text-white/60">Loading...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-white/10 px-1 py-2">
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-white transition hover:bg-white/10"
            onClick={() => toggleSection('community')}
          >
            <span>Komunitas</span>
            <svg
              className={`h-4 w-4 transition-transform ${expandedSections.community ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {expandedSections.community && (
            <div className="ml-3 my-1 border-l-2 border-white/20 pl-3">
              {communities.length > 0 ? (
                communities.map((community, index) => (
                  <NavLink
                    key={community.id || community.slug}
                    to={`/community/${community.slug}`}
                    className={({isActive}) => menuItemClass(isActive)}
                    onClick={onCloseMenu}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    {community.name}
                  </NavLink>
                ))
              ) : (
                <p className="px-3 py-1 text-sm italic text-white/60">Loading...</p>
              )}
            </div>
          )}
        </div>

        <div className="border-b border-white/10 px-1 py-2">
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-white transition hover:bg-white/10"
            onClick={() => toggleSection('informasi')}
          >
            <span>Informasi</span>
            <svg
              className={`h-4 w-4 transition-transform ${expandedSections.informasi ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {expandedSections.informasi && (
            <div className="ml-3 my-1 border-l-2 border-white/20 pl-3">
              <NavLink
                to="/komnews"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Komnews
              </NavLink>
              <NavLink
                to="/galeri"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Galeri
              </NavLink>
              <NavLink
                to="/Prestasi"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Prestasi
              </NavLink>
              <NavLink
                to="/syntax"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Syntax
              </NavLink>
            </div>
          )}
        </div>

        <div className="px-1 py-2">
          <NavLink
            to="/megaproker"
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
          >
            Megaproker
          </NavLink>

          <NavLink
            to="/riset"
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
          >
            Riset
          </NavLink>

          
        </div>

        <div className="mt-2 border-t border-white/10 px-3 pb-1 pt-4">
          <div className="mb-3 flex justify-center space-x-5">
            <a
              href="https://www.facebook.com/himalkom/?locale=id_ID"
              className="text-white/70 transition hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/himalkomipb/"
              className="text-white/70 transition hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://twitter.com/HimalkomIPB"
              className="text-white/70 transition hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://www.youtube.com/@himalkomipb4653"
              className="text-white/70 transition hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={18} />
            </a>
          </div>

          <p className="mb-2 text-center text-[10px] text-white/45">
            Copyright © Himalkom 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
