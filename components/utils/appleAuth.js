// app/auth/appleAuth.js
import {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
  appleAuth,
} from "@invertase/react-native-apple-authentication";

export async function appleLogin() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }

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