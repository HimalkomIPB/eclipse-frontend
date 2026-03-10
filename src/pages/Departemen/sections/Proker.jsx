import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Program Kerja Section Component
 * Displays work programs of a department in an accordion format
 * 
 * @param {Object} props
 * @param {Array} props.proker - Work programs data
 * @returns {JSX.Element}
 */
const ProkerSection = ({ proker }) => {
    // Handle if proker is empty or null
    if (!proker || (Array.isArray(proker) && proker.length === 0)) {
        return <div className="text-center py-8 text-white/70">Program kerja belum tersedia</div>;
    }

    // State for tracking expanded accordion items
    const [expandedItems, setExpandedItems] = useState({});
    
    // Toggle accordion item expansion
    const toggleItem = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    return (
        <MotionReveal animation="fade-up" delay={0.3}>
            <div className="flex flex-col border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] p-6 md:p-4 rounded-2xl shadow-[0_18px_36px_rgba(2,14,26,0.22)] backdrop-blur-xl w-full max-w-6xl mx-auto">
                {proker.map((item, index) => (
                    <React.Fragment key={index}>
                        {/* Accordion header */}
                        <div 
                            className={`py-3 px-2 flex justify-between items-center cursor-pointer rounded-[7px] hover:bg-white/10 ${expandedItems[index] ? 'bg-white/10' : ''}`}
                            onClick={() => toggleItem(index)}
                        >
                            <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                            <span className={`transform transition-transform ${expandedItems[index] ? 'rotate-180' : ''}`}>
                                <FaAngleDown />
                            </span>
                        </div>
                        
                        {/* Accordion content */}
                        <div 
                            className={`transition-all duration-300 overflow-hidden rounded-[7px] ${
                                expandedItems[index] ? 'max-h-96 opacity-100 hover:bg-white/5' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-4 text-white/80">
                                <p>{item.description || 'Tidak ada deskripsi'}</p>
                            </div>
                        </div>
                        
                        {/* Divider except for last item */}
                        {index < proker.length - 1 && (
                            <hr className="border-white/10 my-1" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </MotionReveal>
    );
};

export default ProkerSection;
