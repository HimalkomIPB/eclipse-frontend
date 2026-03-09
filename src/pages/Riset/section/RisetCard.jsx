import React from "react";
import MotionReveal from '@/components/common/MotionReveal';
import ReadMoreButton from "@/components/common/ReadMore";

const Card = ({ research, baseUrl }) => {

  // Create a function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const title = research.title || '';
  const truncatedTitle = truncateText(title, 61);

  return (
  <div className="rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-[0_18px_36px_rgba(2,14,26,0.22)] flex flex-col w-[177px] h-[380px] sm:w-[250px] sm:h-[460px] lg:w-[370px] lg:h-[650px] gap-2">
    <div className="">
      <img 
        src={`${baseUrl}/storage/${research.image}`}
        alt={research.title} 
        className="w-full h-[220px] sm:h-[300px] md:h-[300px] lg:h-[450px] rounded-2xl"
      />
    </div>
    <div className="justify-evenly p-2 lg:p-4">
      <div className="h-15 lg:h-22 text-start">
        <h1 className="font-medium text-[13px] lg:text-xl text-white">
          <span className="lg:hidden">{truncatedTitle}</span>
          <span className="hidden lg:block">{research.title}</span>
        </h1>
        <p className="font-light text-[15px] lg:text-xl text-white/70">{research.year}</p>
      </div>
      <div className="place-items-start pt-8 lg:py-9">
        <ReadMoreButton to={research.link}/>
      </div>
    </div>
  </div>
  );
};

const RisCard = ({ data, baseUrl }) => {
  return (
      <div className="justify-items-center mx-auto max-w-6xl gap-y-4 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[50px] lg:pt-[70px]">
        {data.research.map((research, index) => (
          <MotionReveal key={research.id} animation="fade-up" delay={0.1 + (index * 0.05)}>
            <Card 
              key={research.id}
              research={research} 
              baseUrl={baseUrl}
            />
          </MotionReveal>
       ))}
      </div>
  );
};

export default RisCard;
