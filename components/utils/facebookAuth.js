// app/auth/facebookAuth.js
// ⚠️ 本檔案提供兩種登入：
// 1) facebookLogin()         → 傳統登入，拿 accessToken（Android 推薦、iOS 也可用，但別跟 Limited 混用）
// 2) facebookLimitedLoginIOS() → iOS 限制登入，拿 AuthenticationToken(JWT) + rawNonce（後端用 JWKS 驗章）
//
// ✅ iOS 限制登入（Limited Login）不會給 accessToken，請把 JWT + rawNonce 送到後端驗證。
// ✅ 傳統登入請務必把 loginTracking 設為 'enabled'，避免在 iOS 上意外進入 Limited Login。

import { Platform } from "react-native";
import {
  LoginManager,
  AccessToken,
  AuthenticationToken,
  Settings,
} from "react-native-fbsdk-next";

// 初始化 SDK（Info.plist 已設定 FacebookAppID / DisplayName）
Settings.initializeSDK();

/** 產生隨機 nonce（用於 Limited Login 防重放） */
function generateNonce(length = 32) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

/** 嘗試以 expo-crypto 或 react-native-sha256 做 SHA-256；若無可用實作則回傳原字串 */
async function sha256Maybe(value) {
  // 優先使用 expo-crypto（Expo 專案常見）
  try {
    const Crypto = require("expo-crypto");
    if (Crypto?.digestStringAsync) {
      return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
    }
  } catch (_) {}

  // 退而求其次使用 react-native-sha256（RN CLI 專案常見）
  try {
    const { sha256 } = require("react-native-sha256");
    if (sha256) {
      return await sha256(value);
    }
  } catch (_) {}

  // 都沒有可用的 SHA-256：先回傳原值（後端需對應接受 rawNonce）
  return value;
}

/**
 * 傳統 Facebook 登入（拿 accessToken）
 * - iOS/Android 都可用；若你要 iOS 走 Limited Login，請改用 facebookLimitedLoginIOS()
 * - iOS 這裡強制 loginTracking = 'enabled'，避免意外走到 Limited Login。
 * @returns {Promise<string|null>} accessToken（成功）或 null（取消/失敗）
 */
export async function facebookLogin() {
  try {
    const loginTracking = "enabled"; // 關鍵：避免 iOS 走 Limited Login
    const result = await LoginManager.logInWithPermissions(
      ["public_profile", "email"],
      loginTracking
    );

    if (result.isCancelled) {
      return null; // 使用者取消
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data?.accessToken) {
      throw new Error("Failed to get access token");
    }

    // ✅ 回傳 accessToken（送往後端 /facebook-login 驗證）
    return data.accessToken.toString();
  } catch (error) {
    console.error("Facebook login (classic) error:", error);
    return null;
  }
}

/**
 * iOS 限制登入（Limited Login）
 * - 僅 iOS 可用；會拿到 OIDC 的 ID Token（JWT）與你當次送入的 rawNonce。
 * - 將 { idToken, rawNonce } 送到後端，使用 Facebook 的 JWKS 驗章並比對 iss/aud/nonce。
 * @returns {Promise<{ idToken: string, rawNonce: string }>} 成功回傳 JWT 與原始 nonce；失敗丟錯
 */
export async function facebookLimitedLoginIOS() {
  if (Platform.OS !== "ios") {
    throw new Error("facebookLimitedLoginIOS 只適用於 iOS。");
  }

  try {
    // 1) 產生 rawNonce，並嘗試做 SHA-256（FB 限制登入常見做法）
    const rawNonce = generateNonce();
    const nonceForSDK = await sha256Maybe(rawNonce);

    // 2) 以 loginTracking='limited' 發起登入，第三參數傳入 nonce（建議為 SHA-256 後的值）
    const result = await LoginManager.logInWithPermissions(
      ["public_profile", "email"],
      "limited",
      nonceForSDK
    );

    if (result.isCancelled) {
      throw new Error("使用者取消 Facebook 限制登入");
    }

    // 3) 僅能透過 AuthenticationToken 取得 OIDC ID Token（JWT）
    const authToken = await AuthenticationToken.getAuthenticationToken();
    const idToken = authToken?.authenticationToken;

    if (!idToken) {
      // 限制登入下不會有 accessToken，若拿不到 JWT 代表登入流程未完成或 SDK 未回傳
      throw new Error("未取得 Facebook AuthenticationToken（JWT）。");
    }

    // ✅ 將 { idToken, rawNonce } 回傳（送往後端 /facebook-limited-login）
    return { idToken, rawNonce };
  } catch (error) {
    console.error("Facebook Limited Login (iOS) error:", error);
    throw error;
  }
}

/**
 * （可選）登出/清掉現有登入狀態
 * - 若你要強制使用者改選帳號，可先登出再重新登入。
 */
export async function facebookLogout() {
  try {
    LoginManager.logOut();
  } catch (error) {
    console.warn("Facebook logout warning:", error);
  }
}
