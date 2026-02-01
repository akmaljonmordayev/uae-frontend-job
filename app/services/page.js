"use client";

import Link from "next/link";
import { useLocale } from "../components/LocaleContext";
import useLocaleApi from "../components/Uselocaleapi";
import { ArrowRight } from "lucide-react";

const STRAPI = "http://localhost:1337";

export default function ServicesPage() {
  const { locale } = useLocale();
  const { data: services, loading } = useLocaleApi("/api/services?populate=*");

  const text = {
    en: {
      subtitle: "Our Services",
      title: "Legal Consultation Services",
      desc: "Law Firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies. Our mission is to provide comprehensive and specialized legal support to meet our clients needs.",
      viewDetails: "View Details",
    },
    ar: {
      subtitle: "خدماتنا",
      title: "خدمات الاستشارات القانونية",
      desc: "مكتب المحاماة هو أحد المكاتب القانونية الرائدة التي تقدم خدمات استشارية استثنائية للأفراد والشركات. مهمتنا هي تقديم دعم قانوني شامل ومتخصص لتلبية احتياجات عملائنا.",
      viewDetails: "عرض التفاصيل",
    },
  };

  const t = text[locale] || text.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-[#FDFBF7] min-h-screen flex flex-col" dir={locale === "ar" ? "rtl" : "ltr"}>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55"></div>
          <div className="absolute inset-0 bg-[#3B1F0E]/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1008]/80 via-transparent to-[#1E1008]/40"></div>
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
            <span className="text-[#C8A96E] font-bold tracking-[3px] uppercase text-sm">
              {t.subtitle}
            </span>
            <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F0E6D3] font-playfair leading-[1.1]">
            {t.title}
          </h1>
          <p className="mt-6 text-[#F0E6D3]/70 text-base md:text-lg max-w-2xl leading-relaxed">
            {t.desc}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="flex-1 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(services) && services.map((service) => {
              const getTitle = () => {
                if (locale === "ar" && service.localizations?.length) {
                  const ar = service.localizations.find((l) => l.locale === "ar");
                  if (ar) return ar.text;
                }
                return service.text;
              };

              const imgUrl = service.image?.url
                ? STRAPI + service.image.url
                : service.image?.[0]?.url
                  ? STRAPI + service.image[0].url
                  : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop";

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.documentId}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#C8A96E]/10 hover:border-[#C8A96E]/30"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={getTitle()}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F0E]/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#3B1F0E] font-playfair mb-3 group-hover:text-[#C8A96E] transition-colors">
                      {getTitle()}
                    </h3>
                    <div className="flex items-center gap-2 text-[#C8A96E] text-sm font-semibold">
                      <span>{t.viewDetails}</span>
                      <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${locale === "ar" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
