"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useLocale } from "./LocaleContext";
import useLocaleApi from "./Uselocaleapi";
import { ArrowLeft, ArrowRight } from "lucide-react";

const STRAPI = "http://localhost:1337";

function getSlideText(item, locale) {
  if (locale === "ar" && item.localizations?.length) {
    const ar = item.localizations.find((l) => l.locale === "ar");
    if (ar) return { title: ar.title, desc: ar.desc };
  }
  return { title: item.title, desc: item.desc };
}

function getBgUrl(item) {
  const bg = item.heroBg?.[0];
  if (!bg) return "";
  return STRAPI + (bg.formats?.large?.url || bg.url);
}

export default function HeroSlider() {
  const { locale } = useLocale();
  const { data: slides, loading } = useLocaleApi("/api/here-section-datas?populate=*");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperInstance = useRef(null);

  useEffect(() => {
    const sw = swiperInstance.current;
    if (sw && typeof sw.slideTo === "function") {
      sw.slideTo(0);
    }
    setActiveIndex(0);
  }, [slides]);

  const goTo = (idx) => {
    const sw = swiperInstance.current;
    if (sw && typeof sw.slideTo === "function") sw.slideTo(idx);
  };
  const goPrev = () => {
    const sw = swiperInstance.current;
    if (sw && typeof sw.slidePrev === "function") sw.slidePrev();
  };
  const goNext = () => {
    const sw = swiperInstance.current;
    if (sw && typeof sw.slideNext === "function") sw.slideNext();
  };

  if (loading || slides.length === 0) {
    return (
      <div className="w-full h-screen bg-[#2A1508] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin"></div>
          <div className="text-[#C8A96E]/60 text-sm tracking-[3px] uppercase animate-pulse">
            {locale === "ar" ? "جاري التحميل..." : "Loading..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[calc(100vh)] min-h-[600px] overflow-hidden bg-[#1E1008]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Swiper
        onSwiper={(sw) => { swiperInstance.current = sw; }}
        modules={[Autoplay, EffectFade]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={slides.length > 1}
        speed={1500}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full h-full"
      >
        {slides.map((item, idx) => {
          const { title, desc } = getSlideText(item, locale);
          const bgUrl = getBgUrl(item);
          const isActive = idx === activeIndex;

          return (
            <SwiperSlide key={item.id} className="relative w-full h-full">
              {bgUrl && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={bgUrl}
                    alt=""
                    className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear
                        ${isActive ? "scale-110" : "scale-100"}`}
                  />
                </div>
              )}

              <div className="absolute inset-0 z-10 bg-black/60" />
              <div className="absolute inset-0 z-10 bg-[#3B1F0E]/40 mix-blend-multiply" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1E1008]/90 via-[#1E1008]/30 to-[#1E1008]/50" />

              <div className="relative z-20 h-full max-w-[1000px] mx-auto px-6 flex flex-col items-center justify-center text-center">

                <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-300 transform ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                  <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
                  <span className="text-[#C8A96E] uppercase tracking-[4px] text-xs font-bold">
                    UAE Jobs
                  </span>
                  <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
                </div>

                <h1
                  className={`text-[#F0E6D3] text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 font-playfair transition-all duration-1000 delay-200 transform
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  {title}
                </h1>

                <p
                  className={`text-[#F0E6D3]/70 text-base md:text-lg leading-relaxed mb-10 max-w-2xl transition-all duration-1000 delay-500 transform
                      ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  {desc}
                </p>

                <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-700 transform ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                  <button className="px-8 py-3.5 bg-[#C8A96E] text-[#1E1008] rounded-full font-bold text-sm tracking-wide hover:bg-[#B08D55] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(200,169,110,0.3)]">
                    {locale === "ar" ? "اقرأ المزيد" : "Read More"}
                  </button>
                  <button className="px-8 py-3.5 border border-[#F0E6D3]/30 text-[#F0E6D3] rounded-full font-bold text-sm tracking-wide hover:bg-[#F0E6D3]/10 hover:border-[#F0E6D3] transition-all duration-300">
                    {locale === "ar" ? "اتصل بنا" : "Contact Us"}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="absolute bottom-12 right-12 z-30 hidden md:flex gap-4">
          <button
            onClick={goPrev}
            className="w-14 h-14 rounded-full border border-[#F0E6D3]/20 flex items-center justify-center text-[#F0E6D3] hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-[#1E1008] transition-all duration-300 group"
          >
            <ArrowLeft size={24} className={`group-hover:-translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={goNext}
            className="w-14 h-14 rounded-full border border-[#F0E6D3]/20 flex items-center justify-center text-[#F0E6D3] hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-[#1E1008] transition-all duration-300 group"
          >
            <ArrowRight size={24} className={`group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === idx ? "w-8 bg-[#C8A96E]" : "w-2 bg-[#F0E6D3]/30 hover:bg-[#F0E6D3]/60"}`}
            />
          ))}
        </div>
      </Swiper>
    </section>
  );
}
