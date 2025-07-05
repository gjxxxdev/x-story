// app/auth/facebookAuth.js
import { LoginManager, AccessToken, Settings } from "react-native-fbsdk-next";

Settings.initializeSDK()

export async function facebookLogin() {
  try {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
    if (result.isCancelled) {
      return null; // 使用者取消登入
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error("Failed to get access token");
    }
    // data.accessToken 是 token，通常你要送到後端做驗證或登入
    return data.accessToken.toString();
  } catch (error) {
    console.error("Facebook login error:", error);
    return null;
  }
}
