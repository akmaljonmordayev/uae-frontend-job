"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "./LocaleContext";

const STRAPI = "http://localhost:1337";


export default function useLocaleApi(path) {
  const { locale } = useLocale();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const separator = path.includes("?") ? "&" : "?";
      const url = `${STRAPI}${path}${separator}locale=${locale}`;
      const res = await fetch(url);
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error(`useLocaleApi fetch error [${path}]:`, err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [locale, path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading };
}
