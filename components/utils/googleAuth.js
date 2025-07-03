import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: "758821714492-fg0lom34rq8668mlvjmuia7eq4mqd2ti.apps.googleusercontent.com",
});

export async function googleLogin() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    console.error('Google 登入錯誤:', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('用戶取消登入');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('登入流程中');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play 服務不可用');
    } else {
      console.error('Google 登入錯誤:', error);
    }
    return null;
  }
}
