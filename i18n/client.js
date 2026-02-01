
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { defaultLocale } from './config';

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: defaultLocale,
      fallbackLng: defaultLocale,
      ns: ['translation'],
      defaultNS: 'translation',
      react: {
        useSuspense: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    });
}

export default i18n;