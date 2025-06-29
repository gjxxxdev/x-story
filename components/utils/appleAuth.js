// app/auth/appleAuth.js
import {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

export async function appleLogin() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    const { identityToken } = appleAuthRequestResponse;

    if (identityToken) {
      // identityToken 通常會送後端驗證
      return identityToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Apple login error:", error);
    return null;
  }
}