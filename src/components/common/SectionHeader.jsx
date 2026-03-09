import React from 'react';
import TImages from '../../utils/images';

/**
 * Header untuk setiap section dengan judul dan garis dekoratif
 * @param {string} title - Judul section
 * @param {string} altText - Alt text untuk gambar
 */
const SectionHeader = ({ title }) => (
  <div className='flex flex-col items-center mb-10 lg:mb-10'>
    <h1 className="text-white font-bold text-center text-5xl lg:text-6xl leading-tight">{title}</h1>
  </div>
);

export default SectionHeader;