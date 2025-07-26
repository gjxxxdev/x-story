// src/i18n/i18n.ts

import translations from "./translations.json";

const mutiLanguage = translations as Record<string, Record<string, string>>;
// 預設語言
let currentLang: string = "en";

// 支援語言
export const availableLanguages = ["en", "zh-TW", "zh-CN"];

// 設定語言
export const setLanguage = (lang: string) => {
  if (availableLanguages.includes(lang)) {
    currentLang = lang;
  } else {
    console.warn(`Unsupported language: ${lang}`);
  }
};

// 取得翻譯字串
export const translate = (key: string, lang?: string): string => {
  const langToUse = lang || currentLang;
  const entry = mutiLanguage[key];
  if (!entry) return `[${key}]`;
  return entry[langToUse] || entry["en"] || `[${key}]`;
};
