import React from "react";
import MotionReveal from "@/components/common/MotionReveal";
import ReadMoreButton from "@/components/common/ReadMore";
import { stripHtml } from "@/utils/formatting";

const PrestasiList = ({ prestasi }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prestasi.length > 0 ? (
        prestasi.map((item) => (
          <MotionReveal
            animation="fade-up"
            key={item.id}
            delay={0.07}              
          >
            <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-[0_18px_36px_rgba(2,14,26,0.22)] backdrop-blur-xl flex flex-col h-full overflow-hidden">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src={item.bukti_url}
                  alt={item.nama}
                  className="w-full h-full object-cover"
                />

                <div className="absolute left-2 bottom-2 bg-white/10 text-white/80 text-[10px] px-2 py-1 rounded border border-white/10">
                  {item.kategori?.name}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-base line-clamp-2 mb-2 text-white">
                  {item.nama}
                </h4>

                <p className="text-xs text-white/70">{item.tahun}</p>

                <p className="text-xs text-white/75 line-clamp-3 my-2">
                  {stripHtml(item.deskripsi).substring(0, 120)}
                </p>

                <div className="mt-auto pt-2 flex">
                  <ReadMoreButton
                    to={`/prestasi/${item.id}`}
                    label="Selengkapnya"
                    newTab={false}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </MotionReveal>
        ))
      ) : (
        <div className="col-span-full text-center py-6 text-white/70">
          Tidak ada prestasi ditemukan
        </div>
      )}
    </div>
  );
};

export default PrestasiList;
