import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Section = () => {
  return (
    <div className="mx-4 mb-4 mt-10 rounded-[1.5rem] border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] text-white shadow-[0_18px_40px_rgba(2,14,26,0.24)] backdrop-blur-xl sm:mx-6 sm:mt-12 lg:mx-8 lg:mt-16 xl:mx-10">
      <div className="flex flex-col justify-between gap-5 px-4 py-5 font-montserrat text-[0.82rem] text-white/82 sm:px-6 sm:py-6 md:flex-row md:items-start md:gap-8 md:text-[0.95rem] lg:px-8 xl:px-10">
        <div className="max-w-xl leading-6 md:leading-7">
          <p>
            Jl. Meranti Wing 20 Kampus IPB,<br />
            Babakan, Kec. Dramaga, Kabupaten Bogor,<br />
            Jawa Barat 16680
          </p>
        </div>

        <div className="leading-6 md:text-right md:leading-7">
          <p>
            Email:{' '}
            <a
              href="mailto:himalkom@apps.ipb.ac.id"
              className="text-white transition hover:text-white hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              himalkom@apps.ipb.ac.id
            </a>
            <br />
            Phone:{' '}
            <a
              href="https://wa.me/6285155391409"
              className="text-white transition hover:text-white hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              +62 851-5539-1409
            </a>
          </p>
        </div>
      </div>

      <div className="mx-4 border-t border-white/10 sm:mx-6 lg:mx-8 xl:mx-10"></div>

      <div className="relative flex flex-col items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 md:flex-row md:justify-between lg:px-8 xl:px-10">
        <div className="flex items-center gap-2.5 text-white/72 sm:gap-3">
          <a
            href="https://www.facebook.com/himalkom/?locale=id_ID"
            className="rounded-full border border-white/10 bg-white/5 p-1.5 transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:p-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook size={17} />
          </a>
          <a
            href="https://www.instagram.com/himalkomipb/"
            className="rounded-full border border-white/10 bg-white/5 p-1.5 transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:p-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={17} />
          </a>
          <a
            href="https://twitter.com/HimalkomIPB"
            className="rounded-full border border-white/10 bg-white/5 p-1.5 transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:p-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter size={17} />
          </a>
          <a
            href="https://www.youtube.com/@himalkomipb4653"
            className="rounded-full border border-white/10 bg-white/5 p-1.5 transition hover:border-white/40 hover:bg-white/10 hover:text-white sm:p-2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube size={17} />
          </a>
        </div>

        <div className="text-center font-montserrat text-[11px] font-medium tracking-[0.02em] text-white/52 sm:text-xs md:text-right">
          <p>
            Copyright © Himalkom 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
