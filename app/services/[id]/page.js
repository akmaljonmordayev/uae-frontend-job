"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useLocale } from "../../components/LocaleContext";
import useLocaleApi from "../../components/Uselocaleapi";

const STRAPI = "http://localhost:1337";

const getRandomText = (locale) => {
  const enSentences = [
    "We provide comprehensive legal consultations covering all legal aspects that our clients may encounter in their daily lives or business activities.",
    "Our goal is to offer accurate legal advice based on a deep understanding of local and international laws.",
    "We understand the importance of legal consultations for companies in building and enhancing their businesses.",
    "Establishing and registering companies is one of our key areas of expertise.",
    "Our team creates customized strategies to protect your interests in commercial disputes.",
    "Compliance with local and international laws and regulations is guaranteed.",
    "Family issues such as divorce, alimony, and custody are handled with sensitivity.",
    "Employment issues such as hiring and wrongful termination are resolved efficiently.",
    "Rehabilitation issues such as hiring and wrongful termination are handled professionally.",
    "Criminal cases and defending personal rights are core areas of our practice."
  ];

  const arSentences = [
    "نحن نقدم استشارات قانونية شاملة تغطي جميع الجوانب القانونية التي قد يواجهها عملاؤنا في حياتهم اليومية أو أنشطتهم التجارية.",
    "هدفنا هو تقديم مشورة قانونية دقيقة تستند إلى فهم عميق للقوانين المحلية والدولية.",
    "نحن نتفهم أهمية الاستشارات القانونية للشركات في بناء وتعزيز أعمالها.",
    "تأسيس وتسجيل الشركات هو أحد مجالات خبرتنا الرئيسية.",
    "يقوم فريقنا بإنشاء استراتيجيات مخصصة لحماية مصالحك في النزاعات التجارية.",
    "الامتثال للقوانين واللوائح المحلية والدولية مضمون.",
    "يتم التعامل مع قضايا الأسرة مثل الطلاق والنفقة والحضانة بحساسية.",
    "يتم حل قضايا التوظيف مثل التوظيف والفصل التعسفي بكفاءة.",
    "يتم التعامل مع قضايا إعادة التأهيل بشكل مهني.",
    "القضايا الجنائية والدفاع عن الحقوق الشخصية هي مجالات أساسية في ممارستنا."
  ];

  const source = locale === "ar" ? arSentences : enSentences;
  const paragraphs = [];
  for (let i = 0; i < 4; i++) {
    const shuffled = [...source].sort(() => 0.5 - Math.random());
    paragraphs.push(shuffled.slice(0, 3).join(" "));
  }
  return paragraphs;
};

const getRandomBullets = (locale) => {
  const enBullets = [
    "Establishing and registering companies",
    "Review of contracts and agreements",
    "Commercial disputes",
    "Compliance with local and international laws and regulations",
    "Family issues such as divorce, alimony, and custody",
    "Employment issues such as hiring and wrongful termination",
    "Criminal cases and defending personal rights",
    "Real estate transactions and property disputes",
    "Intellectual property protection",
    "Banking and financial regulations"
  ];

  const arBullets = [
    "تأسيس وتسجيل الشركات",
    "مراجعة العقود والاتفاقيات",
    "النزاعات التجارية",
    "الامتثال للقوانين واللوائح المحلية والدولية",
    "قضايا الأسرة مثل الطلاق والنفقة والحضانة",
    "قضايا التوظيف مثل التوظيف والفصل التعسفي",
    "القضايا الجنائية والدفاع عن الحقوق الشخصية",
    "المعاملات العقارية ونزاعات الملكية",
    "حماية الملكية الفكرية",
    "اللوائح المصرفية والمالية"
  ];

  const source = locale === "ar" ? arBullets : enBullets;
  const shuffled = [...source].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

export default function ServiceDetail({ params }) {
  const { locale } = useLocale();
  const { data: service, loading } = useLocaleApi(`/api/services/${params.id}?populate=*`);
  const [randomContent, setRandomContent] = useState([]);
  const [corporateBullets, setCorporateBullets] = useState([]);
  const [individualBullets, setIndividualBullets] = useState([]);

  const staticContent = {
    en: {
      back: "Back",
      general: "General Legal Consultations",
      corporate: "Corporate Legal Consultations",
      individual: "Individual Legal Consultations",
      corporateIntro: "We at the Law Firm understand the importance of legal consultations for companies in building and enhancing their businesses.",
      corporateSubIntro: "Our advisory services about:",
      individualIntro: "Law Firm offers customized advisory services for individuals, including:",
      conclusion: "At Law Firm, we aim to provide the best legal services to ensure your rights and offer effective legal solutions. Contact us today to receive professional and comprehensive legal consultation.",
      readMore: "Read more",
      contacts: "Contacts"
    },
    ar: {
      back: "عودة",
      general: "الاستشارات القانونية العامة",
      corporate: "الاستشارات القانونية للشركات",
      individual: "الاستشارات القانونية للأفراد",
      corporateIntro: "نحن في مكتب المحاماة نتفهم أهمية الاستشارات القانونية للشركات في بناء وتعزيز أعمالها.",
      corporateSubIntro: "خدماتنا الاستشارية حول:",
      individualIntro: "يقدم مكتب المحاماة خدمات استشارية مخصصة للأفراد، تشمل:",
      conclusion: "في مكتب المحاماة، نهدف إلى تقديم أفضل الخدمات القانونية لضمان حقوقك وتقديم حلول قانونية فعالة. اتصل بنا اليوم للحصول على استشارة مهنية وشاملة.",
      readMore: "اقرأ المزيد",
      contacts: "تواصل معنا"
    }
  };

  const text = staticContent[locale] || staticContent.en;

  useEffect(() => {
    setRandomContent(getRandomText(locale));
    setCorporateBullets(getRandomBullets(locale));
    setIndividualBullets(getRandomBullets(locale));
  }, [locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#C8A96E]/30 border-t-[#C8A96E] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#3B1F0E]">
        <p>{locale === "ar" ? "الخدمة غير موجودة" : "Service not found"}</p>
      </div>
    );
  }

  const getServiceData = (srv) => {
    if (locale === "ar" && srv.localizations?.length) {
      const ar = srv.localizations.find((l) => l.locale === "ar");
      if (ar) return { title: ar.text };
    }
    return { title: srv.text };
  };

  const { title } = getServiceData(service);

  const bgUrl = service.image?.url
    ? STRAPI + service.image.url
    : service.image?.[0]?.url
      ? STRAPI + service.image[0].url
      : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

  return (
    <main className="bg-[#FDFBF7] min-h-screen flex flex-col" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

      <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={bgUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-[#3B1F0E]/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1008]/80 via-transparent to-[#1E1008]/40"></div>
        </div>

        <div className="relative z-10 max-w-[1300px] mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
            <span className="text-[#C8A96E] font-bold tracking-[3px] uppercase text-sm">
              {locale === "ar" ? "تفاصيل الخدمة" : "Service Details"}
            </span>
            <div className="w-10 h-[2px] bg-[#C8A96E]"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F0E6D3] font-playfair leading-[1.1]">
            {title}
          </h1>
        </div>
      </section>

      <div className="bg-white border-b border-[#C8A96E]/10 py-4">
        <div className="max-w-[1000px] mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#3B1F0E]/60 hover:text-[#C8A96E] font-medium text-sm transition-colors duration-300"
          >
            <ChevronRight size={16} className={locale === 'ar' ? '' : 'rotate-180'} />
            {text.back}
          </Link>
        </div>
      </div>

      <section className="flex-1 py-16 md:py-24">
        <div className="max-w-[1000px] mx-auto px-6">

          <h2 className="text-3xl md:text-5xl font-bold text-[#3B1F0E] font-playfair mb-10 pb-6 border-b border-[#C8A96E]/20">
            {title}
          </h2>

          <div className="text-[#3B1F0E]/70 text-base leading-relaxed mb-14 font-dm-sans">
            <p>{randomContent[0]}</p>
          </div>

          <div className="mb-14">
            <h3 className="text-xl md:text-2xl font-bold text-[#3B1F0E] font-playfair mb-5 pb-3 border-b border-[#C8A96E]/15 underline underline-offset-8 decoration-[#C8A96E]/30">
              {text.general}
            </h3>
            <div className="flex items-start gap-3 mt-5">
              <CheckCircle size={20} className="text-[#C8A96E] shrink-0 mt-0.5" />
              <p className="text-[#3B1F0E]/70 text-base leading-relaxed">
                {randomContent[1]}
              </p>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-xl md:text-2xl font-bold text-[#3B1F0E] font-playfair mb-5 pb-3 border-b border-[#C8A96E]/15 underline underline-offset-8 decoration-[#C8A96E]/30">
              {text.corporate}
            </h3>
            <div className="flex items-start gap-3 mt-5">
              <CheckCircle size={20} className="text-[#C8A96E] shrink-0 mt-0.5" />
              <p className="text-[#3B1F0E]/70 text-base leading-relaxed">
                {text.corporateIntro}
              </p>
            </div>
            <p className="text-[#3B1F0E]/80 text-sm font-semibold mt-6 mb-3 ml-8">
              {text.corporateSubIntro}
            </p>
            <ul className="space-y-2.5 ml-8">
              {corporateBullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-[#3B1F0E]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B1F0E]/40 shrink-0"></span>
                  <span className="text-sm md:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-14">
            <h3 className="text-xl md:text-2xl font-bold text-[#3B1F0E] font-playfair mb-5 pb-3 border-b border-[#C8A96E]/15 underline underline-offset-8 decoration-[#C8A96E]/30">
              {text.individual}
            </h3>
            <div className="flex items-start gap-3 mt-5">
              <CheckCircle size={20} className="text-[#C8A96E] shrink-0 mt-0.5" />
              <p className="text-[#3B1F0E]/70 text-base leading-relaxed">
                {text.individualIntro}
              </p>
            </div>
            <ul className="space-y-2.5 mt-4 ml-8">
              {individualBullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3 text-[#3B1F0E]/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B1F0E]/40 shrink-0"></span>
                  <span className="text-sm md:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 mb-10">
            <p className="text-[#3B1F0E]/70 text-base leading-relaxed italic">
              {text.conclusion}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-[#3B1F0E] text-[#F0E6D3] font-semibold text-sm rounded hover:bg-[#2A1508] transition-colors duration-300">
              {text.readMore}
            </button>
            <button className="px-8 py-3 border border-[#3B1F0E]/30 text-[#3B1F0E] font-semibold text-sm rounded hover:bg-[#3B1F0E] hover:text-[#F0E6D3] transition-colors duration-300">
              {text.contacts}
            </button>
          </div>

        </div>
      </section>

    </main>
  );
}
