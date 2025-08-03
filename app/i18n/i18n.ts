// src/i18n/i18n.ts

import { Platform } from 'react-native';
import translations from "./translations.json";

const mutiLanguage = translations as Record<string, Record<string, string>>;

// 預設語言
let currentLang: string = "en";

// 支援語言
export const availableLanguages = ["en", "zh-TW", "zh-CN"];

// 語系正規化
const normalizeLang = (lang: string): string => {
  if (lang.startsWith('zh-Hant') || lang.startsWith('zh-TW')) return 'zh-TW';
  if (lang.startsWith('zh-Hans') || lang.startsWith('zh-CN')) return 'zh-CN';
  if (availableLanguages.includes(lang)) return lang;
  return 'en';
};

// 設定語言
export const setLanguage = (lang: string) => {
  const normalizedLang = normalizeLang(lang);
  currentLang = normalizedLang;
};

// 取得翻譯字串
export const translate = (key: string, lang?: string): string => {
  const langToUse = normalizeLang(lang || currentLang);
  const entry = mutiLanguage[key];
  if (!entry) return `[${key}]`;
  return entry[langToUse] || entry["en"] || `[${key}]`;
};