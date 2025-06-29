// app/auth/googleAuth.js
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "你的 Web Client ID", // 從 Google Cloud Console 取得
});

export async function googleLogin() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // userInfo.idToken 是 ID Token，拿去後端認證
    return userInfo.idToken;
  } catch (error) {
    console.error("Google login error:", error);
    return null;
  }
}
