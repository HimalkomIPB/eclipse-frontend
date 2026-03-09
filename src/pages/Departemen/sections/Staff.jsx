import React from 'react';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Arranges staff members for grid layout
 * Places department head (ketua) in the center of first row (index 1)
 * 
 * @param {Object} ketua - Department head data
 * @param {Array} regularStaff - Regular staff members data
 * @returns {Array} Arranged staff for grid display
 */
const arrangeStaffForGrid = (ketua, regularStaff) => {
  // No staff or only regular staff
  if (!regularStaff?.length) return ketua ? [ketua] : [];
  if (!ketua) return regularStaff;

  // Always place ketua in the middle of first row (index 1)
  if (regularStaff.length === 0) {
    return [null, ketua, null].filter(Boolean);
  } else if (regularStaff.length === 1) {
    return [regularStaff[0], ketua, null].filter(Boolean);
  } else {
    // For any number of regular staff, always place ketua at index 1
    return [
      regularStaff[0],
      ketua,
      regularStaff[1],
      ...regularStaff.slice(2)
    ];
  }
};

/**
 * Staff Card Component
 * Displays individual staff member information
 */
const StaffCard = ({ staff, baseUrl }) => {
  return (
    <div className="shadow-card bg-white rounded-2xl mx-2 md:mx-8 p-4 flex flex-col items-center text-center w-[150px] sm:w-[160px] md:w-[240px] min-h-[220px] sm:min-h-[250px] md:min-h-[300px]">
      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
        <img
          src={staff.image ? `${baseUrl}/storage/${staff.image}` : '/images/avatar-placeholder.png'}
          alt={staff.name || 'Staff Member'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/avatar-placeholder.png';
          }}
        />
      </div>
      
      {/* Container untuk teks dengan height yang konsisten */}
      <div className="mt-4 w-full flex-1 flex flex-col justify-start">
        <h3 className="font-semibold text-base md:text-lg lg:text-xl text-white">
          {staff.jabatan || 'Staff'}
        </h3>
        <p className="text-white text-xs md:text-sm lg:text-base mt-1">
          {staff.name || 'Unnamed'}
        </p>
      </div>
    </div>
  );
};

/**
 * Staff Section Component
 * Displays department staff with desktop grid and mobile grid layout
 * 
 * @param {Object} props
 * @param {Array} props.staff - Staff members data
 * @param {string} props.baseUrl - API base URL
 * @returns {JSX.Element}
 */
const StaffSection = ({ staff, baseUrl }) => {
  if (!staff || staff.length === 0) {
    return <p className="text-center text-white text-xl">No staff data available.</p>;
  }

  // Separate department head from regular staff
  const ketua = staff.find(member => member.isKetua == 1);
  const regularStaff = staff.filter(member => member.isKetua != 1);
  
  // Prepare data for desktop grid
  const gridStaff = arrangeStaffForGrid(ketua, regularStaff);
  
  // Layout styling for desktop grid
  const getCardPositionClass = (index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    
    if (column === 1) { // Middle column
      // First row, middle position (department head) - shift up
      if (row === 0) return '-translate-y-20';
      
      // All other rows, middle position - shift down
      return 'translate-y-20';
    }
    
    return '';
  };

  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="flex flex-col text-white items-center max-w-6xl mx-auto py-12">

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden text-white md:grid grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
          {gridStaff.map((staffMember, index) => (
            <div 
              key={staffMember.id || `staff-grid-${index}`}
              className={`flex justify-center text-white ${getCardPositionClass(index)}`}
            >
              <StaffCard staff={staffMember} baseUrl={baseUrl} />
            </div>
          ))}
        </div>

        {/* Mobile Grid Layout - only visible on mobile */}
        <div className="md:hidden w-full px-4">
          {/* Ketua Row (Center aligned) */}
          {ketua && (
            <div className="flex justify-center mb-8">
              <StaffCard staff={ketua} baseUrl={baseUrl} />
            </div>
          )}
          
          {/* Regular Staff (2 columns grid) */}
          <div className="grid text-white grid-cols-2 gap-y-8 justify-items-center">
            {regularStaff.map((staffMember, index) => (
              <div key={staffMember.id}>
                <StaffCard staff={staffMember} baseUrl={baseUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionReveal>
  );
};

export default StaffSection;