"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { useLocale } from "./LocaleContext";
import useLocaleApi from "./Uselocaleapi";
import { Phone, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const STRAPI = "http://localhost:1337";

export default function OurTeam() {
  const { locale } = useLocale();
  const { data: team, loading } = useLocaleApi("/api/teams?populate=*");
  const swiperRef = useRef(null);

  function getTeamMember(member) {
    if (locale === "ar" && member.localizations?.length) {
      const ar = member.localizations.find((l) => l.locale === "ar");
      if (ar) return { name: ar.name, position: ar.position, email: member.email };
    }
    return { name: member.name, position: member.position, email: member.email };
  }

  function getImageUrl(member) {
    const img = member.image?.[0] || member.image;
    if (!img) return "";
    return STRAPI + (img.url);
  }

  if (loading) return null;

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="max-w-[1300px] mx-auto px-6 relative group">

        <div className="text-center mb-16">
          <span className="text-[#C8A96E] font-bold tracking-[3px] uppercase text-xs mb-3 block">
            {locale === "ar" ? "خبرائنا" : "Our Experts"}
          </span>
          <h2 className="text-4xl md:text-[42px] font-bold text-[#3B1F0E] mb-6 font-playfair">
            {locale === "ar" ? "فريقنا المتخصص" : "Meet Our Specialized Team"}
          </h2>
          <div className="w-24 h-1 bg-[#C8A96E] mx-auto mb-6"></div>
          <p className="text-[#3B1F0E]/60 max-w-2xl mx-auto text-base leading-relaxed font-dm-sans">
            {locale === "ar"
              ? "فريقنا يتميز بالخبرة والاحترافية لضمان تقديم أفضل الخدمات لعملائنا."
              : "Our team is characterized by experience and professionalism to ensure providing the best services to our clients."}
          </p>
        </div>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12 z-10 w-12 h-12 flex items-center justify-center bg-white text-[#3B1F0E] rounded-full shadow-lg border border-[#C8A96E]/20 hover:bg-[#C8A96E] hover:text-white transition-all duration-300 group"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M8.5 1.5L2 8L8.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 z-10 w-12 h-12 flex items-center justify-center bg-white text-[#3B1F0E] rounded-full shadow-lg border border-[#C8A96E]/20 hover:bg-[#C8A96E] hover:text-white transition-all duration-300 group"
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
            <path d="M1.5 1.5L8 8L1.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>


        <div className="px-2 md:px-4">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-12"
          >
            {team.map((member) => {
              const { name, position, email } = getTeamMember(member);
              return (
                <SwiperSlide key={member.id}>
                  <div className="group/card relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="w-full aspect-[3/4] overflow-hidden relative">
                      <img
                        src={getImageUrl(member)}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F0E] via-[#3B1F0E]/50 to-transparent opacity-0 group-hover/card:opacity-90 transition-opacity duration-300"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex justify-center gap-4">
                        <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C8A96E] hover:text-[#3B1F0E] transition-all duration-300">
                          <BsWhatsapp size={18} />
                        </a>
                        <a href={`mailto:${email}`} className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C8A96E] hover:text-[#3B1F0E] transition-all duration-300">
                          <Mail size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C8A96E] hover:text-[#3B1F0E] transition-all duration-300">
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>

                    <div className="p-6 text-center bg-white group-hover/card:bg-[#Fcfcfc] transition-colors relative z-10">
                      <h3 className="text-lg font-bold text-[#3B1F0E] mb-2 font-playfair group-hover/card:text-[#C8A96E] transition-colors">{name}</h3>
                      <p className="text-xs font-bold uppercase tracking-[1px] text-[#A1A1A1] group-hover/card:text-[#3B1F0E] transition-colors">{position}</p>
                    </div>

                    <div className="h-1 w-0 bg-[#C8A96E] group-hover/card:w-full transition-all duration-500 mx-auto"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}