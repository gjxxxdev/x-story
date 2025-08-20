import React, { useEffect, useState } from "react";
import { appleLogin } from "../../components/utils/appleAuth";
import { facebookLogin, facebookLimitedLoginIOS } from "../../components/utils/facebookAuth";
import { googleLogin } from "../../components/utils/googleAuth";
import { wechatLogin } from "../../components/utils/wechatAuth";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen"
import { RegisterXStoryScreen } from "../screens/RegisterXStoryScreen";
import { XStoryLogin } from "../screens/XStoryLogin"
import { Alert, View, BackHandler, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import tokenStorage from './Storage';
import { translate } from "../i18n/i18n";
import {
  facebookLoginWithXStory,
  googleLoginWithXStory,
  appleLoginWithXStory
} from '../config/authApiClient';

export default function LoginContainer({ onLoginSuccess }) {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showRegisterView, setshowRegisterView] = useState(true);
  const [historyStack, setHistoryStack] = useState([]);

  const handleXStoryLogin = () => {
    setHistoryStack((prev) => [...prev, 'emailLogin']);
    setShowEmailLogin(true);
  };

  const handleXStoryLoginCancel = () => {
    setShowEmailLogin(false);
  };

  const handleXStoryLoginSuccess = async (token) => {
    console.log('handleXStoryLoginSuccess token: ' + token);
    await tokenStorage.setStoreToken(token);
    if (token) {
      onLoginSuccess();
    }
  };

  const handleEmailVerificationCancel = () => {
    setShowEmailVerification(false);
  };

  const handleFacebookLogin = async () => {
    try {
      let body = null;

      if (Platform.OS === "ios") {
        // 走 Limited Login（id_token）
        const r = await facebookLimitedLoginIOS();
        if (r?.idToken) {
          body = {
            token: r.idToken,      // id_token (JWT)
            rawNonce: r.rawNonce   // 強烈建議一併傳給後端做 nonce 驗證
          };
        }
      } else {
        // 走傳統 Access Token
        const accessToken = await facebookLogin();
        if (accessToken) {
          body = {
            token: accessToken     // 統一欄位名為 token
          };
        }
      }

      if (!body) {
        alert("Facebook 登入失敗或取消");
        return;
      }

      const serverToken = await facebookLoginWithXStory(body); // 你的 API 呼叫
      if (serverToken && serverToken.length > 0) {
        await tokenStorage.setStoreToken(serverToken);
        onLoginSuccess();
      } else {
        alert("serverToken is empty, please try again");
      }
    } catch (e) {
      alert("Facebook 登入錯誤: " + e.message);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const SignInResponse = await googleLogin();
      console.log('google login: ' + SignInResponse.data.user);
      console.log('google login: ' + SignInResponse.data.idToken);
      if (SignInResponse.data.idToken.length > 0) {
        const googleLoginServerRequest = { idToken: SignInResponse.data.idToken };
        const serverGoogleLoginAccessToken = await googleLoginWithXStory(googleLoginServerRequest);
        if (serverGoogleLoginAccessToken && serverGoogleLoginAccessToken.length > 0) {
          await tokenStorage.setStoreToken(serverGoogleLoginAccessToken);
          onLoginSuccess();
        } else {
          alert("serverGoogleLoginAccessToken is empty, please try again");
        }
      }
      else alert(SignInResponse.data.message || "Google 登入失敗或取消");
    } catch (e) {
      alert("Google 登入錯誤: " + e.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appletoken = await appleLogin();
      console.log('apple appletoken: ' + appletoken);
      if (appletoken) {
        const token = await appleLoginWithXStory({ idToken: appletoken });
        if (token && token.length > 0) {
          await tokenStorage.setStoreToken(token);
          console.log('apple login: ' + token);
          onLoginSuccess();
        } else {
          alert("token is empty, please try again");
        }
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
    setHistoryStack((prev) => [...prev, 'register']);
    setshowRegisterView(true);
  }

  const handleXStoryRegister = () => {
    setHistoryStack((prev) => [...prev, 'emailVerification']);
    setShowEmailVerification(true);
  };

  useEffect(() => {
    const backAction = () => {
      console.log('Back button pressed');
      console.log('Current historyStack:', historyStack);

      if (historyStack.length > 0) {
        const lastAction = historyStack[historyStack.length - 1];
        console.log('Going back to:', lastAction);
        goBack();
        return true; // 阻止預設返回
      }

      console.log('No history, default back behavior');
      return false; // 沒有上一步，交給系統處理（例如退出APP）
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [historyStack]);

  const goBack = () => {
    setHistoryStack((prevStack) => {
      if (prevStack.length > 0) {
        const newStack = [...prevStack];
        newStack.pop();

        // 根據 newStack 的最後一個元素決定顯示畫面
        const lastView = newStack[newStack.length - 1];
        console.log('Switching to last view:', lastView);

        switch (lastView) {
          case 'register':
            setshowRegisterView(true);
            setShowEmailLogin(false);
            setShowEmailVerification(false);
            break;
          case 'emailLogin':
            setShowEmailLogin(true);
            setshowRegisterView(false);
            setShowEmailVerification(false);
            break;
          case 'emailVerification':
            setShowEmailVerification(true);
            setshowRegisterView(false);
            setShowEmailLogin(false);
            break;
          default:
            // 預設回到登入畫面
            setshowRegisterView(false);
            setShowEmailLogin(false);
            setShowEmailVerification(false);
        }

        return newStack;
      }

      return prevStack;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {showEmailVerification ? (
            <RegisterXStoryScreen
              onCancel={handleEmailVerificationCancel}
              onSuccess={() => {
                setShowEmailVerification(false);
                Alert.alert(
                  translate("registerEmailSentTitle"),
                  translate("registerEmailSentMessage"),
                  [{ text: translate("ok") }]
                );
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
              onFacebookRegister={handleFacebookLogin}
              onAppleRegister={handleAppleLogin}
              onGoogleRegister={handleGoogleLogin}
              onWeChatRegister={handleWeChatLogin}
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
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
