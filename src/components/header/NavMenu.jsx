import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useFetchData } from "../../hooks/useAPI";

/**
 * Menu navigasi untuk desktop view
 */
const NavMenu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInformasiOpen, setIsInformasiOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData("divisions", baseUrl);
  const { data: communitiesData } = useFetchData("communities", baseUrl);

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
    "absolute left-0 top-full z-40 mt-4 min-w-60 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] p-2 shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl 2xl:min-w-64";

  const dropdownLinkClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-[0.98rem] leading-none text-white/82 transition-all duration-200 hover:bg-white/10 hover:text-white ${
      isActive ? "bg-white/8 font-semibold text-white" : "font-normal"
    }`;

  const panelTransition = {
    type: "spring",
    stiffness: 420,
    damping: 30,
    mass: 0.9,
  };

  const panelVariants = {
    hidden: { opacity: 0, y: -12, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.97 },
  };

  const sidePanelVariants = {
    hidden: { opacity: 0, x: -12, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -8, scale: 0.97 },
  };

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

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={panelTransition}
              className={dropdownPanelClass}
              style={{ transformOrigin: "top left" }}
            >
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

                <AnimatePresence>
                  {isDepartmentOpen && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={sidePanelVariants}
                      transition={panelTransition}
                      className="absolute left-full top-0 z-50 ml-3 min-w-60 rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] p-2 shadow-[0_18px_36px_rgba(3,14,26,0.28)] backdrop-blur-xl 2xl:min-w-64"
                      style={{ transformOrigin: "top left" }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative" ref={communityRef}>
        <button
          className={desktopButtonClass}
          onClick={() => setIsCommunityOpen(!isCommunityOpen)}
        >
          Komunitas
        </button>

        <AnimatePresence>
          {isCommunityOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={panelTransition}
              className={dropdownPanelClass}
              style={{ transformOrigin: "top left" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative" ref={informasiRef}>
        <button
          className={desktopButtonClass}
          onClick={() => setIsInformasiOpen(!isInformasiOpen)}
        >
          Informasi
        </button>

        <AnimatePresence>
          {isInformasiOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={panelTransition}
              className={dropdownPanelClass}
              style={{ transformOrigin: "top left" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
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
