import React, { useState, useEffect } from "react";
// Import custom hooks
import { useFetchData } from "@/hooks/useAPI";
import LoadingSpinner from "@/components/common/LoadingSpinner";
// Import reusable components
import MotionReveal from "@/components/common/MotionReveal";
import Pagination from "@/components/common/Pagination";
// Import sections
import HeroSection from "./section/HeroSection";
import SynCard from "./section/SyntaxCard";

const NAMA_MODEL = "syntaxes";

const Syntax = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const endpoint = `${NAMA_MODEL}?page=${currentPage}&limit=${itemsPerPage}`;
  const { data, loading, error } = useFetchData(endpoint, baseUrl);

  const dataList = data ? data[NAMA_MODEL] : [];
  const totalPages = data?.pagination?.last_page || 1;
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <LoadingSpinner
        variant="page"
        size="large"
        message="Memuat data syntax..."
      />
    );

  if (error)
    return (
      <div className="mx-auto mt-24 max-w-xl rounded-lg border border-red-400/30 bg-red-500/10 px-6 py-6 text-center text-red-100">
        <p className="font-semibold">Gagal memuat data syntax.</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );

  return (
    <div className="w-full">
      <MotionReveal animation="fade-up">
        <HeroSection />
      </MotionReveal>

      <section className="px-4 flex flex-col items-center text-center mt-12 md:mt-16 lg:mt-20 mb-[130px] md:mb-[150px] lg:mb-[220px]">
        {dataList && dataList.length > 0 ? (
          <>
            <SynCard data={{ [NAMA_MODEL]: dataList }} baseUrl={baseUrl} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <p className="text-center text-white/70">
            Tidak ada data syntax untuk ditampilkan.
          </p>
        )}
      </section>
    </div>
  );
};

export default Syntax;
