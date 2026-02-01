"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Twitter, Facebook, Globe, Send, Phone, MapPin } from 'lucide-react';
import { useLocale } from "./LocaleContext";

const Footer = () => {
  const { locale } = useLocale();
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      emailPlaceholder: "Enter your email address",
      subscribe: "Subscribe",
      subscribing: "Subscribing...",
      contacts: "Contact Us",
      about: "About Us",
      aboutDesc: "Leading the way in premium services across the UAE. We are dedicated to excellence and customer satisfaction.",
      strategy: "Our Strategy",
      advantages: "Our Advantages",
      responsibility: "Social Responsibility",
      services: "Our Services",
      quickLinks: "Quick Links",
      copyright: "© 2024. All rights reserved.",
      invalidEmail: "Invalid email format",
      requiredEmail: "Email is required",
      success: "Successfully subscribed!",
      error: "Subscription failed.",
      networkError: "Network error."
    },
    ar: {
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      subscribe: "اشترك",
      subscribing: "جاري الاشتراك...",
      contacts: "اتصل بنا",
      about: "من نحن",
      aboutDesc: "رواد الخدمات المتميزة في الإمارات. نحن ملتزمون بالتميز ورضا العملاء.",
      strategy: "استراتيجيتنا",
      advantages: "مميزاتنا",
      responsibility: "المسؤولية الاجتماعية",
      services: "خدماتنا",
      quickLinks: "روابط سريعة",
      copyright: "© 2024. جميع الحقوق محفوظة.",
      invalidEmail: "تنسيق البريد الإلكتروني غير صحيح",
      requiredEmail: "البريد مطلوب",
      success: "تم الاشتراك بنجاح!",
      error: "فشل الاشتراك.",
      networkError: "خطأ في الشبكة."
    }
  };

  const content = t[locale] || t.en;

  const validationSchema = Yup.object({
    email: Yup.string().email(content.invalidEmail).required(content.requiredEmail)
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSubmitStatus({ type: '', message: '' });
      try {
        const response = await fetch('http://localhost:1337/api/subscribers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: { email: values.email } })
        });
        const data = await response.json();
        if (response.ok) {
          setSubmitStatus({ type: 'success', message: content.success });
          resetForm();
        } else {
          setSubmitStatus({ type: 'error', message: data.error?.message || content.error });
        }
      } catch (error) {
        setSubmitStatus({ type: 'error', message: content.networkError });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <footer
      className="bg-[#180D06] text-[#F0E6D3] pt-20 pb-10 border-t border-[#C8A96E]/10"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-[#F0E6D3]/10 pb-12">

          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded bg-[#C8A96E] flex items-center justify-center text-[#1E1008] font-bold">L</div>
              <span className="text-2xl font-playfair font-bold">UAE<span className="text-[#C8A96E]">Jobs</span></span>
            </div>
            <p className="text-[#F0E6D3]/60 text-sm leading-relaxed">
              {content.aboutDesc}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8A96E] hover:text-[#1E1008] transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8A96E] hover:text-[#1E1008] transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C8A96E] hover:text-[#1E1008] transition-all duration-300">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold font-playfair mb-6 relative inline-block">
              {content.quickLinks}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#C8A96E]"></span>
            </h3>
            <ul className="space-y-3 text-sm text-[#F0E6D3]/70">
              <li><a href="#about" className="hover:text-[#C8A96E] hover:translate-x-1 transition-all inline-block">{content.about}</a></li>
              <li><a href="#services" className="hover:text-[#C8A96E] hover:translate-x-1 transition-all inline-block">{content.services}</a></li>
              <li><a href="#strategy" className="hover:text-[#C8A96E] hover:translate-x-1 transition-all inline-block">{content.strategy}</a></li>
              <li><a href="#advantages" className="hover:text-[#C8A96E] hover:translate-x-1 transition-all inline-block">{content.advantages}</a></li>
              <li><a href="#responsibility" className="hover:text-[#C8A96E] hover:translate-x-1 transition-all inline-block">{content.responsibility}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-playfair mb-6 relative inline-block">
              {content.contacts}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#C8A96E]"></span>
            </h3>
            <ul className="space-y-4 text-sm text-[#F0E6D3]/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C8A96E] mt-0.5 shrink-0" />
                <span>123 Business Bay, Dubai, UAE <br /> P.O. Box 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C8A96E] shrink-0" />
                <span dir="ltr">+971 4 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#C8A96E] shrink-0" />
                <span>info@company.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-playfair mb-6 relative inline-block">
              {locale === "ar" ? "اشترك في النشرة الإخبارية" : "Newsletter"}
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#C8A96E]"></span>
            </h3>
            <p className="text-[#F0E6D3]/60 text-sm mb-6">
              {locale === "ar" ? "اشترك للحصول على آخر الأخبار والعروض." : "Subscribe to get the latest news and offers."}
            </p>

            <form onSubmit={formik.handleSubmit} className="relative">
              <input
                type="email"
                name="email"
                placeholder={content.emailPlaceholder}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-[#F0E6D3]/10 rounded-lg px-4 py-3 pr-12 text-sm text-[#F0E6D3] focus:outline-none focus:border-[#C8A96E]/50 transition-colors placeholder:text-[#F0E6D3]/30"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#C8A96E] rounded text-[#1E1008] flex items-center justify-center hover:bg-[#B08D55] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "..." : <Send size={14} className={locale === 'ar' ? 'rotate-180' : ''} />}
              </button>

              {formik.touched.email && formik.errors.email && (
                <div className="absolute top-full mt-1 text-xs text-red-400">
                  {formik.errors.email}
                </div>
              )}
              {submitStatus.message && (
                <div className={`absolute top-full mt-1 text-xs ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#F0E6D3]/30">
          <p>{content.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C8A96E] transition-colors">{locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</a>
            <a href="#" className="hover:text-[#C8A96E] transition-colors">{locale === "ar" ? "شروط الخدمة" : "Terms of Service"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;