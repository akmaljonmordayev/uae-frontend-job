"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import { useLocale } from "./LocaleContext";
import useLocaleApi from "./Uselocaleapi";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

const STRAPI = "http://localhost:1337";

export default function ClientTestimonials() {
  const { locale } = useLocale();
  const { data: testimonials, loading } = useLocaleApi("/api/clients?populate=*");
  const swiperRef = useRef(null);

  function getTestimonial(client) {
    if (locale === "ar" && client.localizations?.length) {
      const ar = client.localizations.find((l) => l.locale === "ar");
      if (ar) {
        return {
          name: ar.name,
          desc: ar.desc?.[0]?.children?.[0]?.text || "",
          company: ar.company,
        };
      }
    }
    return {
      name: client.name,
      desc: client.desc?.[0]?.children?.[0]?.text || "",
      company: client.company,
    };
  }

  function getImageUrl(client) {
    const img = client.image?.[0];
    if (!img) return "";
    return STRAPI + (img.formats?.medium?.url || img.url);
  }

  if (loading) {
    return (
      <section className="py-20 bg-[#2A1508]">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#1E1008] relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#C8A96E]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#3B1F0E]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">

          <div className="w-full md:w-1/3 pt-10">
            <span className="text-[#C8A96E] font-bold tracking-[3px] uppercase text-xs mb-4 block">
              {locale === "ar" ? "آراء العملاء" : "Testimonials"}
            </span>
            <h2 className="text-4xl md:text-[48px] leading-tight font-bold text-[#F0E6D3] mb-8 font-playfair">
              {locale === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
            </h2>
            <div className="w-20 h-1.5 bg-[#C8A96E] mb-8 rounded-full"></div>
            <p className="text-[#F0E6D3]/60 text-base leading-relaxed font-dm-sans mb-12">
              {locale === "ar"
                ? "نفتخر بثقة عملائنا ونسعى دائماً لتقديم الأفضل لهم."
                : "We take pride in our clients' trust and always strive to provide the best for them. See what they have to say about our services."}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-14 h-14 rounded-full border border-[#F0E6D3]/10 text-[#F0E6D3] flex items-center justify-center hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-[#1E1008] transition-all duration-300 group"
              >
                <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-14 h-14 rounded-full border border-[#F0E6D3]/10 text-[#F0E6D3] flex items-center justify-center hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-[#1E1008] transition-all duration-300 group"
              >
                <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Autoplay, EffectCreative]}
              effect={'creative'}
              creativeEffect={{
                prev: {
                  translate: [0, 0, -400],
                  opacity: 0,
                },
                next: {
                  translate: ['100%', 0, 0],
                },
              }}
              slidesPerView={1}
              loop={testimonials.length > 1}
              speed={1000}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              className="w-full"
            >
              {testimonials.map((client) => {
                const { name, desc, company } = getTestimonial(client);
                const imageUrl = getImageUrl(client);

                return (
                  <SwiperSlide key={client.id}>
                    <div className="bg-[#2A1508] p-8 md:p-12 rounded-3xl relative border border-[#F0E6D3]/5 shadow-2xl">
                      <Quote size={60} className="text-[#C8A96E]/20 absolute top-8 right-8 rotate-180" />

                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full p-1 bg-gradient-to-br from-[#C8A96E] to-[#8B6914]">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2A1508]">
                            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                          </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-1 mb-6 text-[#F0E6D3]/40 text-xs tracking-widest uppercase font-bold">
                            <span>★★★★★</span>
                            <span>5.0</span>
                          </div>

                          <p className="text-xl md:text-2xl leading-relaxed text-[#F0E6D3] font-light italic mb-8">
                            "{desc}"
                          </p>

                          <div>
                            <h3 className="text-xl font-bold text-white font-playfair mb-1">{name}</h3>
                            <p className="text-sm text-[#C8A96E] uppercase tracking-wider font-bold">{company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}