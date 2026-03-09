import React from "react";

/**
 * Gallery Filter Component
 * 
 * @param {Object} props
 * @param {Array} props.subjects - Available subjects
 * @param {string|number} props.activeSubject - Currently active subject
 * @param {Function} props.setActiveSubject - Function to change active subject
 * @returns {JSX.Element}
 */
const GaleriFilter = ({ subjects, activeSubject, setActiveSubject }) => {
  if (!subjects || subjects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Daftar Mata Kuliah</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {/* All subjects option */}
        <button
          onClick={() => setActiveSubject('all')}
          className={`px-3 py-2 rounded-md cursor-pointer transition-colors border border-white/12 bg-white/6 text-white/80
            ${activeSubject === 'all' 
              ? 'bg-white/14 text-white border-white/30 font-medium' 
              : 'hover:bg-white/10 hover:text-white'
            }`}
        >
          Semua
        </button>

        {/* Dynamic subjects */}
        {subjects.map((subject) => (
          <button
            key={`subject-${subject.id}`}
            className={`px-3 py-2 rounded-md cursor-pointer transition-colors border border-white/12 bg-white/6 text-white/80
              ${activeSubject === subject.id || activeSubject === subject.name
                ? 'bg-white/14 text-white border-white/30 font-medium' 
                : 'hover:bg-white/10 hover:text-white'
              }`}
            onClick={() => setActiveSubject(subject.id)}
          >
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GaleriFilter;
