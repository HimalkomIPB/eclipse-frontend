import React, { useState, useRef, useEffect } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JawaraFilterBar = ({ search, setSearch, communities, selectedCommunities, setSelectedCommunities }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckbox = (slug) => {
    if (selectedCommunities.includes(slug)) {
      setSelectedCommunities(selectedCommunities.filter(s => s !== slug));
    } else {
      setSelectedCommunities([...selectedCommunities, slug]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Cari lomba, penyelenggara..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-white border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary-dark text-base shadow-sm"
      />
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 bg-primary-darker shadow-sm text-white text-base font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark min-w-[180px]"
        >
          {selectedCommunities.length === 0 ? "Filter Komunitas" : `${selectedCommunities.length} Komunitas dipilih`}
          <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {dropdownOpen && (
          <div className="absolute z-20 mt-2 w-64 max-h-72 overflow-y-auto bg-primary-darker border border-primary/30 rounded-xl shadow-lg p-3 flex flex-col gap-2 animate-fadeIn">
            {communities.map((kom) => (
              <label key={kom.slug} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-primary-light/20 ${selectedCommunities.includes(kom.slug) ? 'ring-2 ring-primary-dark bg-primary-light/20' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedCommunities.includes(kom.slug)}
                  onChange={() => handleCheckbox(kom.slug)}
                  className="accent-primary-dark"
                />
                {kom.logo && (
                  <img
                    src={`${BASE_URL}/storage/${kom.logo}`}
                    alt={kom.name}
                    className="w-6 h-6 rounded-full object-cover border border-primary/20 bg-white"
                  />
                )}
                <span className="font-semibold text-white text-sm">{kom.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JawaraFilterBar;
