import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId: '927761409049-66o2rujvgaoaovopb4q3mvev3kceej95.apps.googleusercontent.com',
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
