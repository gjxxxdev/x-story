// i18n/initLanguage.ts
import * as RNLocalize from 'react-native-localize';
import Storage from '../auth/Storage';
import { setLanguage } from './i18n';

export const initLanguageByLoginStatus = async (isLoggedIn: boolean) => {
  let langCode: string | null = null;

  if (isLoggedIn) {
    langCode = await Storage.getUserLangCode();
    if (!langCode) {
      langCode = RNLocalize.getLocales()[0]?.languageTag ?? 'en';
      await Storage.setUserLangCode(langCode);
    }
  } else {
    langCode = RNLocalize.getLocales()[0]?.languageTag ?? 'en';
    await Storage.setUserLangCode(langCode);
  }

  setLanguage(langCode);
};
