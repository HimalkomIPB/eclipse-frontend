import React from "react";

// Import custom hook
import { useFetchData } from "../../hooks/useAPI";

// Import reusable components
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from "@/components/common/MotionReveal";

// Import section
import HeroSection from "./section/HeroSection";
import MegaprokerSection from "./section/Megaproker";

const Megaproker = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data, loading, error } = useFetchData('megaprokers', baseUrl);
  const megaprokers = data?.megaprokers;

  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data megaproker..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!megaprokers) return <p className="text-center">Tidak ada data megaproker yang tersedia.</p>;
  
  return (
    <>
      {/* Hero Section */}
      <MotionReveal animation="fade-up">
        <HeroSection />
      </MotionReveal>

      {/* Megaproker */}
      <section className="w-full my-[150px] md:my-[300px] space-y-20">
        {megaprokers.map((megaprokers, index) => (
          <MotionReveal
            key={megaprokers.id || megaprokers.slug || `megaproker-${index}`}
            animation="fade-up"
            delay={0.2}
          >
            <MegaprokerSection 
              megaprokers={megaprokers} 
              index={index} 
              baseUrl={baseUrl} 
            />
          </MotionReveal>
        ))}
      </section>
    </>
  );
};

export default Megaproker;
