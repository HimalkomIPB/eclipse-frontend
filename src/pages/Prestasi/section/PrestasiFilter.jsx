import React, { useState, useRef, useEffect } from "react";

const PrestasiFilter = ({
  categories,
  years,
  activeCategory,
  setActiveCategory,
  activeYear,
  setActiveYear,
}) => {
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div
        onClick={() => setActiveCategory("all")}
        className={`px-3 py-1 rounded-md cursor-pointer border border-white/12 bg-white/6 text-white/80 ${activeCategory === "all" ? "bg-white/14 text-white border-white/30" : "hover:bg-white/10 hover:text-white"
          }`}
      >
        All Category
      </div>

      {categories.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveCategory(item.name)}
          className={`px-3 py-1 rounded-md cursor-pointer border border-white/12 bg-white/6 text-white/80 ${activeCategory === item.name ? "bg-white/14 text-white border-white/30" : "hover:bg-white/10 hover:text-white"
            }`}
        >
          {item.name}
        </div>
      ))}

      <div className="relative ml-auto" ref={yearDropdownRef}>
        <button
          type="button"
          onClick={() => setYearDropdownOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1 border border-white/12 bg-white/6 text-white rounded-md cursor-pointer min-w-[100px] hover:bg-white/10"
        >
          {activeYear === "all" ? "All Years" : activeYear}
          <svg
            className={`w-4 h-4 transition-transform ${yearDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {yearDropdownOpen && (
          <div className="absolute left-0 mt-2 w-40 border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.96)_0%,rgba(14,41,59,0.96)_100%)] rounded-lg shadow-lg z-20 p-2 max-h-60 overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setActiveYear("all");
                setYearDropdownOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md cursor-pointer text-white/85 hover:bg-white/10 ${activeYear === "all" ? "font-semibold text-white" : ""
                }`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                type="button"
                key={year}
                onClick={() => {
                  setActiveYear(String(year));
                  setYearDropdownOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md cursor-pointer text-white/85 hover:bg-white/10 ${activeYear === String(year) ? "font-semibold text-white" : ""
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrestasiFilter;
