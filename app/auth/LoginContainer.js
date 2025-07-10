import React, { useEffect, useState } from "react";
import { appleLogin } from "../../components/utils/appleAuth";
import { facebookLogin } from "../../components/utils/facebookAuth";
import { googleLogin } from "../../components/utils/googleAuth";
import { wechatLogin } from "../../components/utils/wechatAuth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import { EmailVerification } from "../screens/EmailVerification";
import { XStoryLogin } from "../screens/XStoryLogin"
import { Linking } from 'react-native';
import tokenStorage from '../auth/tokenStorage'

export default function LoginContainer({ onLoginSuccess }) {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showRegisterView, setshowRegisterView] = useState(false);

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
    setShowEmailLogin(true);
  };

  const handleXStoryLoginCancel = () => {
    setShowEmailLogin(false);
  };

  const handleXStoryLoginSuccess = async (token) => {
    console.log('handleXStoryLoginSuccess token: ' + token);
    await tokenStorage.storeToken(token);
  };

  const handleEmailVerificationCancel = () => {
    setShowEmailVerification(false);
  };

  const handleFacebookLogin = async () => {
    try {
      const token = await facebookLogin();
      console.log('facebook login:' + token);
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log("facebook login user token:", token);
        onLoginSuccess();
      }
      else alert("Facebook 登入失敗或取消");
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const SignInResponse = await googleLogin();
      await tokenStorage.setStoreToken(SignInResponse.data.idToken);
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
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log('google login: ' + token);
        onLoginSuccess();
      }
      else alert("Apple 登入失敗或取消");
    } catch (e) {
      alert("Apple 登入錯誤: " + e.message);
    }
  };

  const handleWeChatLogin = async () => {
    try {
      const code = await wechatLogin();
      if (code) {
        await tokenStorage.setStoreToken(code);
        console.log('google login: ' + code);
        onLoginSuccess();
      }
      else alert("WeChat 登入失敗或取消");
    } catch (e) {
      alert("WeChat 登入錯誤: " + e.message);
    }
  };


  const handleRegister = async () => {
    setshowRegisterView(true);
  }

  const handleXStoryRegister = () => {
    setShowEmailVerification(true);
  };

  const handleFacebookRegister = async () => {
    try {
      const token = await facebookLogin();
      console.log('facebook login:' + token);
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log("facebook login user token:", token);
        onLoginSuccess();
      }
      else alert("Facebook 登入失敗或取消");
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };

  const handleAppleRegister = async () => {
    try {
      const token = await appleLogin();
      if (token) {
        await tokenStorage.setStoreToken(token);
        console.log('google login: ' + token);
        onLoginSuccess();
      }
      else alert("Apple 登入失敗或取消");
    } catch (e) {
      alert("Apple 登入錯誤: " + e.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const SignInResponse = await googleLogin();
      await tokenStorage.setStoreToken(SignInResponse.data.idToken);
      console.log('google login: ' + SignInResponse.data.user);
      console.log('google login: ' + SignInResponse.data.idToken);
      onLoginSuccess();
    } catch (e) {
      alert("Google 登入錯誤: " + e.message);
    }
  };

  const handleWeChatRegister = async () => {
    try {
      const code = await wechatLogin();
      if (code) {
        await tokenStorage.setStoreToken(code);
        console.log('google login: ' + code);
        onLoginSuccess();
      }
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
  ) : showEmailLogin ? (
    <XStoryLogin
      onLoginSuccess={(token) => { handleXStoryLoginSuccess(token) }}
      onCancel={handleXStoryLoginCancel}
      onShowEmailVerification={() => { }}
    />
  ) : showRegisterView ? (
    <RegisterScreen
      onRegisterSuccess={() => { }}
      onXStoryRegister={handleXStoryRegister}
      onFacebookRegister={handleFacebookRegister}
      onAppleRegister={handleAppleRegister}
      onGoogleRegister={handleGoogleRegister}
      onWeChatRegister={handleWeChatRegister}
      onRegister={handleRegister}
      onCancel={() => setshowRegisterView(false)}
    />
  ) : (
    <LoginScreen
      onLoginSuccess={onLoginSuccess}
      onXStoryLogin={handleXStoryLogin}
      onFacebookLogin={handleFacebookLogin}
      onAppleLogin={handleAppleLogin}
      onGoogleLogin={handleGoogleLogin}
      onWeChatLogin={handleWeChatLogin}
      onRegister={handleRegister}
    />
  );
}
