// apiClient.ts
import { RestfulApi } from "./api";

export const devBaseUrl = "http://220.133.50.218:6001/";
export const prodBaseUrl = "http://220.133.50.218:6001/";
//https://xstoryline.com/
const authApi = new RestfulApi({
  devBaseUrl,
  prodBaseUrl,
  isDev: __DEV__,
});

export default authApi;


/**
 * xStory 註冊 Request 資料格式
 */
export interface XStoryAuthRequest {
  email: string;
  password: string;
}

/**
 * xStory 註冊 Response（成功或失敗都回傳 true/false）
 */
export interface XStoryAuthResponse {
  message: string;
}

/**
 * 使用 xStory 註冊帳號
 * @param payload - 包含 email 和 password
 * @returns Promise<boolean> 表示是否成功
 */
export async function registerWithXStory(
  payload: XStoryAuthRequest
): Promise<boolean> {
  try {
    const res = await authApi.post<XStoryAuthResponse>(
      "api/auth/register",
      payload
    );

    if (res && res.message === '註冊成功，請查收驗證信件') {
      return true;
    } else {
      console.warn("註冊失敗:", res?.message);
      alert(res?.message || "註冊失敗，請稍後再試");
      return false;
    }
  } catch (error) {
    alert(" 註冊發生錯誤，請稍後再試 /n" + (error instanceof Error ? error.message : "未知錯誤"));
    console.error("註冊發生錯誤:", error);
    return false;
  }
}


/**
 * 使用 xStory 登入帳號
 */
export async function loginWithXStory(
  payload: XStoryAuthRequest
): Promise<boolean> {
  try {
    const res = await authApi.post<XStoryAuthResponse>(
      "api/auth/login",
      payload
    );

    if (res && res.message === '信箱驗證成功，請重新登入') {
      return true;
    } else {
      alert(res?.message || "註冊失敗，請稍後再試");
      console.warn("註冊失敗:", res?.message);
      return false;
    }
  } catch (error) {
    alert("註冊發生錯誤，請稍後再試 /n" + (error instanceof Error ? error.message : "未知錯誤"));
    console.error("註冊發生錯誤:", error);
    return false;
  }
}

/**
 * 忘記密碼 Request 資料格式
 */
export interface XStoryForgotPasswordRequest {
  email: string;
}

/**
 * 忘記密碼 Response 資料格式
 */
export interface XStoryForgotPasswordResponse {
  message: string;
}

/**
 * 使用 xStory 忘記密碼
 * @param payload - 包含 email
 * @returns Promise<boolean> 表示是否成功發送驗證信
 */
export async function forgotXStoryPassword(
  payload: XStoryForgotPasswordRequest
): Promise<boolean> {
  try {
    const res = await authApi.post<XStoryForgotPasswordResponse>(
      "api/auth/forgot-password",
      payload
    );

    if (res && res.message === '重設密碼驗證信已發送') {
      alert("重設密碼驗證信已發送，請檢查您的信箱");
      return true;
    } else {
      alert(res?.message || "重設密碼失敗，請稍後再試");
      console.warn("重設密碼失敗:", res?.message);
      return false;
    }
  } catch (error) {
    alert("重設密碼時發生錯誤，請稍後再試\n" + (error instanceof Error ? error.message : "未知錯誤"));
    console.error("重設密碼時發生錯誤:", error);
    return false;
  }
}
