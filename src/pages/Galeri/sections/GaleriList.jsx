import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaUserFriends, FaGraduationCap } from "react-icons/fa";
import ReadMoreButton from "@/components/common/ReadMore";

/**
 * Gallery Card Component with enhanced design
 */
const GalleryCard = ({ gallery, baseUrl }) => {
  return (
    <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-[0_18px_36px_rgba(2,14,26,0.22)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
      {/* Image dengan link */}
      <Link to={`/galeri/${gallery.id}`}>
        <div className="w-full h-[220px] overflow-hidden relative group">
          <img 
            src={`${baseUrl}/storage/${gallery.image}`}
            alt={gallery.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder-news.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full text-white">
              <h3 className="font-bold text-lg">{gallery.name}</h3>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Info strip */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full border border-white/10">
            {gallery.subjectName || gallery.subject?.name}
          </span>
          <div className="flex items-center text-xs text-white/70">
            <FaGraduationCap className="mr-1" />
            <span>Angkatan {gallery.angkatan}</span>
          </div>
        </div>
        
        {/* Title */}
        <Link to={`/galeri/${gallery.id}`}>
          <h3 className="font-bold text-lg mb-2 text-white hover:text-white transition-colors">{gallery.name}</h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-white/75 mb-4 line-clamp-3 flex-1">
          {gallery.description}
        </p>
        
        {/* Contributors */}
        <div className="flex items-center text-xs text-white/70 mb-4">
          <FaUserFriends className="mr-2" size={14} />
          <span className="font-medium mr-1">Kontributor:</span> {gallery.contributor}
        </div>
        
        {/* Actions */}
        <div className="mt-auto pt-3 border-t border-white/10 flex justify-between items-center">
          {/* Ganti link dengan ReadMoreButton */}
          <ReadMoreButton to={`/galeri/${gallery.id}`} />
          
          {gallery.link && (
            <a 
              href={gallery.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition"
            >
              {gallery.link.includes('github.com') ? (
                <>
                  <FaGithub size={16} />
                  <span>GitHub</span>
                </>
              ) : (
                <>
                  <FaExternalLinkAlt size={14} />
                  <span>Website</span>
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Gallery Grid Component
 */
const GalleryGrid = ({ galleries, baseUrl }) => {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-12 border border-white/10 bg-white/5 rounded-lg">
        <p className="text-white/70">Tidak ada proyek yang tersedia untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleries.map((gallery, index) => (
        <GalleryCard 
          key={`gallery-${gallery.id || index}`}
          gallery={gallery}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
