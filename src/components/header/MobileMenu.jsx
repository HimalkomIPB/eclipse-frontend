import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useFetchData } from '../../hooks/useAPI';
import { isRegistrationPath, registrationFeatures } from '../../pages/RegistrationInfo/features';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const MobileMenu = ({ isOpen, onCloseMenu }) => {
  const { pathname } = useLocation();
  const isIlkomerzHubRoute = isRegistrationPath(pathname);
  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    community: false,
    informasi: false,
    ilkomerzHub: false,
  });

  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && isIlkomerzHubRoute) {
      setExpandedSections(previous => ({ ...previous, informasi: true, ilkomerzHub: true }));
    }
  }, [isOpen, isIlkomerzHubRoute]);

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
    <nav aria-label="Navigasi mobile" className="w-full rounded-[1.75rem] border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl">
      <div className="max-h-[min(34rem,calc(100dvh-7rem))] overflow-y-auto overscroll-contain px-3 py-3 sm:px-4">
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
            type="button"
            aria-expanded={expandedSections.profile}
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
            type="button"
            aria-expanded={expandedSections.community}
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
            type="button"
            aria-expanded={expandedSections.informasi}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-white transition hover:bg-white/10 ${isIlkomerzHubRoute ? 'font-semibold' : ''}`}
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
                to="/prestasi"
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

              <button
                type="button"
                aria-expanded={expandedSections.ilkomerzHub}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-white transition hover:bg-white/10 ${isIlkomerzHubRoute ? 'font-semibold' : ''}`}
                onClick={() => toggleSection('ilkomerzHub')}
              >
                <span>Ilkomerz Hub</span>
                <svg
                  className={`h-4 w-4 transition-transform ${expandedSections.ilkomerzHub ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.ilkomerzHub && (
                <div className="my-1 ml-3 border-l-2 border-white/20 pl-3">
                  {registrationFeatures.map(({ path, label }) => (
                    <NavLink key={path} to={path} className={({ isActive }) => menuItemClass(isActive)} onClick={onCloseMenu}>
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
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
    </nav>
  );
};

export default MobileMenu;
