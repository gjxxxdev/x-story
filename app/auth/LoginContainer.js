import React, { useEffect, useState } from "react";
import { appleLogin } from "../../components/utils/appleAuth";
import { facebookLogin } from "../../components/utils/facebookAuth";
import { googleLogin } from "../../components/utils/googleAuth";
import { wechatLogin } from "../../components/utils/wechatAuth";
import LoginScreen from "../screens/LoginScreen";
import { EmailVerification } from "../screens/EmailVerification";
import { Linking } from 'react-native';

export default function LoginContainer({ onLoginSuccess }) {
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL(url);
      }
    });

    const subscription = Linking.addEventListener("url", (event) => {
      handleOpenURL(event.url);
    });

    return () => {
      subscription.remove();  // 移除監聽
    };
  }, []);


  function handleOpenURL(url) {
    // 解析 URL 並取得 token 或 code
    console.log('App 被深度連結喚醒，URL:', url);
    // 這裡處理登入成功邏輯
  }

  const handleXStoryLogin = () => {
    setShowEmailVerification(true);
  };

  const handleEmailVerificationCancel = () => {
    setShowEmailVerification(false);
  };

  const handleFacebookLogin = async () => {
    try {
      const token = await facebookLogin();
      console.log('facebook login:' + token);
      if (token) onLoginSuccess();
      else alert("Facebook 登入失敗或取消");
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const SignInResponse = await googleLogin();
      console.log('google login: ' + SignInResponse.data.user);
      console.log('google login: ' + SignInResponse.data.idToken);
      onLoginSuccess();
    } catch (e) {
      alert("Google 登入錯誤: " + e.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const token = await appleLogin();
      if (token) onLoginSuccess();
      else alert("Apple 登入失敗或取消");
    } catch (e) {
      alert("Apple 登入錯誤: " + e.message);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      const code = await wechatLogin();
      if (code) onLoginSuccess();
      else alert("WeChat 登入失敗或取消");
    } catch (e) {
      alert("WeChat 登入錯誤: " + e.message);
    }
  };

  return showEmailVerification ? (
    <EmailVerification
      onCancel={handleEmailVerificationCancel}
      onSuccess={() => {
        setShowEmailVerification(false);
        onLoginSuccess();
      }}
    />
  ) : (
    <LoginScreen
      onLoginSuccess={onLoginSuccess}
      onXStoryLogin={handleXStoryLogin}
      onFacebookLogin={handleFacebookLogin}
      onAppleLogin={handleAppleLogin}
      onGoogleLogin={handleGoogleLogin}
      onWeChatLogin={handleWeChatLogin}
    />
  );
}
