import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSharedFetch } from "@/hooks/useSharedFetch";

/**
 * Menu navigasi untuk desktop view (CSS transition based, no heavy animation library)
 */
const NavMenu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInformasiOpen, setIsInformasiOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useSharedFetch("divisions", baseUrl);
  const { data: communitiesData } = useSharedFetch("communities", baseUrl);

  const divisions = divisionsData?.divisions || [];

  const defaultCommunities = [
    { name: "Agriux", slug: "agriux" },
    { name: "IWDC", slug: "iwdc" },
    { name: "CSI", slug: "csi" },
    { name: "Agribot", slug: "agribot" },
    { name: "CP", slug: "cp" },
    { name: "Daming", slug: "daming" },
    { name: "Gary", slug: "gary" },
    { name: "MAD", slug: "mad" },
  ];
  const communities = communitiesData?.communities || defaultCommunities;

  const profileRef = useRef(null);
  const informasiRef = useRef(null);
  const departmentRef = useRef(null);
  const communityRef = useRef(null);

  const closeDropdowns = () => {
    setIsProfileOpen(false);
    setIsInformasiOpen(false);
    setIsDepartmentOpen(false);
    setIsCommunityOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsDepartmentOpen(false);
      }
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
      if (
        communityRef.current &&
        !communityRef.current.contains(event.target)
      ) {
        setIsCommunityOpen(false);
      }
      if (informasiRef.current && !informasiRef.current.contains(event.target)) {
        setIsInformasiOpen(false);
      }
    };

    if (
      isProfileOpen ||
      isDepartmentOpen ||
      isCommunityOpen ||
      isInformasiOpen
    ) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isDepartmentOpen, isCommunityOpen, isInformasiOpen]);

  const desktopLinkClass = ({ isActive }) =>
    `relative text-[0.94rem] leading-none tracking-[0.01em] text-white/88 transition-all duration-200 hover:text-white 2xl:text-[1rem] ${
      isActive ? "font-semibold text-white" : "font-medium"
    }`;

  const desktopButtonClass =
    "cursor-pointer text-[0.94rem] font-medium leading-none tracking-[0.01em] text-white/88 transition-all duration-200 hover:text-white 2xl:text-[1rem]";

  const dropdownPanelClass =
    "absolute left-0 top-full z-40 mt-4 min-w-60 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] p-2 shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl 2xl:min-w-64 transition-all duration-200 ease-out";

  const dropdownLinkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-[0.98rem] leading-none text-white/82 transition-all duration-200 hover:bg-white/10 hover:text-white ${
      isActive ? "bg-white/8 font-semibold text-white" : "font-normal"
    }`;

  return (
    <nav className="flex items-center gap-8 font-montserrat 2xl:gap-10">
      <NavLink to="/home" className={desktopLinkClass} onClick={closeDropdowns}>
        Home
      </NavLink>
      <NavLink to="/explore" className={desktopLinkClass} onClick={closeDropdowns}>
        Explore
      </NavLink>

      <div className="relative" ref={profileRef}>
        <button
          className={desktopButtonClass}
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            setIsDepartmentOpen(false);
          }}
        >
          Profil
        </button>

        {isProfileOpen && (
          <div className={dropdownPanelClass}>
            <NavLink
              to="/himalkom"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Himalkom
            </NavLink>

            <div ref={departmentRef} className="relative">
              <button
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[0.98rem] leading-none text-white/82 transition-all duration-200 hover:bg-white/10 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDepartmentOpen(!isDepartmentOpen);
                }}
              >
                <span>Departemen</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isDepartmentOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isDepartmentOpen && (
                <div className="absolute left-full top-0 z-50 ml-3 min-w-60 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] p-2 shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl 2xl:min-w-64">
                  {divisions.length > 0 ? (
                    divisions.map((division) => (
                      <NavLink
                        key={division.id || division.slug}
                        to={`/division/${division.slug}`}
                        className={dropdownLinkClass}
                        onClick={closeDropdowns}
                      >
                        {division.abbreviation || division.name}
                      </NavLink>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-[0.95rem] italic text-white/60">
                      Loading...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={communityRef}>
        <button
          className={desktopButtonClass}
          onClick={() => setIsCommunityOpen(!isCommunityOpen)}
        >
          Komunitas
        </button>

        {isCommunityOpen && (
          <div className={dropdownPanelClass}>
            {communities.length > 0 ? (
              communities.map((community) => (
                <NavLink
                  key={community.id || community.slug}
                  to={`/community/${community.slug}`}
                  className={dropdownLinkClass}
                  onClick={closeDropdowns}
                >
                  {community.name}
                </NavLink>
              ))
            ) : (
              <p className="px-4 py-3 text-[0.95rem] italic text-white/60">
                Loading...
              </p>
            )}
          </div>
        )}
      </div>

      <div className="relative" ref={informasiRef}>
        <button
          className={desktopButtonClass}
          onClick={() => setIsInformasiOpen(!isInformasiOpen)}
        >
          Informasi
        </button>

        {isInformasiOpen && (
          <div className={dropdownPanelClass}>
            <NavLink
              to="/komnews"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Komnews
            </NavLink>

            <NavLink
              to="/galeri"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Galeri
            </NavLink>

            <NavLink
              to="/prestasi"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Prestasi
            </NavLink>

            <NavLink
              to="/riset"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Riset
            </NavLink>

            <NavLink
              to="/syntax"
              className={dropdownLinkClass}
              onClick={closeDropdowns}
            >
              Syntax
            </NavLink>
          </div>
        )}
      </div>

      <NavLink
        to="/megaproker"
        className={desktopLinkClass}
        onClick={closeDropdowns}
      >
        Megaproker
      </NavLink>
    </nav>
  );
};

export default NavMenu;
