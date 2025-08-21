import { Platform } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  type User as GoogleUser,
} from '@react-native-google-signin/google-signin';

export type GoogleAuthOk = {
  ok: true;
  user: GoogleUser;
  idToken?: string | null;
  accessToken?: string | null;     // 由 getTokens() 取得
  serverAuthCode?: string | null;  // 需要 offlineAccess 時給後端換 token
};

export type GoogleAuthCancel = {
  ok: false;
  reason: 'cancelled';
};

export type GoogleAuthError = {
  ok: false;
  reason: 'error';
  code?: string;
  message?: string;
};

export type GoogleAuthResult = GoogleAuthOk | GoogleAuthCancel | GoogleAuthError;

const IOS_CLIENT_ID = '927761409049-ctsfhthe6jcjtti20igrftinqjb3jv36.apps.googleusercontent.com';
const WEB_CLIENT_ID = '927761409049-nukfc1nb5bckdm6q696cfo0b8vmtrl5j.apps.googleusercontent.com';

let configured = false;

export function configureGoogleSignIn() {
  if (configured) return;
  GoogleSignin.configure({
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    // 若你需要 serverAuthCode 給後端換 refresh_token，請打開：
    // offlineAccess: true,
    // forceCodeForRefreshToken: true, //（部分情境下需要）
  });
  configured = true;
} export async function googleSignInInteractive(): Promise<GoogleAuthResult> {
  try {
    configureGoogleSignIn();

    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    }

    // 如果你「每次都要重新選帳號」，可以保留這兩行；否則建議移除以降低失敗率
    // await GoogleSignin.signOut();
    // await GoogleSignin.revokeAccess();

    const res = await GoogleSignin.signIn(); // 注意：套件返回 { type, data? } 但我們只關心成功/取消

    // 成功：把結構轉成應用端慣用格式
    // 官方型別：{ type: 'success', data: User } | { type: 'cancelled' }
    if ((res as any)?.type === 'success' && (res as any)?.data) {
      const user = (res as any).data as GoogleUser;

      // 需要 idToken/accessToken 可接著呼叫 getTokens()
      let tokens: { idToken?: string | null; accessToken?: string | null } = {};
      try {
        tokens = await getGoogleTokens(); // iOS 需要額外取；Android 也可統一用這招
      } catch { }

      return {
        ok: true,
        user,
        idToken: tokens.idToken,
        accessToken: tokens.accessToken,
        serverAuthCode: (user as any)?.serverAuthCode ?? null,
      };
    }

    // 取消登入
    return { ok: false, reason: 'cancelled' };
  } catch (err: any) {
    // 套件常見錯誤代碼處理
    if (err?.code === statusCodes.SIGN_IN_CANCELLED) {
      return { ok: false, reason: 'cancelled' };
    }
    return {
      ok: false,
      reason: 'error',
      code: err?.code,
      message: String(err?.message ?? err),
    };
  }
}

/** 靜默登入（若裝置上已有紀錄，無需互動） */
export async function googleSignInSilently(): Promise<GoogleAuthResult> {
  try {
    configureGoogleSignIn();
    const res = await GoogleSignin.signInSilently(); // 套件會回 { type:'success', data } | 拋出 SIGN_IN_REQUIRED
    if ((res as any)?.type === 'success' && (res as any)?.data) {
      const user = (res as any).data as GoogleUser;
      let tokens: { idToken?: string | null; accessToken?: string | null } = {};
      try {
        tokens = await getGoogleTokens();
      } catch { }
      return { ok: true, user, idToken: tokens.idToken, accessToken: tokens.accessToken };
    }
    return { ok: false, reason: 'cancelled' }; // 極少見（大多數情況會 throw）
  } catch (err: any) {
    // 沒有已儲存憑證／需要互動 → 視為取消（由呼叫端決定是否改成互動式登入）
    return { ok: false, reason: 'cancelled' };
  }
}

/** 取得 idToken / accessToken（跨 iOS/Android 統一） */
export async function getGoogleTokens(): Promise<{
  idToken?: string | null;
  accessToken?: string | null;
}> {
  configureGoogleSignIn();
  return GoogleSignin.getTokens(); // 套件已做平台差異處理
}

/** 登出（不會撤銷同意，只是登出本機） */
export async function googleSignOut(): Promise<void> {
  configureGoogleSignIn();
  await GoogleSignin.signOut();
}

/** 撤銷授權（下次會強制再走同意流程） */
export async function googleRevoke(): Promise<void> {
  configureGoogleSignIn();
  await GoogleSignin.revokeAccess();
}

/** 便利函式：取得目前已登入使用者（若存在） */
export function getCurrentGoogleUser() {
  configureGoogleSignIn();
  return GoogleSignin.getCurrentUser(); // 可能為 null
}

/** ====== 4) 偵錯用：打印結構 ====== */
export function debugPrintGoogleUser(prefix = 'Google user') {
  const user = getCurrentGoogleUser();
  // 注意：這裡不是 async，僅打印目前快取的 user（若剛登入，建議直接用函式回傳值）
  // 要更完整的可在登入時：console.log(JSON.stringify(result, null, 2))
  console.log(prefix, user ? JSON.stringify(user, null, 2) : 'no user');
}