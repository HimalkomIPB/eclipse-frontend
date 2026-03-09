import React from 'react';
import TImages from '../../utils/images';

/**
 * Header untuk setiap section dengan judul dan garis dekoratif
 * @param {string} title - Judul section
 * @param {string} altText - Alt text untuk gambar
 */
const SectionHeader = ({ title }) => (
  <div className='mb-6 flex flex-col items-center md:mb-8'>
    <h1 className="text-center text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">{title}</h1>
  </div>
);

export default SectionHeader;
