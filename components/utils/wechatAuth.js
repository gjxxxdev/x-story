//import * as WeChat from "react-native-wechat-lib";

const WX_APP_ID = 'wx277826ce3d9510c6';

if (WX_APP_ID && WX_APP_ID !== '') {
  //WeChat.registerApp(WX_APP_ID);
} else {
  console.warn('微信AppId 尚未設定，跳過微信SDK初始化');
}

export async function wechatLogin() {
  /*
  try {
    // 如果沒 AppId 或跳過初始化，直接拋錯或回傳 null
    if (!WX_APP_ID || WX_APP_ID === '') {
      console.warn('微信AppId 尚未設定，無法使用微信登入');
      return null;
    }

    const isInstalled = await WeChat.isWXAppInstalled();
    if (!isInstalled) {
      throw new Error("WeChat app not installed");
    }

    const response = await WeChat.sendAuthRequest("snsapi_userinfo");
    if (response.errCode === 0) {
      return response.code;
    } else {
      return null;
    }
  } catch (error) {
    console.error("WeChat login error:", error);
    return null;
  }*/
}
