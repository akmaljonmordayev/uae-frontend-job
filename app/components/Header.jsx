"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "./LocaleContext";
import useLocaleApi from "./Uselocaleapi";
import { Search, Menu, X, ChevronDown, Globe } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const { data: services } = useLocaleApi("/api/services?populate=*");

  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
    { label: locale === "ar" ? "عن الشركة" : "About us", path: "/about" },
    { label: locale === "ar" ? "الخدمات" : "Services", path: "/services", hasDropdown: true },
    { label: locale === "ar" ? "المدونة" : "Blog", path: "/blog" },
    { label: locale === "ar" ? "فريقنا" : "Our Team", path: "/team" },
    { label: locale === "ar" ? "تواصل معنا" : "Contacts", path: "/contact" },
  ];

  const columns = [[], [], [], []];
  if (Array.isArray(services)) {
    services.forEach((s, i) => { columns[i % 4].push(s); });
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 h-20 z-[999] bg-[#3B1F0E]/95 backdrop-blur-xl border-b border-[#C8A96E]/20 transition-all duration-300"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="max-w-[1400px] h-full mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link href="/" className="z-50 relative">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A96E] to-[#8B6914] flex items-center justify-center shadow-lg group-hover:shadow-[#C8A96E]/40 transition-all duration-300">
                <span className="text-white font-bold text-[11px] tracking-wider">LOGO</span>
              </div>
              <span className="text-white font-playfair font-bold text-lg tracking-wide hidden sm:block group-hover:text-[#C8A96E] transition-colors">
                UAE<span className="text-[#C8A96E]">Jobs</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navLinks.map((item) => {
                const isActive = pathname === item.path;
                const isHighlighted = isActive || (item.hasDropdown && showDropdown);
                return (
                  <li
                    key={item.path}
                    className="relative group h-20 flex items-center"
                    onMouseEnter={() => item.hasDropdown && setShowDropdown(true)}
                    onMouseLeave={() => item.hasDropdown && setShowDropdown(false)}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-1.5 text-[15px] font-medium tracking-wide no-underline transition-all duration-300 relative
                        ${isHighlighted ? "text-[#C8A96E]" : "text-[#E8DDD0] hover:text-[#C8A96E]"}`}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${showDropdown ? "rotate-180 text-[#C8A96E]" : "text-[#E8DDD0]/50"}`}
                        />
                      )}

                      {isActive && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C8A96E] shadow-[0_0_10px_#C8A96E]"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center relative">
              <div
                className={`absolute right-full top-1/2 -translate-y-1/2 flex items-center overflow-hidden transition-all duration-500 ease-out
                  ${showSearch ? "w-[240px] opacity-100 pr-4" : "w-0 opacity-0 pr-0"}`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={locale === "ar" ? "بحث..." : "Search..."}
                  className="w-full px-4 py-2 text-sm font-dm-sans rounded-full bg-white/5 border border-[#C8A96E]/20 text-[#F0E6D3] placeholder-[#F0E6D3]/30 focus:outline-none focus:border-[#C8A96E]/60 focus:bg-white/10 transition-all"
                  onKeyDown={(e) => e.key === "Escape" && setShowSearch(false)}
                />
              </div>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`group flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#C8A96E]/10 transition-all duration-300
                  ${showSearch ? "text-[#C8A96E] bg-[#C8A96E]/10" : "text-[#E8DDD0]"}`}
                aria-label="Search"
              >
                <Search size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            <div className="w-px h-6 bg-[#C8A96E]/20 mx-1"></div>

            <button
              className="flex items-center gap-2 text-[#E8DDD0] hover:text-[#C8A96E] transition-all px-2 py-1 rounded group"
              onClick={toggleLanguage}
            >
              <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">{locale === "en" ? "AR" : "EN"}</span>
            </button>

            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C8A96E] to-[#B08D55] text-white text-sm font-bold tracking-wide shadow-lg hover:shadow-[#C8A96E]/30 hover:scale-105 active:scale-95 transition-all duration-300">
              {locale === "ar" ? "حجز موعد" : "Book Appointment"}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4 z-50">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-[#E8DDD0]`}
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#E8DDD0] hover:text-[#C8A96E] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-x-0 top-20 z-40 bg-[#3B1F0E] border-b border-[#C8A96E]/20 p-4 transition-all duration-300 md:hidden origin-top
          ${showSearch ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={locale === "ar" ? "بحث..." : "Search..."}
          className="w-full px-4 py-3 text-base rounded-lg bg-white/5 border border-[#C8A96E]/30 text-[#F0E6D3] focus:outline-none focus:border-[#C8A96E]"
          autoFocus={showSearch}
        />
      </div>

      <div
        className={`fixed inset-0 z-[990] bg-[#3B1F0E] md:hidden transition-all duration-500 ease-in-out
        ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-10 overflow-y-auto">
          {navLinks.map((item, idx) => (
            <div key={item.path} className="border-b border-[#C8A96E]/10 py-2">
              <Link
                href={item.path}
                className="block text-2xl font-playfair text-[#E8DDD0] py-3 hover:text-[#C8A96E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.hasDropdown && (
                <div className="pl-4 pb-2 grid grid-cols-1 gap-2">
                  {services.slice(0, 5).map(service => {
                    const mobileTitle = locale === "ar" && service.localizations?.length
                      ? (service.localizations.find((l) => l.locale === "ar")?.text || service.text)
                      : service.text;
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.documentId}`}
                        className="text-[#C8A96E]/70 text-base py-1 block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {mobileTitle}
                      </Link>
                    );
                  })}
                  <Link href="/services" className="text-[#C8A96E] text-sm font-bold mt-2 inline-block">
                    {locale === "ar" ? "جميع الخدمات ←" : "View All Services →"}
                  </Link>
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-3 text-[#E8DDD0] text-lg border border-[#C8A96E]/30 p-4 rounded-xl justify-center"
            >
              <Globe size={20} />
              <span>{locale === "en" ? "Switch to Arabic" : "Switch to English"}</span>
            </button>

            <button className="w-full py-4 rounded-xl bg-[#C8A96E] text-[#3B1F0E] text-lg font-bold shadow-lg">
              {locale === "ar" ? "حجز موعد" : "Book Appointment"}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-20 left-0 right-0 h-[400px] z-[998] bg-[#2A1508]/95 backdrop-blur-xl border-b border-[#C8A96E]/20 shadow-2xl
          transition-all duration-500 ease-in-out origin-top hidden md:block
          ${showDropdown ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"}`}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="max-w-[1400px] mx-auto px-10 py-12 h-full flex gap-12">
          <div className="w-1/4 pr-8 border-r border-[#C8A96E]/10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-[#F0E6D3] mb-4">
                {locale === "ar" ? "خدماتنا" : "Our Services"}
              </h3>
              <p className="text-[#C8A96E]/80 text-sm leading-relaxed mb-6">
                {locale === "ar"
                  ? "استكشف مجموعتنا الواسعة من الخدمات المصممة لتلبية احتياجاتك."
                  : "Explore our wide range of professional services designed to maintain and enhance your property value."}
              </p>
            </div>
            <Link href="/services" className="text-[#C8A96E] font-bold text-sm hover:underline flex items-center gap-2">
              {locale === "ar" ? "جميع الخدمات" : "View All Services"} →
            </Link>
          </div>

          <div className="flex-1 grid grid-cols-4 gap-x-8 gap-y-4">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-3">
                {col.map((service) => {
                  const serviceTitle = locale === "ar" && service.localizations?.length
                    ? (service.localizations.find((l) => l.locale === "ar")?.text || service.text)
                    : service.text;
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.documentId}`}
                      className="group/link flex items-center gap-2"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]/40 group-hover/link:bg-[#C8A96E] transition-colors"></span>
                      <span className="text-[#E8DDD0] text-[15px] group-hover/link:text-[#C8A96E] group-hover/link:translate-x-1 transition-all duration-300">
                        {serviceTitle}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}