// utils/Storage.ts
import * as SecureStore from "expo-secure-store";

// Token
const TOKEN_KEY = "authToken";

// User Profile
const EMAIL_KEY = "userEmail";
const COIN_KEY = "userCoin";
const LANG_KEY = "userLangCode";

// ----------- TOKEN FUNCTIONS ----------- //
const setStoreToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (e) {
    console.error("storeToken error", e);
  }
};

const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (e) {
    console.error("getToken error", e);
    return null;
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (e) {
    console.error("removeToken error", e);
  }
};

// ----------- USER PROFILE FUNCTIONS ----------- //

// Email
const setUserEmail = async (email: string) => {
  try {
    await SecureStore.setItemAsync(EMAIL_KEY, email);
  } catch (e) {
    console.error("setUserEmail error", e);
  }
};

const getUserEmail = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(EMAIL_KEY);
  } catch (e) {
    console.error("getUserEmail error", e);
    return null;
  }
};

// Coin
const setUserCoin = async (coin: number) => {
  try {
    await SecureStore.setItemAsync(COIN_KEY, coin.toString());
  } catch (e) {
    console.error("setUserCoin error", e);
  }
};

const getUserCoin = async (): Promise<number | null> => {
  try {
    const value = await SecureStore.getItemAsync(COIN_KEY);
    return value ? parseInt(value, 10) : null;
  } catch (e) {
    console.error("getUserCoin error", e);
    return null;
  }
};

// Language Code
const setUserLangCode = async (lang: string) => {
  try {
    console.log("setUserLangCode", lang);
    await SecureStore.setItemAsync(LANG_KEY, lang);
  } catch (e) {
    console.error("setUserLangCode error", e);
  }
};

const getUserLangCode = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(LANG_KEY);
  } catch (e) {
    console.error("getUserLangCode error", e);
    return null;
  }
};

// 清除全部 user profile 資料
const clearUserProfile = async () => {
  try {
    await SecureStore.deleteItemAsync(EMAIL_KEY);
    await SecureStore.deleteItemAsync(COIN_KEY);
    await SecureStore.deleteItemAsync(LANG_KEY);
  } catch (e) {
    console.error("clearUserProfile error", e);
  }
};

// ----------- EXPORT ----------- //

export default {
  // Token
  setStoreToken,
  getToken,
  removeToken,

  // User Profile
  setUserEmail,
  getUserEmail,
  setUserCoin,
  getUserCoin,
  setUserLangCode,
  getUserLangCode,
  clearUserProfile
};
